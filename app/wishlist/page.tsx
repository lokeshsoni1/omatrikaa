"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = (product: typeof wishlist[0]) => {
    addToCart(product)
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-serif text-foreground mb-2">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Save your favorite pieces here to revisit them later.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/collections">
              Explore Collections
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-serif text-foreground">
            My Wishlist
          </h1>
          <span className="text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlist.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden"
              >
                <Link href={`/products/${product.slug}`} className="block relative aspect-square">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </Link>

                <div className="p-4">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-semibold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="sm"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromWishlist(product.id)}
                      className="px-3"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
