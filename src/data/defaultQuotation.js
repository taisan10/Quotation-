export const defaultQuotationData = {
  company: {
    name: "MA CREATION",
    subtitle: "Web Development & Digital Software Solutions",
    address: "Lavish Library, 1st Floor, Charkhi Dadri, Haryana - 127306",
    phone: "+91 83960 04077",
    email: "macreation017@gmail.com",
    gstin: "06AAAFM1234F1Z5",
    pan: "AAAFM1234F",
    bank: {
      accountName: "MA CREATION",
      bankName: "HDFC Bank Ltd.",
      accountNumber: "50200084920194",
      ifscCode: "HDFC0001890",
      branch: "Charkhi Dadri, Haryana",
      upiId: "macreation@hdfcbank"
    }
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
    title: "Ladies Clothing E-Commerce Website & Custom Admin Dashboard",
    summary: "End-to-end development of a high-performance, mobile-first e-commerce web platform specially tailored for ethnic & contemporary ladies wear. Features bespoke showcase for Kurta, Laancha, Lehnga & party wear collections, along with a dedicated custom administrative dashboard for catalog, inventory, order processing, and sales analytics.",
    categories: [
      { name: "Kurta & Kurti", desc: "A-Line, Anarkali, Straight Cut, Daily Wear & Festive Kurtis" },
      { name: "Laancha Sets", desc: "Traditional Royal Flair, Mirror Work & Handcrafted Ensembles" },
      { name: "Lehnga Choli", desc: "Bridal, Semi-Stitched, Designer Festive & Reception Collections" },
      { name: "Sarees & Dupattas", desc: "Silk, Organza, Banarasi & Embroidered Party Wear" }
    ],
    features: [
      "Ultra-fast Next.js React storefront with luxury boutique aesthetics",
      "Dynamic multi-attribute product filters (Size XS-5XL, Color swatches, Fabric, Price range)",
      "High-resolution interactive image zoom & responsive photo gallery",
      "Custom Admin Dashboard with product, stock, discount & order fulfillment controls",
      "Seamless Razorpay / PhonePe / Paytm Payment Gateway & COD support",
      "Automated Order Confirmation via Email & WhatsApp/SMS alerts",
      "Courier API tracking integration (Shiprocket / Delhivery ready)",
      "SEO friendly metadata for Kurta, Laancha, Lehnga keywords to boost Google ranking"
    ]
  },
  items: [
    {
      id: 1,
      title: "Luxury Boutique UI/UX & Responsive Web Storefront",
      description: "Custom frontend built with Next.js. Dedicated landing page, mobile-first responsive architecture, category showcases for Kurta, Laancha, Lehnga, product detail pages with size charts, color swatches, wishlist & shopping cart.",
      qty: 1,
      rate: 16000,
      amount: 16000
    },
    {
      id: 2,
      title: "Custom Admin Dashboard & Multi-tier Catalog Management",
      description: "Comprehensive administrative suite: Add/edit/delete products, multi-angle HD photo upload, category & sub-category manager, real-time stock alert thresholds, customer database, order status tracking (Pending, Dispatched, Delivered).",
      qty: 1,
      rate: 14000,
      amount: 14000
    },
    {
      id: 3,
      title: "E-Commerce Backend, Relational Database & Cart Architecture",
      description: "Scalable backend database (PostgreSQL/MongoDB), secure user authentication, customer profile & order history, server-side search indexing, automated PDF tax invoice generator for buyers.",
      qty: 1,
      rate: 9000,
      amount: 9000
    },
    {
      id: 4,
      title: "Payment Gateway, WhatsApp/SMS Alerts & Shipping Integration",
      description: "Integration of Indian Payment Gateways (Razorpay/UPI/Credit/Debit/Netbanking), automated instant order notification via WhatsApp/Email, and courier tracking connector (Shiprocket/Delhivery).",
      qty: 1,
      rate: 5000,
      amount: 5000
    },
    {
      id: 5,
      title: "Dedicated Cloud Setup, Custom Domain, SSL & 1 Year Premium Maintenance",
      description: "Production cloud server deployment (AWS/Vercel), dedicated domain DNS linking, automated SSL security, CDN image caching, daily database backups, priority technical maintenance & 1 Year bug-fix warranty.",
      qty: 1,
      rate: 19000,
      amount: 19000
    }
  ],
  pricingSummary: {
    discountPercent: 0,
    taxPercent: 0,
    taxLabel: "GST (Excluded / Extra)",
    notes: "Total project cost is ₹63,000 (GST Excluded. Includes UI/UX design, clothing storefront, custom admin panel, payment gateway, domain setup and 1 Year maintenance)."
  },
  milestones: [
    { phase: "Stage 1: Advance / Project Kickoff", percentage: 50, amount: 31500, trigger: "50% advance payment upon work authorization & project initiation" },
    { phase: "Stage 2: Final Delivery, Live Domain & Handover", percentage: 50, amount: 31500, trigger: "50% balance upon final testing, domain setup & live launch" }
  ],
  timeline: {
    totalDuration: "3 to 4 Weeks",
    phases: [
      { name: "Week 1", desc: "Design mockups, category planning (Kurta, Laancha, Lehnga) & UI finalization" },
      { name: "Week 2", desc: "Core storefront development, category filtering & custom admin dashboard" },
      { name: "Week 3", desc: "Payment gateway, SMS/order alerts & courier tracking integration" },
      { name: "Week 4", desc: "Domain linking, SSL, cloud deployment, admin training & live launch" }
    ]
  },
  terms: [
    "The total project cost is ₹63,000 as agreed for the scope detailed in this quotation.",
    "Scope includes Ladies Clothing E-commerce storefront with categories (Kurta, Laancha, Lehnga, Sarees, etc.) and complete Custom Admin Dashboard.",
    "Payment Terms: 50% Advance upon project kickoff and 50% on final delivery & live handover.",
    "All prices and rates quoted are exclusive of GST (GST Excluded / Extra as applicable).",
    "1 Year complimentary bug-fixing and technical maintenance support is included after live deployment.",
    "Third-party recurring costs (Domain registration, hosting renewals, SMS credits, payment gateway charges) are directly borne by client.",
    "Any additional custom modules requested outside this scope will be quoted separately upon agreement.",
    "Quotation remains valid for 15 days from the date of issuance."
  ]
};
