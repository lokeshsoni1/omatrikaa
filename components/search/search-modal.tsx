'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { useSearchStore } from '@/lib/store';
import { searchProducts, formatPrice, categories } from '@/lib/data/products';
import type { Product } from '@/lib/data/products';

export function SearchModal() {
  const { isOpen, query, recentSearches, closeSearch, setQuery, addRecentSearch, clearRecentSearches } = useSearchStore();
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    // Simulate slight delay for better UX
    setTimeout(() => {
      const searchResults = searchProducts(searchQuery);
      setResults(searchResults);
      setIsSearching(false);
    }, 150);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeSearch]);

  const handleResultClick = () => {
    if (query.trim()) {
      addRecentSearch(query.trim());
    }
    closeSearch();
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
  };

  const trendingSearches = ['Jhumkas', 'Kundan', 'Bridal Set', 'Pearl Earrings'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeSearch}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background shadow-2xl max-h-[85vh] overflow-hidden"
          >
            <div className="container mx-auto px-4">
              {/* Search Input */}
              <div className="relative py-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for jewelry, earrings, necklaces..."
                    className="w-full pl-12 pr-12 py-4 text-lg bg-secondary rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-gold"
                    autoFocus
                  />
                  <button
                    onClick={closeSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close search"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="py-6 max-h-[70vh] overflow-y-auto">
                {query.trim().length < 2 ? (
                  // Show suggestions when no query
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="flex items-center gap-2 font-medium text-muted-foreground">
                            <Clock size={16} />
                            Recent Searches
                          </h3>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs text-muted-foreground hover:text-gold transition-colors"
                          >
                            Clear all
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search) => (
                            <button
                              key={search}
                              onClick={() => handleRecentSearchClick(search)}
                              className="px-4 py-2 bg-secondary rounded-full text-sm hover:bg-gold/10 hover:text-gold transition-colors"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Searches */}
                    <div>
                      <h3 className="flex items-center gap-2 font-medium text-muted-foreground mb-4">
                        <TrendingUp size={16} />
                        Trending
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((search) => (
                          <button
                            key={search}
                            onClick={() => handleRecentSearchClick(search)}
                            className="px-4 py-2 bg-gold/10 rounded-full text-sm text-gold hover:bg-gold/20 transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="md:col-span-2">
                      <h3 className="font-medium text-muted-foreground mb-4">Browse Categories</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/collections/${category.slug}`}
                            onClick={closeSearch}
                            className="group relative aspect-square rounded-xl overflow-hidden"
                          >
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <span className="absolute bottom-3 left-3 text-white font-medium text-sm">
                              {category.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : isSearching ? (
                  // Loading state
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : results.length > 0 ? (
                  // Search Results
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {results.slice(0, 8).map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={handleResultClick}
                          className="group"
                        >
                          <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h4 className="font-medium text-sm line-clamp-1 group-hover:text-gold transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gold font-semibold">
                            {formatPrice(product.price)}
                          </p>
                        </Link>
                      ))}
                    </div>
                    {results.length > 8 && (
                      <Link
                        href={`/collections?search=${encodeURIComponent(query)}`}
                        onClick={handleResultClick}
                        className="inline-flex items-center gap-2 mt-6 text-gold hover:underline"
                      >
                        View all {results.length} results
                        <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                ) : (
                  // No Results
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      No results found for &quot;{query}&quot;
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try searching for something else or browse our categories
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
