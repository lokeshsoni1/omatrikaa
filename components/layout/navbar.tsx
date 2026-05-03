'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig, navLinks } from '@/lib/data/site-config';
import { categories } from '@/lib/data/products';
import { useCartStore, useWishlistStore, useSearchStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  
  const { getTotalItems, openCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { openSearch } = useSearchStore();
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  
  const cartItemCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-md py-2'
            : 'bg-background/80 backdrop-blur-sm py-3 md:py-4'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 -ml-2 text-foreground hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={160}
                height={60}
                className={cn(
                  'transition-all duration-300',
                  scrolled ? 'h-10 md:h-12 w-auto' : 'h-12 md:h-14 w-auto'
                )}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-gold transition-colors"
              >
                Home
              </Link>
              
              {/* Shop Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-gold transition-colors">
                  Shop
                  <ChevronDown
                    size={16}
                    className={cn(
                      'transition-transform',
                      shopDropdownOpen && 'rotate-180'
                    )}
                  />
                </button>
                
                <AnimatePresence>
                  {shopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-card rounded-xl shadow-luxury border border-border p-6 min-w-[500px]">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                              Categories
                            </h3>
                            <ul className="space-y-2">
                              {categories.map((category) => (
                                <li key={category.slug}>
                                  <Link
                                    href={`/collections/${category.slug}`}
                                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                                  >
                                    {category.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                              Featured
                            </h3>
                            <Link
                              href="/collections"
                              className="block group"
                            >
                              <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                                <Image
                                  src={categories[0].image}
                                  alt="Featured Collection"
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <p className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                                View All Collections
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link
                href="/about"
                className="text-sm font-medium text-foreground hover:text-gold transition-colors"
              >
                About
              </Link>
              
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground hover:text-gold transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={openSearch}
                className="text-foreground hover:text-gold hover:bg-gold/10"
                aria-label="Search"
              >
                <Search size={20} />
              </Button>
              
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-foreground hover:text-gold hover:bg-gold/10"
                  aria-label="Wishlist"
                >
                  <Heart size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-maroon text-white text-xs rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative text-foreground hover:text-gold hover:bg-gold/10"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-charcoal text-xs font-semibold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-background z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Image
                    src={siteConfig.logo}
                    alt={siteConfig.name}
                    width={120}
                    height={45}
                    className="h-10 w-auto"
                  />
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 text-foreground hover:text-gold"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="space-y-6">
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="block font-serif text-xl text-foreground hover:text-gold transition-colors"
                  >
                    Home
                  </Link>
                  
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                      Shop by Category
                    </p>
                    <ul className="space-y-3">
                      {categories.map((category) => (
                        <li key={category.slug}>
                          <Link
                            href={`/collections/${category.slug}`}
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 text-foreground hover:text-gold transition-colors"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                              <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium">{category.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/collections"
                    onClick={closeMobileMenu}
                    className="block font-serif text-xl text-foreground hover:text-gold transition-colors"
                  >
                    All Collections
                  </Link>
                  
                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                    className="block font-serif text-xl text-foreground hover:text-gold transition-colors"
                  >
                    Our Story
                  </Link>
                  
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="block font-serif text-xl text-foreground hover:text-gold transition-colors"
                  >
                    Contact
                  </Link>
                </nav>

                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Need help?</p>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold font-medium hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
