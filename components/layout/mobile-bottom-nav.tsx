'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Grid3X3, Heart, ShoppingBag } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/collections', icon: Grid3X3, label: 'Shop' },
  { href: '/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/cart', icon: ShoppingBag, label: 'Cart' },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  
  const cartCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-40 md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href === '/collections' && pathname.startsWith('/collections'));
          const Icon = item.icon;
          
          let badgeCount = 0;
          if (item.label === 'Cart') badgeCount = cartCount;
          if (item.label === 'Wishlist') badgeCount = wishlistCount;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-1 py-2 px-4"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={cn(
                    'transition-colors',
                    isActive ? 'text-gold' : 'text-muted-foreground'
                  )}
                />
                {badgeCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      'absolute -top-1.5 -right-1.5 w-4 h-4 text-[10px] font-semibold rounded-full flex items-center justify-center',
                      item.label === 'Cart' 
                        ? 'bg-gold text-charcoal' 
                        : 'bg-maroon text-white'
                    )}
                  >
                    {badgeCount > 9 ? '9+' : badgeCount}
                  </motion.span>
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive ? 'text-gold' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
