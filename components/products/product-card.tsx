'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store';
import { formatPrice, type Product } from '@/lib/data/products';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { openQuickView } = useUIStore();
  
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success('Added to cart!', { description: product.name });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn('group block', className)}
    >
      <div className="relative">
        {/* Image Container */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary mb-3">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className={cn(
                    'px-2 py-1 text-[10px] md:text-xs font-medium rounded-full',
                    badge === 'Bestseller' && 'bg-gold text-charcoal',
                    badge === 'New Arrival' || badge === 'New' && 'bg-teal text-white',
                    badge === 'Limited Edition' && 'bg-maroon text-white',
                    badge !== 'Bestseller' && badge !== 'New Arrival' && badge !== 'New' && badge !== 'Limited Edition' && 'bg-charcoal/80 text-white'
                  )}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-2 right-2 px-2 py-1 bg-maroon text-white text-[10px] md:text-xs font-semibold rounded-full">
              -{discount}%
            </span>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <motion.button
              onClick={handleQuickView}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-gold hover:text-charcoal transition-colors shadow-lg"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </motion.button>
            <motion.button
              onClick={handleWishlistToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors',
                inWishlist 
                  ? 'bg-maroon text-white' 
                  : 'bg-white text-charcoal hover:bg-maroon hover:text-white'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
            </motion.button>
          </div>

          {/* Stock Warning */}
          {product.stockCount && product.stockCount <= 5 && (
            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-maroon/90 text-white text-[10px] text-center rounded-full">
              Only {product.stockCount} left!
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          {/* Category */}
          <p className="text-[10px] md:text-xs text-gold font-medium uppercase tracking-wider">
            {product.category}
          </p>
          
          {/* Title */}
          <h3 className="font-medium text-sm md:text-base line-clamp-2 group-hover:text-gold transition-colors text-balance">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-muted-foreground'}
                />
              ))}
            </div>
            <span className="text-[10px] md:text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-base md:text-lg text-gold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-charcoal hover:bg-charcoal-light text-white opacity-0 group-hover:opacity-100 transition-opacity"
          size="sm"
        >
          <ShoppingBag size={14} className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </Link>
  );
}
