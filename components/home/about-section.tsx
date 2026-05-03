'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/data/site-config';

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om5-KydbouNgskJkxvZmqY3SyqdxDWCkPi.jpeg"
                alt="Omatrikaa Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-gold rounded-2xl -z-10" />
            
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-8 -left-4 md:left-8 bg-white rounded-xl shadow-luxury p-4 md:p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <Sparkles className="text-gold" size={24} />
                </div>
                <div>
                  <p className="font-serif text-2xl md:text-3xl font-bold text-gold">
                    {siteConfig.socialProof.customerCount}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Happy Customers
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-6">
              Crafting Heritage,<br />
              <span className="text-gold">One Piece at a Time</span>
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              {siteConfig.about.description}
            </p>
            
            <p className="text-foreground leading-relaxed mb-8">
              {siteConfig.about.founder}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                'Handcrafted Excellence',
                'Sustainable Materials',
                'Traditional Techniques',
                'Modern Designs'
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="bg-gold hover:bg-gold-dark text-charcoal font-semibold btn-shine"
            >
              <Link href="/about">
                Learn More About Us
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
