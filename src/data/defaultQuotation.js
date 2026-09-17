export const defaultQuotationData = {
  company: {
    name: "MA CREATION",
    subtitle: "Web Development & Digital Software Solutions",
    address: "Lavish Library, 1st Floor, Charkhi Dadri, Haryana - 127306",
    phone: "+91 83960 04077",
    email: "macreation017@gmail.com",
    // gstin: "06AAAFM1234F1Z5",
    // pan: "AAAFM1234F",
    // bank: {
    //   accountName: "MA CREATION",
    //   bankName: "HDFC Bank Ltd.",
    //   accountNumber: "50200084920194",
    //   ifscCode: "HDFC0001890",
    //   branch: "Charkhi Dadri, Haryana",
    //   upiId: "macreation@hdfcbank"
    // }
  },
  meta: {
    quotationNo: "MAC/2026/QT-108",
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: "₹",
    preparedBy: "Mohit Arya (Lead Technical Architect)",
    status: "Proposal / Estimate"
  },
  client: {
    name: "M/s Royal Elegance Clothing Co.",
    // attention: "Attn: Store Owner / Management",
    address: "Station Road , Charkhi Dadri , Haryana",
    phone: "+91 70829 21003"
  },
  project: {
    title: "Ladies Clothing Shopify E-Commerce Website & Store Setup",
    summary: "End-to-end development & customization of a high-performance, mobile-first Shopify e-commerce web platform specially tailored for ethnic & contemporary ladies wear. Features bespoke showcase for Kurta, Laancha, Lehnga & party wear collections, along with full Shopify administrative controls for catalog, inventory, order processing, and sales analytics.",
    categories: [
      { name: "Sarees & Dupattas", desc: "Silk, Organza, Banarasi & Embroidered Party Wear" },
      { name: "Kurta & Kurti", desc: "A-Line, Anarkali, Straight Cut, Daily Wear & Festive Kurtis" },
      { name: "Laancha Sets", desc: "Traditional Royal Flair, Mirror Work & Handcrafted Ensembles" },
      { name: "Lehnga Choli", desc: "Bridal, Semi-Stitched, Designer Festive & Reception Collections" }
    ],
    features: [
      "Ultra-fast Shopify luxury boutique storefront with custom styling & mobile optimization",
      "Dynamic multi-attribute product filters (Size XS-5XL, Color swatches, Fabric, Price range)",
      "High-resolution interactive image zoom, swatch selector & responsive photo gallery",
      "Shopify Admin Dashboard with product, stock, discount coupons & order fulfillment controls",
      "Seamless Indian Payment Gateway (Razorpay / PhonePe / Paytm) & COD integration",
      "Automated Order Confirmation via Email & WhatsApp/SMS alerts",
      "Courier API tracking integration (Shiprocket / Delhivery ready)",
      "SEO friendly metadata for Kurta, Laancha, Lehnga keywords to boost Google ranking"
    ]
  },
  items: [
    {
      id: 1,
      title: "Premium Shopify Storefront & Luxury Boutique UI/UX Customization",
      description: "Customized premium Shopify theme tailored for Ladies Ethnic Wear. Dedicated homepage sections, mobile-first responsive design, collections for Kurta, Laancha, Lehnga, Sarees, product detail pages with size charts, color variants, high-res zoom & quick cart drawer.",
      qty: 1,
      rate: 18000,
      amount: 18000
    },
    {
      id: 2,
      title: "Shopify Store Architecture, Catalog & Inventory Configuration",
      description: "Complete Shopify store setup: Multi-tier categories, product variant matrices (sizes XS-5XL, colors, fabrics), automated collections, stock inventory alerts, customer database setup, and tax/invoice rules configuration.",
      qty: 1,
      rate: 14000,
      amount: 14000
    },
    {
      id: 3,
      title: "Shopify App Integrations, Custom Features & Conversion Boosters",
      description: "Installation & configuration of essential Shopify apps: Abandoned cart recovery, customer product reviews/ratings, dynamic discount coupons & announcement bars.",
      qty: 1,
      rate: 10000,
      amount: 10000
    },
    {
      id: 4,
      title: "Payment Gateway, Email Notifications & Courier Logistics",
      description: "Integration of Indian Payment Gateways (Razorpay / PhonePe / Paytm / Cash on Delivery), automated Email notifications, and courier shipping integration (Shiprocket / Delhivery / Bluedart automated tracking).",
      qty: 1,
      rate: 7000,
      amount: 7000
    },
    {
      id: 5,
      title: "Custom Domain Linking, Shopify Security & 1 Year Premium Maintenance",
      description: "Custom domain DNS setup, SSL security verification, SEO optimization for Google search, staff admin training & walkthrough, and 1 Year complimentary technical support & store maintenance.",
      qty: 1,
      rate: 15000,
      amount: 15000
    }
  ],
  pricingSummary: {
    discountPercent: 0,
    taxPercent: 0,
    taxLabel: "GST (Excluded / Extra)",
    notes: "Total project cost is ₹64,000 (GST Excluded. Includes premium Shopify theme customization, clothing storefront, catalog setup, payment gateway, courier integration, custom domain linking, and 1 Year technical support)."
  },
  milestones: [
    { phase: "Stage 1: Advance / Project Kickoff", percentage: 50, amount: 32000, trigger: "50% advance payment upon work authorization & project initiation" },
    { phase: "Stage 2: Final Delivery, Live Domain & Handover", percentage: 50, amount: 32000, trigger: "50% balance upon final testing, domain setup & live launch" }
  ],
  timeline: {
    totalDuration: "2 to 3 Weeks",
    phases: [
      { name: "Week 1", desc: "Shopify store setup, theme selection, category planning (Kurta, Laancha, Lehnga) & UI customization" },
      { name: "Week 2", desc: "Catalog & variant setup, apps configuration, payment gateway & courier integration" },
      { name: "Week 3", desc: "Custom domain DNS linking, SSL, payment testing, admin training & live launch" }
    ]
  },
  terms: [
    "The total project cost is ₹64,000 as agreed for the scope detailed in this quotation.",
    "Scope includes Ladies Clothing Shopify E-commerce storefront with categories (Kurta, Laancha, Lehnga, Sarees, etc.) and complete Shopify Store Configuration.",
    "Payment Terms: 50% Advance upon project kickoff (₹32,000) and 50% on final delivery & live handover (₹32,000).",
    "All prices and rates quoted are exclusive of GST (GST Excluded / Extra as applicable).",
    "1 Year complimentary bug-fixing and technical maintenance support is included after live deployment.",
    "Third-party recurring costs (Shopify monthly subscription plan, custom domain registration, paid app subscriptions, SMS credits, payment gateway transaction fees) are directly borne by client.",
    "Any additional custom modules requested outside this scope will be quoted separately upon agreement.",
    "Quotation remains valid for 15 days from the date of issuance."
  ]
};
