'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Minus, Plus, ShoppingBag, Truck, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore, useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice } from '@/lib/data/products';
import { siteConfig } from '@/lib/data/site-config';
import { toast } from 'sonner';

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useUIStore();
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    toast.success('Added to cart!', {
      description: product.name
    });
    closeQuickView();
  };

  const handleWishlistToggle = () => {
    toggleItem(product);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeQuickView}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[85vh] bg-background rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:text-gold transition-colors"
              aria-label="Close quick view"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2 h-full overflow-y-auto md:overflow-hidden">
              {/* Image Section */}
              <div className="relative bg-secondary p-6 md:p-8">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {/* Badges */}
                  {product.badges.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {product.badges.slice(0, 2).map((badge) => (
                        <span
                          key={badge}
                          className="px-3 py-1 bg-maroon text-white text-xs font-medium rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                          selectedImage === index ? 'border-gold' : 'border-transparent'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="p-6 md:p-8 md:overflow-y-auto">
                {/* Category */}
                <Link
                  href={`/collections/${product.categorySlug}`}
                  onClick={closeQuickView}
                  className="text-sm text-gold hover:underline"
                >
                  {product.category}
                </Link>

                {/* Title */}
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-2 mb-3">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-serif text-3xl font-bold text-gold">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-sm text-maroon font-medium">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-muted-foreground mb-6">
                  {product.shortDescription}
                </p>

                {/* Color Variants */}
                {product.variants?.colors && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Color</p>
                    <div className="flex gap-2">
                      {product.variants.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          disabled={!color.available}
                          className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                            selectedColor === color.name
                              ? 'border-foreground scale-110'
                              : 'border-transparent hover:border-muted-foreground'
                          } ${!color.available && 'opacity-50 cursor-not-allowed'}`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        >
                          {selectedColor === color.name && (
                            <Check size={14} className="absolute inset-0 m-auto text-white drop-shadow" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Variants */}
                {product.variants?.sizes && (
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Size</p>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.sizes.map((size) => (
                        <button
                          key={size.value}
                          onClick={() => setSelectedSize(size.value)}
                          disabled={!size.available}
                          className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                            selectedSize === size.value
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-border hover:border-gold'
                          } ${!size.available && 'opacity-50 cursor-not-allowed'}`}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-sm font-medium">Quantity</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gold hover:bg-gold-dark text-charcoal font-semibold btn-shine"
                    size="lg"
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWishlistToggle}
                    className={`border-2 ${inWishlist ? 'border-maroon text-maroon' : 'border-border'}`}
                  >
                    <Heart
                      size={18}
                      className={inWishlist ? 'fill-maroon' : ''}
                    />
                  </Button>
                </div>

                {/* Trust Info */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck size={16} />
                  <span>{siteConfig.shipping.message}</span>
                </div>

                {/* View Full Details */}
                <Link
                  href={`/products/${product.slug}`}
                  onClick={closeQuickView}
                  className="block mt-4 text-sm text-gold hover:underline"
                >
                  View full details →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
