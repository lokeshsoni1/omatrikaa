// =====================================================
// OMATRIKAA SITE CONFIGURATION
// Edit this file to customize site-wide settings
// =====================================================

export const siteConfig = {
  name: "Omatrikaa",
  tagline: "Gems & Jewellery",
  description: "Handcrafted Heritage. Modern Elegance. Affordable luxury jewelry with modern + traditional fusion designs.",
  
  // Contact Information
  owner: "ABHISHEK KADEL",
  phone: "+91 99508 32653",
  whatsapp: "919950832653",
  email: "contact@omatrikaa.com",
  instagram: "@omatrikaa",
  instagramUrl: "https://instagram.com/omatrikaa",
  
  // Business Rules
  shipping: {
    minDays: 10,
    maxDays: 15,
    message: "Delivery in 10-15 business days",
    freeAbove: 2500
  },
  
  // Payment
  payment: {
    qrCodeImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qr%20code%20ls-vTOTSvwFAbi7y6r8b8a3p6QGBAm5FX.jpeg",
    payeeName: "Lokesh soni",
    instructions: "Scan the QR code with any UPI app (Google Pay, PhonePe, Paytm, etc.) to complete your payment."
  },
  
  // Images
  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/omatrikaa%20logo.PNG-ADLWDzo4ojagHsHH364ICAOsJYUI59.png",
  favicon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-05-03%20144517-RjDseC02NrwEmUMMHJbUD4HvCB3Y2o.png",
  
  // Hero Section
  hero: {
    title: "Handcrafted Heritage.",
    subtitle: "Modern Elegance.",
    description: "Jewelry that tells your story. Sustainable, handmade pieces blending traditional Indian artistry with contemporary design.",
    primaryCta: "Shop New Arrivals",
    secondaryCta: "Explore Collections"
  },
  
  // Trust Badges
  trustBadges: [
    "10-15 Days Delivery",
    "Handmade in India",
    "Secure QR Payments",
    "Loved by 5000+ Women"
  ],
  
  // About Section
  about: {
    title: "Our Story",
    description: "Omatrikaa was born from a passion to preserve India's rich jewelry-making heritage while making it accessible to the modern woman. Each piece in our collection is handcrafted by skilled artisans using traditional techniques passed down through generations. We believe in sustainable luxury—beautiful jewelry that doesn't cost the earth.",
    founder: "Founded by Abhishek Kadel, Omatrikaa celebrates the divine feminine energy ('Shakti') through jewelry that empowers and adorns."
  },
  
  // Newsletter
  newsletter: {
    title: "Join the Omatrikaa Family",
    description: "Subscribe for exclusive offers, new arrivals, and styling inspiration.",
    placeholder: "Enter your email"
  },
  
  // Social Proof
  socialProof: {
    customerCount: "5000+",
    tagline: "Join thousands of women celebrating with Omatrikaa"
  }
};

// Navigation Links
export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "Earrings", href: "/collections/earrings" },
  { name: "Necklaces", href: "/collections/necklaces" },
  { name: "Bridal", href: "/collections/bridal-sets" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

// Footer Links
export const footerLinks = {
  shop: [
    { name: "All Collections", href: "/collections" },
    { name: "Earrings", href: "/collections/earrings" },
    { name: "Necklaces", href: "/collections/necklaces" },
    { name: "Bridal Sets", href: "/collections/bridal-sets" },
    { name: "Bangles", href: "/collections/bangles" }
  ],
  help: [
    { name: "Shipping Info", href: "/shipping" },
    { name: "FAQs", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
    { name: "Size Guide", href: "/size-guide" }
  ],
  about: [
    { name: "Our Story", href: "/about" },
    { name: "Craftsmanship", href: "/about#craftsmanship" },
    { name: "Sustainability", href: "/about#sustainability" }
  ]
};
