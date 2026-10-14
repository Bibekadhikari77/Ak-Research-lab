---
title: "How much GPU memory do you need? A practical estimation guide"
excerpt: "A back-of-the-envelope method for estimating GPU memory for inference, full fine-tuning, and parameter-efficient training, so you can size hardware before you start."
category: gpu-infrastructure
tags: [gpu, memory, training, inference]
author: AK Research Lab Team
publishedAt: 2026-09-30
status: published
coverImage: /blog/estimating-gpu-memory.jpg
coverAlt: "Close-up of a circuit board with illuminated data paths"
---

"Will it fit?" is usually the first question in any model project. You can answer it surprisingly well with a few lines of arithmetic before touching any hardware. This guide covers the estimates we use when scoping compute requests.

## Start with bytes per parameter

Every estimate begins with the number of parameters and how many bytes each one costs. The precision you store weights in sets the baseline:

| Precision   | Bytes per parameter |
| ----------- | ------------------- |
| FP32        | 4                   |
| FP16 / BF16 | 2                   |
| INT8        | 1                   |
| 4-bit       | 0.5                 |

A 7-billion-parameter model in BF16 therefore needs about **14 GB** just to hold its weights.

## Inference: weights plus the KV cache

For inference, memory is roughly the weights plus the **key-value (KV) cache**, which stores attention state for every token in the context.

For a standard multi-head attention model, the KV cache per token is:

```text
2 (K and V) × layers × hidden size × bytes per value
```

For a 7B-class model with 32 layers and a hidden size of 4,096 in FP16, that's `2 × 32 × 4096 × 2 ≈ 0.5 MB` per token. A single 4,096-token sequence needs about **2 GB** of KV cache on top of the weights, and that multiplies with batch size. Models that use grouped-query attention share keys and values across heads and need proportionally less.

## Full fine-tuning: the 16-bytes rule

Training needs far more than the weights. With mixed-precision training and the Adam optimizer, a common setup keeps:

- BF16 weights: 2 bytes
- BF16 gradients: 2 bytes
- FP32 master copy of the weights: 4 bytes
- Adam first and second moments in FP32: 8 bytes

That's about **16 bytes per parameter** before activations. For a 7B model, that's roughly 112 GB, which is more than any single common GPU holds. That's why full fine-tuning of models this size usually means multiple GPUs with optimizer-state sharding, or a different approach entirely.

## Activations

Activations are the intermediate values saved during the forward pass for use in the backward pass. They scale with **batch size × sequence length × hidden size × number of layers**, so long contexts get expensive quickly.

Two levers help:

1. **Gradient checkpointing** stores only some activations and recomputes the rest during the backward pass. It trades extra compute for a large memory saving.
2. **Smaller micro-batches with gradient accumulation** keep the effective batch size while holding fewer activations at once.

## Parameter-efficient fine-tuning

Methods like **LoRA** freeze the base model and train small adapter matrices. The frozen weights still need memory (about 14 GB for a 7B model in BF16), but gradients and optimizer state are only needed for the adapters, which are typically a tiny fraction of the parameter count.

**QLoRA** goes further by storing the frozen base model in 4-bit, bringing a 7B model's weights down to roughly 3.5 to 4 GB. This is what makes fine-tuning mid-sized models practical on a single GPU.

## Leave headroom

Treat these numbers as lower bounds. Framework overhead, CUDA context, memory fragmentation, and temporary buffers all take space. We generally plan for **20 to 30 percent headroom** above the estimate and then measure: a short profiling run on the target hardware is the only number that really counts.

## Putting it together

| Scenario (7B model)                      | Rough memory before activations |
| ---------------------------------------- | ------------------------------- |
| Inference, BF16                          | ~14 GB + KV cache               |
| LoRA fine-tuning, BF16 base              | ~14 GB + adapters               |
| QLoRA fine-tuning, 4-bit base            | ~4 GB + adapters                |
| Full fine-tuning, mixed precision + Adam | ~112 GB                         |

If you're planning a training or inference project and want help sizing it, [tell us about your workload](/contact?inquiry=gpu-compute).
