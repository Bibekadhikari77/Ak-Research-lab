// MeroIMS product facts. Everything here mirrors what https://meroims.com
// states publicly (checked October 2026), plus the Restaurant and E-commerce
// suites confirmed by the product team before they appear on the public site.
// When the product changes, update this file rather than editing copy inside
// components, and do not add capabilities the live product doesn't offer.

export type MeroimsFeature = {
  id: string;
  tab: string;
  title: string;
  summary: string;
  points: string[];
  image?: { src: string; alt: string };
  /** Named sub-modules, shown as a visual when there is no image. */
  modules?: { name: string; description: string }[];
};

export const meroimsTagline =
  "One AI accounting software that connects your inventory, billing, VAT, and finances.";

export const meroimsDescription =
  "MeroIMS is a business management platform developed by AK Research Lab. It brings inventory, billing, purchases, sales, parties, expenses, income, and accounting into one connected system, with dedicated tools for restaurants and online stores, and AI assistance that helps businesses reduce manual work and see their operations clearly.";

export const meroimsFeatures: MeroimsFeature[] = [
  {
    id: "inventory",
    tab: "Inventory",
    title: "Inventory management with real-time stock tracking",
    summary:
      "Know what you have and where it is. Stock levels update as you buy, sell, and transfer.",
    points: [
      "Real-time stock levels across every location",
      "Batch and barcode tracking, with a barcode scanner module",
      "Automatic reorder for items running low",
      "Stock transfers between locations",
    ],
    image: {
      src: "/meroims/inventory-management.jpeg",
      alt: "Illustration of inventory boxes, a barcode, and two connected warehouses",
    },
  },
  {
    id: "billing",
    tab: "Billing & VAT",
    title: "VAT billing and e-invoicing for Nepal",
    summary:
      "Issue VAT invoices and prepare returns from the same records you already keep.",
    points: [
      "VAT-ready invoices generated from sales",
      "VAT returns prepared from your transaction data",
      "E-billing, with IRD-registered billing available as an add-on",
      "Credit notes, returns, and refunds",
    ],
    image: {
      src: "/meroims/vat-billing-e-invoicing.jpeg",
      alt: "Illustration of an invoice with VAT details",
    },
  },
  {
    id: "sales",
    tab: "Sales & POS",
    title: "Sales and point of sale",
    summary:
      "Move from quotation to payment quickly, with every sale reflected in stock.",
    points: [
      "Fast checkout at the counter",
      "Quotations and orders synced to stock",
      "Customer records and sales history",
      "Loyalty points for repeat customers",
    ],
    image: {
      src: "/meroims/sales-pos-system.jpeg",
      alt: "Illustration of a point-of-sale terminal",
    },
  },
  {
    id: "purchases",
    tab: "Purchases",
    title: "Purchase orders and supplier management",
    summary:
      "Track every purchase from order to payment and keep supplier accounts organized.",
    points: [
      "Purchase orders through to payment",
      "Supplier ledgers and transaction history",
      "Landed cost tracking",
      "Customer and supplier records with PAN/VAT details",
    ],
    image: {
      src: "/meroims/purchase-order-supplier-management.jpeg",
      alt: "Illustration of a purchase order moving to a supplier",
    },
  },
  {
    id: "accounting",
    tab: "Accounting",
    title: "AI-powered double-entry accounting",
    summary:
      "Journals, ledgers, and financial statements are kept in step with day-to-day operations.",
    points: [
      "Automatic journals, ledgers, and financial statements",
      "Income and expense tracking",
      "Bank reconciliation",
      "Fixed asset records",
    ],
    image: {
      src: "/meroims/double-entry-accounting.jpeg",
      alt: "Illustration of a balanced ledger",
    },
  },
  {
    id: "reports",
    tab: "Reports",
    title: "Business analytics and financial reports",
    summary:
      "See how the business is doing without assembling spreadsheets by hand.",
    points: [
      "Live dashboards and profit tracking",
      "A large library of standard reports, plus custom reports",
      "Sales, purchase, inventory, income, and expense summaries",
      "Audit trail of changes",
    ],
    image: {
      src: "/meroims/business-analytics-reports.jpeg",
      alt: "Illustration of business charts and reports",
    },
  },
  {
    id: "restaurant",
    tab: "Restaurant",
    title: "Restaurant",
    summary:
      "Tools for running a restaurant floor, from the counter to the table, on the same records as your stock and accounts.",
    points: [
      "Restaurant Till for orders and payments at the counter",
      "Tables & QR to manage tables, each with its own QR code",
      "Waiter View, a dedicated screen for waiting staff",
    ],
    modules: [
      {
        name: "Restaurant Till",
        description: "Orders and payments at the counter",
      },
      { name: "Tables & QR", description: "Table management with QR codes" },
      { name: "Waiter View", description: "A dedicated screen for staff" },
    ],
  },
  {
    id: "ecommerce",
    tab: "E-commerce",
    title: "E-commerce",
    summary: "Take your business online with a web store managed from MeroIMS.",
    points: [
      "Web Store to sell online",
      "Storefront Design to customize how your store looks",
    ],
    modules: [
      { name: "Web Store", description: "Sell online, managed from MeroIMS" },
      {
        name: "Storefront Design",
        description: "Customize your store's look",
      },
    ],
  },
  {
    id: "ai",
    tab: "AI Assistant",
    title: "Mero AI Assistant",
    summary:
      "Ask questions about your business in plain language, by chat or voice, and get answers drawn from your own data.",
    points: [
      "Generate reports on request",
      "Forecast inventory and get purchase suggestions",
      "Customer insights",
      "Help with invoices, accounting questions, and contracts",
    ],
  },
];

export const meroimsModules = [
  "Customer Management",
  "CRM",
  "Projects",
  "Tasks",
  "Payroll",
  "Expenses",
  "Income",
  "Approval Workflow",
  "Role Management",
  "Contract Generator",
  "Backup",
  "Notifications",
  "AI Assistant",
  "Voice Assistant",
  "Quotations",
  "Credit Notes",
  "Stock Transfer",
  "Barcode Scanner",
  "Landed Cost",
  "Fixed Assets",
  "Bank Reconciliation",
  "Custom Reports",
  "Audit Trail",
  "Return & Refund",
  "Loyalty Points",
  "Restaurant Till",
  "Tables & QR",
  "Waiter View",
  "Web Store",
  "Storefront Design",
];

export const meroimsWorkflow = [
  "Lead",
  "Quotation",
  "Customer",
  "Purchase",
  "Inventory",
  "Sales",
  "Invoice",
  "VAT",
  "Accounting",
  "Profit",
  "Report",
  "Dashboard",
];

export const meroimsIndustries = [
  "Retail",
  "Wholesale",
  "Restaurant",
  "Pharmacy",
  "Electronics",
  "Clothing",
  "Construction",
  "Furniture",
  "Automobile",
  "Manufacturing",
  "Education",
  "Hospital",
];

export const meroimsBenefits = [
  {
    title: "One connected system",
    description:
      "Sales, stock, purchases, VAT, and accounts share the same records, so a sale updates inventory and the books together.",
  },
  {
    title: "Less manual entry",
    description:
      "Journals, statements, and VAT documents are generated from the transactions you already record.",
  },
  {
    title: "Built for Nepali businesses",
    description:
      "VAT billing, PAN/VAT party details, and IRD-registered billing support reflect how businesses in Nepal operate.",
  },
  {
    title: "Controlled access",
    description:
      "Role management, approval workflows, and an audit trail help teams work together without losing track of changes.",
  },
];
