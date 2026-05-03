'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/data/products';
import { siteConfig } from '@/lib/data/site-config';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  
  const totalPrice = getTotalPrice();
  const isFreeShipping = totalPrice >= siteConfig.shipping.freeAbove;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeCart}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-gold" size={20} />
                <h2 className="font-serif text-xl font-semibold">Your Cart</h2>
                <span className="text-sm text-muted-foreground">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Shipping Banner */}
            {!isFreeShipping && totalPrice > 0 && (
              <div className="px-4 py-2 bg-gold/10 border-b border-gold/20">
                <div className="flex items-center gap-2 text-sm">
                  <Truck size={16} className="text-gold" />
                  <span>
                    Add <span className="font-semibold text-gold">{formatPrice(siteConfig.shipping.freeAbove - totalPrice)}</span> for free shipping!
                  </span>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <ShoppingBag size={64} className="text-muted-foreground/30 mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Discover our beautiful collection of handcrafted jewelry
                  </p>
                  <Button
                    onClick={closeCart}
                    className="bg-gold hover:bg-gold-dark text-charcoal"
                    asChild
                  >
                    <Link href="/collections">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <motion.li
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="p-4"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCart}
                          className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-medium text-sm hover:text-gold transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          
                          {(item.selectedColor || item.selectedSize) && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.selectedColor && `Color: ${item.selectedColor}`}
                              {item.selectedColor && item.selectedSize && ' | '}
                              {item.selectedSize && `Size: ${item.selectedSize}`}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between mt-2">
                            <p className="font-semibold text-gold">
                              {formatPrice(item.product.price)}
                            </p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors self-start"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-4">
                {/* Delivery Note */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck size={16} />
                  <span>{siteConfig.shipping.message}</span>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-xl font-semibold text-gold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Buttons */}
                <div className="grid gap-2">
                  <Button
                    onClick={closeCart}
                    className="w-full bg-gold hover:bg-gold-dark text-charcoal font-semibold btn-shine"
                    size="lg"
                    asChild
                  >
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={closeCart}
                    className="w-full border-gold text-gold hover:bg-gold/10"
                    size="lg"
                    asChild
                  >
                    <Link href="/cart">View Cart</Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
