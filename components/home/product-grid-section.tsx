'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import { getBestSellers, getNewArrivals } from '@/lib/data/products';

interface ProductGridSectionProps {
  title: string;
  subtitle?: string;
  type: 'bestsellers' | 'new-arrivals';
  viewAllLink?: string;
}

export function ProductGridSection({ title, subtitle, type, viewAllLink }: ProductGridSectionProps) {
  const products = type === 'bestsellers' 
    ? getBestSellers(4) 
    : getNewArrivals(4);

  return (
    <section className="py-16 md:py-24 bg-cream-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-12"
        >
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all mt-4 md:mt-0"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          )}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
