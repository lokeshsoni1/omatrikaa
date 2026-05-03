'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, Gem, Heart } from 'lucide-react';
import { siteConfig } from '@/lib/data/site-config';

const trustItems = [
  {
    icon: Truck,
    title: siteConfig.trustBadges[0],
    description: 'Fast & reliable shipping'
  },
  {
    icon: Gem,
    title: siteConfig.trustBadges[1],
    description: 'Artisan crafted pieces'
  },
  {
    icon: Shield,
    title: siteConfig.trustBadges[2],
    description: 'Safe UPI transactions'
  },
  {
    icon: Heart,
    title: siteConfig.trustBadges[3],
    description: 'Happy customers'
  }
];

export function TrustBar() {
  return (
    <section className="py-8 md:py-12 bg-cream border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-3">
                <item.icon size={24} className="text-gold" />
              </div>
              <h3 className="font-medium text-sm md:text-base text-foreground">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 hidden md:block">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
