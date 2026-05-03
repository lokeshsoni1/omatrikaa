"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Tag, ArrowRight, Sparkles } from "lucide-react"
import { products } from "@/lib/data/products"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"

export default function OffersPage() {
  // Get products with discounts
  const saleProducts = products.filter((p) => p.originalPrice && p.originalPrice > p.price)

  const offers = [
    {
      title: "First Purchase Discount",
      description: "Get 10% off on your first order",
      code: "FIRST10",
      validTill: "No expiry",
      color: "from-primary/20 to-secondary/20",
    },
    {
      title: "Free Shipping",
      description: "On all orders above Rs. 5,000",
      code: "Auto-applied",
      validTill: "Always",
      color: "from-green-100 to-emerald-100",
    },
    {
      title: "Wedding Season Special",
      description: "Up to 25% off on bridal collections",
      code: "BRIDE25",
      validTill: "Limited time",
      color: "from-pink-100 to-rose-100",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Special Offers
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-4">
              Exclusive Deals & Offers
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover amazing discounts on our exquisite jewellery collection. 
              Limited time offers you don&apos;t want to miss!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Active Offers */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif text-foreground mb-8">Active Offers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${offer.color} rounded-2xl p-6 border border-border`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Tag className="w-8 h-8 text-primary" />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {offer.validTill}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{offer.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
                <div className="bg-background/80 rounded-lg px-4 py-2 inline-block">
                  <span className="text-xs text-muted-foreground">Code: </span>
                  <span className="font-mono font-semibold text-primary">{offer.code}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products */}
      {saleProducts.length > 0 && (
        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-serif text-foreground">Sale Items</h2>
                <p className="text-muted-foreground mt-1">Grab these deals before they&apos;re gone</p>
              </div>
              <Button asChild variant="ghost">
                <Link href="/collections">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {saleProducts.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2a2118] to-[#4a3728] p-8 lg:p-12">
            <div className="relative z-10 lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-serif text-white mb-4">
                  Subscribe for Exclusive Offers
                </h3>
                <p className="text-white/80 mb-6">
                  Be the first to know about new collections, special discounts, and member-only deals.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/#newsletter">
                    Subscribe Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="hidden lg:flex justify-end">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om1-JJd1rzJ9aDgw0WzP5pWGy9vIW02bn6.jpeg"
                  alt="Special Offer"
                  width={300}
                  height={300}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
