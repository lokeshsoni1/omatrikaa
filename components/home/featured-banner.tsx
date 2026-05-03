'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data/products';

export function FeaturedBanner() {
  // Get a featured product for the banner
  const featuredProduct = products.find(p => p.badges.includes('Limited Edition')) || products[4];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-maroon to-maroon-dark"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16">
              <span className="inline-block px-4 py-1 bg-gold/20 text-gold text-sm font-medium rounded-full mb-4">
                Featured Collection
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Statement Pieces for<br />
                <span className="text-gold">Special Moments</span>
              </h2>
              <p className="text-cream-dark/90 mb-8 max-w-md">
                Discover our exclusive collection of statement jhumkas and bridal sets, 
                handcrafted for women who celebrate their heritage with pride.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-charcoal font-semibold btn-shine"
                >
                  <Link href="/collections/bridal-sets">
                    Shop Bridal
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Link href={`/products/${featuredProduct.slug}`}>
                    View Featured
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-80 md:h-full md:absolute md:right-0 md:top-0 md:bottom-0 md:w-1/2">
              <Image
                src={featuredProduct.images[0]}
                alt="Featured Jewelry"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-maroon via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
