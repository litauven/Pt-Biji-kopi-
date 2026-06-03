export type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  containImage?: boolean;
  overview: string;
  features: string[];
  benefits: string[];
};

export const products: Product[] = [
  {
    slug: "coffee",
    name: "Premium Indonesian Coffee",
    category: "Food Ingredients",
    image: "/coffee_beans.png",
    overview: "We source and supply high-grade Arabica and Robusta coffee beans directly from the best coffee-producing regions across Indonesia. Ideal for roasters and large-scale beverage manufacturers.",
    features: [
      "Single Origin Arabica (Gayo, Toraja, Kintamani, Mandheling)",
      "High-Quality Commercial Robusta",
      "Strict Quality Control & Sorting",
      "Direct Trade with Local Farmers"
    ],
    benefits: [
      "Consistent flavor profile for commercial roasting",
      "Traceable supply chain",
      "Customizable processing methods (Washed, Natural, Honey)",
      "Competitive pricing for bulk orders"
    ]
  },
  {
    slug: "tea",
    name: "Indonesian Specialty Tea",
    category: "Food Ingredients",
    image: "/specialty_tea.png",
    overview: "Sourced from high-altitude plantations in Java and Sumatra, our teas offer exceptional aroma and taste. We supply bulk orthodox black tea, green tea, and specialty white tea.",
    features: [
      "Hand-plucked orthodox tea",
      "Available in bulk packaging (sacks/paper sacks)",
      "Various grades (BOP, OP, Dust, Fannings)",
      "Pesticide-free options available"
    ],
    benefits: [
      "Perfect for RTD (Ready to Drink) manufacturing",
      "Excellent blending base",
      "Long shelf life due to optimal moisture control"
    ]
  },
  {
    slug: "cocoa",
    name: "Premium Cocoa Products",
    category: "Food Ingredients",
    image: "/cocoa_products.png",
    overview: "We export high-quality fermented cocoa beans, cocoa butter, and cocoa powder sourced from Sulawesi and Sumatra for chocolate manufacturers worldwide.",
    features: [
      "Well-fermented Cocoa Beans",
      "Natural and Alkalized Cocoa Powder",
      "Deodorized Cocoa Butter",
      "High fat content beans"
    ],
    benefits: [
      "Rich, deep chocolate flavor profile",
      "Ideal for premium chocolate manufacturing",
      "Compliant with international food safety standards"
    ]
  },
  {
    slug: "spices",
    name: "Indonesian Spices & Seasonings",
    category: "Food Ingredients",
    image: "/indonesian_spices.png",
    overview: "Indonesia is the home of spices. We supply premium cloves, nutmeg, cinnamon, and pepper for culinary, pharmaceutical, and cosmetic industries.",
    features: [
      "Whole and Ground Spices",
      "High Essential Oil Content",
      "Sun-dried and mechanically dried options",
      "Aflatoxin-tested"
    ],
    benefits: [
      "Intense aroma and flavor",
      "Long-lasting freshness in proper storage",
      "Versatile application across multiple industries"
    ]
  },
  {
    slug: "industrial-machinery",
    name: "Custom Industrial Machinery",
    category: "Technology & Machinery",
    image: "/industrial_machinery.png",
    overview: "We supply and integrate custom industrial machinery for manufacturing plants, focusing on automation, packaging, and processing efficiency.",
    features: [
      "Custom PLC programming",
      "Automated packaging lines",
      "Material handling systems",
      "Energy-efficient motors and drives"
    ],
    benefits: [
      "Significant reduction in manual labor",
      "Increased production output",
      "Lower operational costs",
      "Full after-sales support and maintenance"
    ]
  },
  {
    slug: "oil-water-deep-fryer",
    name: "Oil-Water Separation Deep Fryer",
    category: "Industrial Cooking Equipment",
    image: "/kompor1.png",
    containImage: true,
    overview: "Advanced commercial deep frying technology that utilizes oil-water separation to extend oil life and improve food quality. Ideal for large-scale food production.",
    features: [
      "Automatic temperature control",
      "Residue filtering into water layer",
      "High-grade Stainless Steel (304) construction",
      "Gas or Electric heating options"
    ],
    benefits: [
      "Saves up to 50% on cooking oil",
      "Prevents burnt residue and carcinogen buildup",
      "Consistent frying quality",
      "Easy to clean and maintain"
    ]
  }
];
