'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShoppingBag, Minus, Plus, Star, Truck, Shield, 
  ChevronRight, Share2, Check, ZoomIn, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore, useWishlistStore, useRecentlyViewedStore } from '@/lib/store';
import { formatPrice, products, type Product } from '@/lib/data/products';
import { siteConfig } from '@/lib/data/site-config';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/products/product-card';

interface ProductDetailContentProps {
  product: Product;
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.variants?.colors?.[0]?.name
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.variants?.sizes?.[0]?.value
  );
  const [isZoomed, setIsZoomed] = useState(false);
  
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem: addToRecentlyViewed } = useRecentlyViewedStore();
  
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  // Add to recently viewed on mount
  useEffect(() => {
    addToRecentlyViewed(product);
  }, [product, addToRecentlyViewed]);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    toast.success('Added to cart!', { description: product.name });
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    window.location.href = '/checkout';
  };

  const handleWishlistToggle = () => {
    toggleItem(product);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  // Fake reviews
  const reviews = [
    {
      name: 'Priya M.',
      rating: 5,
      date: '2 weeks ago',
      text: 'Absolutely gorgeous! The craftsmanship is incredible and it looks even better in person. I received so many compliments at my cousin\'s wedding.',
      verified: true
    },
    {
      name: 'Anjali S.',
      rating: 5,
      date: '1 month ago',
      text: 'Beautiful piece and exactly as described. The packaging was lovely too. Will definitely order more from Omatrikaa!',
      verified: true
    },
    {
      name: 'Meera R.',
      rating: 4,
      date: '1 month ago',
      text: 'Good quality and nice design. Delivery took a bit longer than expected but worth the wait.',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-cream py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/collections" className="hover:text-gold transition-colors">Collections</Link>
            <ChevronRight size={14} />
            <Link href={`/collections/${product.categorySlug}`} className="hover:text-gold transition-colors">
              {product.category}
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden bg-secondary cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Badges */}
              {product.badges.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 bg-maroon text-white text-sm font-medium rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Discount Badge */}
              {discount > 0 && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-charcoal text-sm font-semibold rounded-full">
                  -{discount}%
                </span>
              )}

              {/* Zoom Icon */}
              <div className="absolute bottom-4 right-4 p-2 bg-white/80 rounded-full">
                <ZoomIn size={20} />
              </div>
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all',
                      selectedImage === index 
                        ? 'border-gold ring-2 ring-gold/20' 
                        : 'border-transparent hover:border-muted-foreground'
                    )}
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

          {/* Product Info */}
          <div>
            {/* Category */}
            <Link
              href={`/collections/${product.categorySlug}`}
              className="text-sm text-gold font-medium hover:underline"
            >
              {product.category}
            </Link>

            {/* Title */}
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-muted-foreground'}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl md:text-4xl font-bold text-gold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 bg-maroon/10 text-maroon text-sm font-medium rounded">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Color Variants */}
            {product.variants?.colors && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">
                  Color: <span className="text-gold">{selectedColor}</span>
                </p>
                <div className="flex gap-3">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      disabled={!color.available}
                      className={cn(
                        'relative w-10 h-10 rounded-full border-2 transition-all',
                        selectedColor === color.name
                          ? 'border-foreground scale-110 ring-2 ring-foreground/20'
                          : 'border-transparent hover:border-muted-foreground',
                        !color.available && 'opacity-50 cursor-not-allowed'
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <Check size={16} className="absolute inset-0 m-auto text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variants */}
            {product.variants?.sizes && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">
                  Size: <span className="text-gold">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      disabled={!size.available}
                      className={cn(
                        'px-4 py-2 border rounded-lg text-sm font-medium transition-all',
                        selectedSize === size.value
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-border hover:border-gold',
                        !size.available && 'opacity-50 cursor-not-allowed line-through'
                      )}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-medium">Quantity:</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>
              {product.stockCount && product.stockCount <= 10 && (
                <span className="text-sm text-maroon font-medium">
                  Only {product.stockCount} left!
                </span>
              )}
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
                className={cn(
                  'border-2 px-4',
                  inWishlist ? 'border-maroon text-maroon' : 'border-border'
                )}
              >
                <Heart size={18} className={inWishlist ? 'fill-maroon' : ''} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
                className="border-2 border-border px-4"
              >
                <Share2 size={18} />
              </Button>
            </div>

            {/* Buy Now */}
            <Button
              onClick={handleBuyNow}
              variant="outline"
              className="w-full border-2 border-maroon text-maroon hover:bg-maroon hover:text-white font-semibold"
              size="lg"
            >
              Buy Now
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Truck size={20} className="text-gold" />
                </div>
                <div>
                  <p className="font-medium text-sm">{siteConfig.shipping.message}</p>
                  <p className="text-xs text-muted-foreground">Pan India delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Shield size={20} className="text-gold" />
                </div>
                <div>
                  <p className="font-medium text-sm">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">UPI QR payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12 md:mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 gap-8">
              <TabsTrigger 
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-gold bg-transparent px-0 pb-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-gold bg-transparent px-0 pb-3"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger 
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-gold bg-transparent px-0 pb-3"
              >
                Shipping & Care
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-4">About this piece</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>
                  
                  <h4 className="font-semibold mb-3">Perfect for</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.occasions.map((occasion) => (
                      <span
                        key={occasion}
                        className="px-3 py-1 bg-secondary rounded-full text-sm"
                      >
                        {occasion}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-4">Materials</h3>
                  <ul className="space-y-2">
                    {product.materials.map((material) => (
                      <li key={material} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-border pb-6 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                        <span className="text-gold font-semibold">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <span className="px-2 py-0.5 bg-teal/10 text-teal text-xs rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < review.rating ? 'text-gold fill-gold' : 'text-muted-foreground'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-4">Shipping Information</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-gold mt-1 flex-shrink-0" />
                      <span>{siteConfig.shipping.message} across India</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-gold mt-1 flex-shrink-0" />
                      <span>Free shipping on orders above {formatPrice(siteConfig.shipping.freeAbove)}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-gold mt-1 flex-shrink-0" />
                      <span>Secure packaging to ensure safe delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-gold mt-1 flex-shrink-0" />
                      <span>Order tracking available via WhatsApp</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-4">Care Instructions</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {product.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check size={16} className="text-gold mt-1 flex-shrink-0" />
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold">You May Also Like</h2>
              <Link
                href={`/collections/${product.categorySlug}`}
                className="text-gold font-medium hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 text-white hover:text-gold transition-colors"
              aria-label="Close"
            >
              <ChevronRight size={32} className="rotate-45" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
              }}
              className="absolute left-4 p-2 text-white hover:text-gold transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            
            <div className="relative w-full max-w-4xl aspect-square m-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-4 p-2 text-white hover:text-gold transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border md:hidden z-30">
        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-gold hover:bg-gold-dark text-charcoal font-semibold"
          >
            <ShoppingBag size={18} className="mr-2" />
            Add to Cart - {formatPrice(product.price * quantity)}
          </Button>
          <Button
            variant="outline"
            onClick={handleWishlistToggle}
            className={cn(
              'border-2 px-3',
              inWishlist ? 'border-maroon text-maroon' : 'border-border'
            )}
          >
            <Heart size={18} className={inWishlist ? 'fill-maroon' : ''} />
          </Button>
        </div>
      </div>
    </div>
  );
}
