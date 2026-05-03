// =====================================================
// OMATRIKAA PRODUCT DATA
// Edit this file to add/modify products
// Each product has: id, name, slug, price, originalPrice, 
// category, description, images, badges, rating, reviews, 
// materials, occasions, variants, inStock
// =====================================================

export interface ProductVariant {
  name: string;
  value: string;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  images: string[];
  badges: string[];
  rating: number;
  reviewCount: number;
  materials: string[];
  occasions: string[];
  careInstructions: string[];
  variants?: {
    colors?: ProductVariant[];
    sizes?: ProductVariant[];
  };
  inStock: boolean;
  stockCount?: number;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
}

// =====================================================
// CATEGORIES
// =====================================================
export const categories: Category[] = [
  {
    name: "Earrings",
    slug: "earrings",
    description: "Handcrafted jhumkas, studs, and chandbalis",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om1-JJd1rzJ9aDgw0WzP5pWGy9vIW02bn6.jpeg"
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    description: "Temple jewelry and contemporary designs",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om3-fs5rEuNtdp3s3guRfvI2bSlM7uYofB.jpeg"
  },
  {
    name: "Bridal Sets",
    slug: "bridal-sets",
    description: "Complete sets for your special day",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om5-KydbouNgskJkxvZmqY3SyqdxDWCkPi.jpeg"
  },
  {
    name: "Bangles",
    slug: "bangles",
    description: "Traditional kadas and modern bangles",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om4-isC9keJ6KHSLOQg51Xjzv63uyI3DHK.jpeg"
  },
  {
    name: "Maang Tikka",
    slug: "maang-tikka",
    description: "Elegant forehead jewelry",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om2-MzkGT2rDJClEvjQTzSYavvVzQpOCW8.jpeg"
  }
];

// =====================================================
// PRODUCTS
// =====================================================
export const products: Product[] = [
  // Earrings from om1.jpeg - Pearl Chandbali
  {
    id: "prod_001",
    name: "Kundan Pearl Chandbali Earrings",
    slug: "kundan-pearl-chandbali-earrings",
    price: 1899,
    originalPrice: 2499,
    category: "Earrings",
    categorySlug: "earrings",
    description: "Exquisite handcrafted Chandbali earrings featuring intricate Kundan work with lustrous pearls. Each piece is meticulously crafted by skilled artisans, blending traditional techniques with contemporary elegance. The gold-plated brass base ensures durability while maintaining the luxurious appeal. Perfect for weddings, festivals, and special celebrations.",
    shortDescription: "Handcrafted Kundan earrings with pearl drops",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om1-JJd1rzJ9aDgw0WzP5pWGy9vIW02bn6.jpeg"
    ],
    badges: ["Bestseller", "Handmade"],
    rating: 4.9,
    reviewCount: 127,
    materials: ["Gold-plated brass", "Kundan stones", "Fresh water pearls"],
    occasions: ["Wedding", "Festival", "Party", "Ethnic wear"],
    careInstructions: [
      "Store in a dry place away from moisture",
      "Avoid contact with perfumes and chemicals",
      "Clean gently with a soft cloth",
      "Remove before swimming or bathing"
    ],
    variants: {
      colors: [
        { name: "Gold", value: "#D4AF37", available: true },
        { name: "Rose Gold", value: "#B76E79", available: true }
      ]
    },
    inStock: true,
    stockCount: 15
  },
  
  // Earrings from om2.jpeg - Kundan Drop Earrings
  {
    id: "prod_002",
    name: "Lotus Kundan Drop Earrings",
    slug: "lotus-kundan-drop-earrings",
    price: 1499,
    originalPrice: 1999,
    category: "Earrings",
    categorySlug: "earrings",
    description: "Delicate lotus-inspired drop earrings adorned with premium Kundan stones and jade beads. The intricate floral design celebrates Indian heritage while maintaining a versatile elegance suitable for both traditional and fusion outfits. Lightweight and comfortable for all-day wear.",
    shortDescription: "Delicate lotus-inspired Kundan drop earrings",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om2-MzkGT2rDJClEvjQTzSYavvVzQpOCW8.jpeg"
    ],
    badges: ["New Arrival"],
    rating: 4.8,
    reviewCount: 89,
    materials: ["Gold-plated brass", "Kundan stones", "Jade beads", "Pearls"],
    occasions: ["Daily wear", "Office", "Festival", "Casual"],
    careInstructions: [
      "Store in a dry place away from moisture",
      "Avoid contact with perfumes and chemicals",
      "Clean gently with a soft cloth"
    ],
    variants: {
      colors: [
        { name: "Gold", value: "#D4AF37", available: true }
      ]
    },
    inStock: true,
    stockCount: 23
  },
  
  // Earrings from om3.jpeg - Royal Jhumka
  {
    id: "prod_003",
    name: "Royal Ruby Emerald Jhumkas",
    slug: "royal-ruby-emerald-jhumkas",
    price: 2499,
    originalPrice: 3299,
    category: "Earrings",
    categorySlug: "earrings",
    description: "Statement jhumka earrings featuring a stunning combination of ruby-red and emerald-green stones set in traditional Kundan style. The dome-shaped jhumka with pearl and jade bead hangings creates a regal look perfect for bridal occasions and grand celebrations. A true heirloom piece.",
    shortDescription: "Statement jhumkas with ruby and emerald stones",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om3-fs5rEuNtdp3s3guRfvI2bSlM7uYofB.jpeg"
    ],
    badges: ["Bestseller", "Bridal Collection"],
    rating: 4.9,
    reviewCount: 203,
    materials: ["Gold-plated brass", "Ruby stones", "Emerald stones", "Kundan", "Pearls", "Jade beads"],
    occasions: ["Wedding", "Bridal", "Reception", "Sangeet"],
    careInstructions: [
      "Store separately to avoid scratches",
      "Keep away from humidity",
      "Professional cleaning recommended for deep cleaning"
    ],
    variants: {
      colors: [
        { name: "Gold with Ruby", value: "#D4AF37", available: true }
      ]
    },
    inStock: true,
    stockCount: 8
  },
  
  // Earrings from om4.jpeg - Multi-stone Drops
  {
    id: "prod_004",
    name: "Jaipur Garden Drop Earrings",
    slug: "jaipur-garden-drop-earrings",
    price: 1699,
    originalPrice: 2199,
    category: "Earrings",
    categorySlug: "earrings",
    description: "Inspired by the colorful gardens of Jaipur, these drop earrings feature a harmonious blend of ruby, emerald, and Kundan stones. The fish-shaped pendant with pearl clusters and jade drops adds a unique artistic element. Perfect for adding a pop of color to your ethnic ensemble.",
    shortDescription: "Colorful Kundan drops with ruby and emerald",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om4-isC9keJ6KHSLOQg51Xjzv63uyI3DHK.jpeg"
    ],
    badges: ["Festival Special"],
    rating: 4.7,
    reviewCount: 156,
    materials: ["Gold-plated brass", "Kundan stones", "Ruby", "Emerald", "Pearls", "Jade"],
    occasions: ["Festival", "Mehendi", "Haldi", "Party"],
    careInstructions: [
      "Store in a dry place away from moisture",
      "Avoid contact with perfumes and chemicals",
      "Clean gently with a soft cloth"
    ],
    inStock: true,
    stockCount: 19
  },
  
  // Earrings from om5.jpeg - Statement Jhumkas
  {
    id: "prod_005",
    name: "Peacock Paisley Statement Jhumkas",
    slug: "peacock-paisley-statement-jhumkas",
    price: 2899,
    originalPrice: 3499,
    category: "Earrings",
    categorySlug: "earrings",
    description: "Magnificent statement jhumkas featuring the iconic peacock paisley design. The emerald-green border with intricate Kundan work flows into a ruby-domed jhumka adorned with jade beads and pearl hangings. A masterpiece of traditional craftsmanship for the modern bride.",
    shortDescription: "Peacock paisley jhumkas with emerald border",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om5-KydbouNgskJkxvZmqY3SyqdxDWCkPi.jpeg"
    ],
    badges: ["Limited Edition", "Bridal Collection"],
    rating: 5.0,
    reviewCount: 78,
    materials: ["Gold-plated brass", "Emerald stones", "Ruby stones", "Kundan", "Jade beads", "Pearls"],
    occasions: ["Wedding", "Bridal", "Reception", "Grand celebrations"],
    careInstructions: [
      "Handle with care - statement piece",
      "Store in provided jewelry box",
      "Avoid extreme temperatures",
      "Professional cleaning recommended"
    ],
    inStock: true,
    stockCount: 5
  },
  
  // Additional products to reach 15+ items
  {
    id: "prod_006",
    name: "Temple Gold Stud Earrings",
    slug: "temple-gold-stud-earrings",
    price: 999,
    originalPrice: 1299,
    category: "Earrings",
    categorySlug: "earrings",
    description: "Classic temple-inspired gold stud earrings featuring traditional South Indian motifs. Perfect for daily wear and office, these lightweight studs add a touch of elegance to any outfit.",
    shortDescription: "Classic temple-inspired gold studs",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om1-JJd1rzJ9aDgw0WzP5pWGy9vIW02bn6.jpeg"
    ],
    badges: ["Everyday Essential"],
    rating: 4.6,
    reviewCount: 312,
    materials: ["Gold-plated brass", "Kundan stones"],
    occasions: ["Daily wear", "Office", "Casual"],
    careInstructions: [
      "Store in a dry place",
      "Clean with soft cloth"
    ],
    inStock: true,
    stockCount: 45
  },
  
  {
    id: "prod_007",
    name: "Kashi Temple Necklace Set",
    slug: "kashi-temple-necklace-set",
    price: 3299,
    originalPrice: 4199,
    category: "Necklaces",
    categorySlug: "necklaces",
    description: "Inspired by the sacred temples of Kashi, this necklace set features intricate temple motifs with Kundan and pearl embellishments. Complete set includes necklace and matching earrings. A perfect choice for traditional ceremonies.",
    shortDescription: "Temple necklace set with matching earrings",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om3-fs5rEuNtdp3s3guRfvI2bSlM7uYofB.jpeg"
    ],
    badges: ["Complete Set", "Bestseller"],
    rating: 4.8,
    reviewCount: 167,
    materials: ["Gold-plated brass", "Kundan stones", "Pearls"],
    occasions: ["Wedding", "Pooja", "Temple visit", "Festival"],
    careInstructions: [
      "Store in provided box",
      "Keep away from moisture",
      "Clean gently with soft cloth"
    ],
    inStock: true,
    stockCount: 12
  },
  
  {
    id: "prod_008",
    name: "Rajasthani Choker Necklace",
    slug: "rajasthani-choker-necklace",
    price: 2799,
    originalPrice: 3499,
    category: "Necklaces",
    categorySlug: "necklaces",
    description: "Bold Rajasthani-style choker featuring colorful meenakari work and Kundan stones. The adjustable length makes it versatile for various necklines. A statement piece that celebrates the vibrant culture of Rajasthan.",
    shortDescription: "Colorful Rajasthani choker with meenakari",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om5-KydbouNgskJkxvZmqY3SyqdxDWCkPi.jpeg"
    ],
    badges: ["Trending"],
    rating: 4.7,
    reviewCount: 98,
    materials: ["Gold-plated brass", "Meenakari enamel", "Kundan stones"],
    occasions: ["Wedding", "Sangeet", "Festival", "Party"],
    careInstructions: [
      "Handle meenakari with care",
      "Avoid water contact",
      "Store flat to maintain shape"
    ],
    variants: {
      sizes: [
        { name: "14 inches", value: "14", available: true },
        { name: "16 inches", value: "16", available: true },
        { name: "18 inches", value: "18", available: true }
      ]
    },
    inStock: true,
    stockCount: 7
  },
  
  {
    id: "prod_009",
    name: "Bridal Kundan Maang Tikka",
    slug: "bridal-kundan-maang-tikka",
    price: 1299,
    originalPrice: 1699,
    category: "Maang Tikka",
    categorySlug: "maang-tikka",
    description: "Elegant bridal maang tikka featuring premium Kundan stones and pearl drops. The adjustable chain ensures perfect fit for all head sizes. Essential accessory to complete your bridal look.",
    shortDescription: "Bridal maang tikka with Kundan and pearls",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om2-MzkGT2rDJClEvjQTzSYavvVzQpOCW8.jpeg"
    ],
    badges: ["Bridal Essential"],
    rating: 4.9,
    reviewCount: 234,
    materials: ["Gold-plated brass", "Kundan stones", "Pearls"],
    occasions: ["Wedding", "Bridal", "Karwa Chauth"],
    careInstructions: [
      "Store carefully to maintain chain",
      "Keep away from humidity"
    ],
    inStock: true,
    stockCount: 28
  },
  
  {
    id: "prod_010",
    name: "Royal Bridal Jewelry Set",
    slug: "royal-bridal-jewelry-set",
    price: 8999,
    originalPrice: 11999,
    category: "Bridal Sets",
    categorySlug: "bridal-sets",
    description: "Complete bridal jewelry set including necklace, earrings, maang tikka, and bangles. Crafted with premium Kundan stones, rubies, and pearls. This set ensures the bride looks resplendent on her special day. Each piece is individually crafted and quality-checked.",
    shortDescription: "Complete bridal set - necklace, earrings, tikka, bangles",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om5-KydbouNgskJkxvZmqY3SyqdxDWCkPi.jpeg"
    ],
    badges: ["Complete Bridal Set", "Premium"],
    rating: 5.0,
    reviewCount: 56,
    materials: ["Gold-plated brass", "Kundan stones", "Ruby stones", "Pearls"],
    occasions: ["Wedding", "Bridal"],
    careInstructions: [
      "Professional storage recommended",
      "Individual piece care required",
      "Keep in original packaging"
    ],
    inStock: true,
    stockCount: 3
  },
  
  {
    id: "prod_011",
    name: "Antique Gold Kada Bangle",
    slug: "antique-gold-kada-bangle",
    price: 1599,
    originalPrice: 1999,
    category: "Bangles",
    categorySlug: "bangles",
    description: "Stunning antique-finish kada bangle with intricate carved patterns. The substantial weight gives it a premium feel while the adjustable opening ensures comfortable fit for most wrist sizes.",
    shortDescription: "Antique finish kada with carved patterns",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om4-isC9keJ6KHSLOQg51Xjzv63uyI3DHK.jpeg"
    ],
    badges: ["Antique Collection"],
    rating: 4.6,
    reviewCount: 145,
    materials: ["Gold-plated brass", "Antique finish"],
    occasions: ["Daily wear", "Festival", "Traditional"],
    careInstructions: [
      "Antique finish may develop patina",
      "Clean with dry cloth only"
    ],
    variants: {
      sizes: [
        { name: "2.4", value: "2.4", available: true },
        { name: "2.6", value: "2.6", available: true },
        { name: "2.8", value: "2.8", available: true }
      ]
    },
    inStock: true,
    stockCount: 22
  },
  
  {
    id: "prod_012",
    name: "Pearl Cluster Jhumkas",
    slug: "pearl-cluster-jhumkas",
    price: 1799,
    originalPrice: 2299,
    category: "Earrings",
    categorySlug: "earrings",
    description: "Elegant jhumkas featuring clusters of fresh water pearls arranged in a traditional dome shape. The lightweight design makes them comfortable for extended wear while maintaining the grandeur expected of jhumka earrings.",
    shortDescription: "Fresh water pearl cluster jhumkas",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om1-JJd1rzJ9aDgw0WzP5pWGy9vIW02bn6.jpeg"
    ],
    badges: ["Pearl Collection"],
    rating: 4.8,
    reviewCount: 189,
    materials: ["Gold-plated brass", "Fresh water pearls"],
    occasions: ["Wedding", "Party", "Reception", "Engagement"],
    careInstructions: [
      "Pearls are delicate - handle with care",
      "Keep away from chemicals and perfumes",
      "Store in soft pouch"
    ],
    inStock: true,
    stockCount: 16
  },
  
  {
    id: "prod_013",
    name: "Meenakari Chandbali Earrings",
    slug: "meenakari-chandbali-earrings",
    price: 2199,
    originalPrice: 2799,
    category: "Earrings",
    categorySlug: "earrings",
    description: "Exquisite Chandbali earrings featuring traditional Meenakari enamel work in vibrant colors. The moon-shaped design with intricate patterns represents the finest of Rajasthani craftsmanship. A true collector&apos;s piece.",
    shortDescription: "Colorful Meenakari chandbali earrings",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om3-fs5rEuNtdp3s3guRfvI2bSlM7uYofB.jpeg"
    ],
    badges: ["Artisan Made"],
    rating: 4.7,
    reviewCount: 134,
    materials: ["Gold-plated brass", "Meenakari enamel", "Kundan stones"],
    occasions: ["Festival", "Sangeet", "Mehendi", "Party"],
    careInstructions: [
      "Meenakari is delicate - avoid drops",
      "Keep away from water",
      "Store in padded box"
    ],
    inStock: true,
    stockCount: 11
  },
  
  {
    id: "prod_014",
    name: "Contemporary Kundan Hoops",
    slug: "contemporary-kundan-hoops",
    price: 1399,
    originalPrice: 1799,
    category: "Earrings",
    categorySlug: "earrings",
    description: "Modern hoop earrings reimagined with traditional Kundan stone setting. The fusion design bridges contemporary fashion with Indian heritage, making them perfect for the modern woman who appreciates both worlds.",
    shortDescription: "Modern hoops with traditional Kundan work",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om2-MzkGT2rDJClEvjQTzSYavvVzQpOCW8.jpeg"
    ],
    badges: ["Fusion Collection", "New"],
    rating: 4.5,
    reviewCount: 67,
    materials: ["Gold-plated brass", "Kundan stones"],
    occasions: ["Daily wear", "Office", "Brunch", "Casual"],
    careInstructions: [
      "Clean with soft cloth",
      "Store in dry place"
    ],
    inStock: true,
    stockCount: 31
  },
  
  {
    id: "prod_015",
    name: "Emerald Drop Necklace",
    slug: "emerald-drop-necklace",
    price: 2599,
    originalPrice: 3199,
    category: "Necklaces",
    categorySlug: "necklaces",
    description: "Elegant necklace featuring a stunning emerald-colored stone pendant with Kundan surround. The delicate gold chain adds sophistication while keeping the focus on the statement pendant. Versatile enough for both ethnic and western outfits.",
    shortDescription: "Emerald pendant necklace with Kundan surround",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om4-isC9keJ6KHSLOQg51Xjzv63uyI3DHK.jpeg"
    ],
    badges: ["Versatile"],
    rating: 4.8,
    reviewCount: 112,
    materials: ["Gold-plated brass", "Emerald stone", "Kundan"],
    occasions: ["Party", "Date night", "Reception", "Festival"],
    careInstructions: [
      "Store flat to prevent chain tangling",
      "Keep away from moisture"
    ],
    variants: {
      sizes: [
        { name: "16 inches", value: "16", available: true },
        { name: "18 inches", value: "18", available: true },
        { name: "20 inches", value: "20", available: true }
      ]
    },
    inStock: true,
    stockCount: 14
  }
];

// =====================================================
// HELPER FUNCTIONS
// =====================================================
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(count: number = 8): Product[] {
  return products
    .filter(p => p.badges.includes("Bestseller") || p.badges.includes("New Arrival") || p.badges.includes("Trending"))
    .slice(0, count);
}

export function getNewArrivals(count: number = 4): Product[] {
  return products.filter(p => p.badges.includes("New Arrival") || p.badges.includes("New")).slice(0, count);
}

export function getBestSellers(count: number = 4): Product[] {
  return products.filter(p => p.badges.includes("Bestseller")).slice(0, count);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.materials.some(m => m.toLowerCase().includes(lowerQuery)) ||
    p.occasions.some(o => o.toLowerCase().includes(lowerQuery))
  );
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}
