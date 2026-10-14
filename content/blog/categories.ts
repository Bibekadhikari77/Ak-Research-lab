// Blog categories. A post's `category` frontmatter must match one of these
// slugs; the build fails with a clear message if it doesn't. Add, rename,
// or reorder categories here and the blog filters update automatically.

export const blogCategories = [
  {
    slug: "ai-research",
    name: "AI Research",
    description: "Findings and notes from our applied AI work.",
  },
  {
    slug: "gpu-infrastructure",
    name: "GPU Infrastructure",
    description: "Provisioning, operating, and sizing GPU compute.",
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    description: "Practical machine learning techniques and trade-offs.",
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    description: "Architecture, APIs, and building reliable systems.",
  },
  {
    slug: "model-training",
    name: "Model Training",
    description: "Training, fine-tuning, and evaluating models.",
  },
  {
    slug: "cloud-computing",
    name: "Cloud Computing",
    description: "Running workloads across cloud and on-premise compute.",
  },
  {
    slug: "engineering-tutorials",
    name: "Engineering Tutorials",
    description: "Step-by-step guides from our engineers.",
  },
  {
    slug: "meroims",
    name: "MeroIMS Product Updates",
    description: "News and releases for MeroIMS.",
  },
  {
    slug: "business-automation",
    name: "Business Automation",
    description: "Automating business workflows with software and AI.",
  },
  {
    slug: "company-news",
    name: "Company News",
    description: "Announcements from AK Research Lab.",
  },
] as const;

export type BlogCategorySlug = (typeof blogCategories)[number]["slug"];
export type BlogCategory = (typeof blogCategories)[number];
