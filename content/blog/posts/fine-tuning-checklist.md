---
title: "A practical checklist for fine-tuning language models"
excerpt: "The questions we work through before, during, and after a fine-tuning run, from deciding whether to fine-tune at all to evaluating the result honestly."
category: model-training
tags: [fine-tuning, lora, evaluation, training]
author: AK Research Lab Team
publishedAt: 2026-09-22
status: published
---

Fine-tuning is often treated as the default way to make a model "know" something. Sometimes it is the right tool; often it isn't. This is the checklist we use to keep projects grounded.

## Before you train

### Decide whether fine-tuning is the right tool

Fine-tuning is good at changing **behavior**: output format, tone, following a domain-specific style, or getting better at a narrow task. It's less reliable for teaching a model new **facts** that change over time. For that, retrieval (looking up relevant documents at query time) is usually simpler to build and easier to keep current.

Ask first:

- Can a better prompt, with a few examples, get most of the way there?
- Is the problem missing knowledge (consider retrieval) or wrong behavior (consider fine-tuning)?
- How will we know the fine-tuned model is better? If you can't answer this yet, stop and define it.

### Build the evaluation set first

Write the evaluation before the training data. Hold out examples that represent real use, including the hard and awkward cases, and decide how you'll score them. Keep this set separate from training data so you're measuring generalization, not memory.

### Invest in data quality

A few thousand clean, consistent examples usually beat a much larger noisy set. Check for duplicates, contradictory labels, and formatting drift. Make sure the training format matches exactly what the model will see at inference time.

## During training

### Start small

Begin with a parameter-efficient method such as LoRA and a smaller model. It's faster and cheaper to iterate, and it tells you whether the approach works before you scale up. See our [GPU memory guide](/blog/estimating-gpu-memory-for-training) for sizing.

### Choose sensible defaults

- **Mixed precision** (BF16 where supported) to save memory and time.
- **Gradient checkpointing** if activations don't fit.
- A **modest learning rate with warmup**; too high is a common cause of unstable or degraded runs.
- **A small number of epochs.** Over-training on a small dataset quickly leads to memorization.

### Watch the right signals

Track training and validation loss together. Validation loss that rises while training loss keeps falling means overfitting. Periodically generate outputs on a fixed set of prompts and read them; loss alone won't tell you if the model's answers got worse.

### Make runs reproducible

Record the base model version, dataset version, hyperparameters, random seed, and code commit for every run. When something works, you'll want to know exactly why.

## After training

### Evaluate against the baseline

Compare the fine-tuned model with the base model, and with the best prompt-only approach, on your held-out set. An improvement only counts if it beats the simpler alternatives.

### Check for regressions

Fine-tuning on a narrow task can degrade general abilities. Test a sample of general prompts alongside your target task, and check safety-relevant behavior if the model will face users.

### Plan for deployment

Decide how the model will be served, whether adapters will be merged into the base weights, and how you'll monitor quality once real traffic arrives. A model that can't be served reliably isn't finished.

## Summary

1. Confirm fine-tuning is the right tool.
2. Write the evaluation set first.
3. Prioritize data quality over quantity.
4. Start small with parameter-efficient methods.
5. Monitor validation loss and real outputs.
6. Record everything needed to reproduce a run.
7. Beat the baseline, check for regressions, and plan deployment.

Working on a fine-tuning project? [Talk to our team](/contact?inquiry=model-training).
