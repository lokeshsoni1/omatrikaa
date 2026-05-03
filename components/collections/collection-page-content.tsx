'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { products, categories, type Product } from '@/lib/data/products';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';

interface CollectionPageContentProps {
  categorySlug?: string;
  initialFilter?: string;
}

export function CollectionPageContent({ categorySlug, initialFilter }: CollectionPageContentProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categorySlug ? [categorySlug] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.categorySlug));
    }

    // Apply price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Apply initial filter (from URL params)
    if (initialFilter === 'new') {
      result = result.filter(p => p.badges.includes('New Arrival') || p.badges.includes('New'));
    } else if (initialFilter === 'bestseller') {
      result = result.filter(p => p.badges.includes('Bestseller'));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => {
          const aNew = a.badges.includes('New Arrival') || a.badges.includes('New');
          const bNew = b.badges.includes('New Arrival') || b.badges.includes('New');
          return (bNew ? 1 : 0) - (aNew ? 1 : 0);
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - bestsellers first
        result.sort((a, b) => {
          const aBest = a.badges.includes('Bestseller');
          const bBest = b.badges.includes('Bestseller');
          return (bBest ? 1 : 0) - (aBest ? 1 : 0);
        });
    }

    return result;
  }, [selectedCategories, priceRange, sortBy, initialFilter]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(c => c !== slug)
        : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories(categorySlug ? [categorySlug] : []);
    setPriceRange([0, 10000]);
    setSortBy('featured');
  };

  const currentCategory = categorySlug 
    ? categories.find(c => c.slug === categorySlug) 
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-cream py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              {currentCategory ? currentCategory.name : 'All Collections'}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {currentCategory 
                ? currentCategory.description 
                : 'Explore our complete collection of handcrafted heritage jewelry'
              }
            </p>
          </motion.div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-16 md:top-20 bg-background/95 backdrop-blur-md border-b border-border z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left - Filter Toggle & Count */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter size={16} />
                <span className="hidden sm:inline">Filters</span>
                {selectedCategories.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-gold text-charcoal text-xs flex items-center justify-center">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Right - Sort & Grid */}
            <div className="flex items-center gap-2">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-secondary rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>

              {/* Grid Toggle - Desktop only */}
              <div className="hidden md:flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setGridCols(2)}
                  className={cn(
                    'p-2 transition-colors',
                    gridCols === 2 ? 'bg-secondary' : 'hover:bg-secondary/50'
                  )}
                  aria-label="2 columns"
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={cn(
                    'p-2 transition-colors',
                    gridCols === 3 ? 'bg-secondary' : 'hover:bg-secondary/50'
                  )}
                  aria-label="3 columns"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={cn(
                    'p-2 transition-colors',
                    gridCols === 4 ? 'bg-secondary' : 'hover:bg-secondary/50'
                  )}
                  aria-label="4 columns"
                >
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <motion.aside
            initial={false}
            animate={{ 
              width: showFilters ? 256 : 0,
              opacity: showFilters ? 1 : 0
            }}
            className={cn(
              'hidden md:block overflow-hidden flex-shrink-0',
              !showFilters && 'md:hidden'
            )}
          >
            <div className="w-64 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.slug}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.slug)}
                        onChange={() => toggleCategory(category.slug)}
                        className="w-4 h-4 rounded border-border text-gold focus:ring-gold"
                      />
                      <span className="text-sm group-hover:text-gold transition-colors">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-gold"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </motion.aside>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setShowFilters(false)}>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="absolute left-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-semibold">Filters</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={24} />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category.slug}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.slug)}
                          onChange={() => toggleCategory(category.slug)}
                          className="w-4 h-4 rounded border-border text-gold focus:ring-gold"
                        />
                        <span className="text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-gold"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="flex-1"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 bg-gold hover:bg-gold-dark text-charcoal"
                  >
                    Apply
                  </Button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={cn(
                'grid gap-4 md:gap-6',
                gridCols === 2 && 'grid-cols-2',
                gridCols === 3 && 'grid-cols-2 md:grid-cols-3',
                gridCols === 4 && 'grid-cols-2 md:grid-cols-4'
              )}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
