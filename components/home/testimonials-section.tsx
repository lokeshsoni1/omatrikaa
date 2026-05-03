'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Absolutely stunning earrings! The craftsmanship is incredible and they look even better in person. I wore them to my sister&apos;s wedding and received so many compliments.',
    product: 'Royal Ruby Emerald Jhumkas'
  },
  {
    id: 2,
    name: 'Anjali Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'The quality exceeded my expectations. Beautiful packaging and the jewelry is exactly as shown in the photos. Will definitely order again!',
    product: 'Kundan Pearl Chandbali'
  },
  {
    id: 3,
    name: 'Meera Reddy',
    location: 'Hyderabad',
    rating: 5,
    text: 'Found my perfect bridal set here! The attention to detail is amazing. Thank you Omatrikaa for making my special day even more beautiful.',
    product: 'Royal Bridal Jewelry Set'
  },
  {
    id: 4,
    name: 'Kavita Singh',
    location: 'Delhi',
    rating: 5,
    text: 'I&apos;ve been searching for authentic Kundan jewelry at reasonable prices and Omatrikaa is perfect! The earrings are lightweight and comfortable for all-day wear.',
    product: 'Lotus Kundan Drop Earrings'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-charcoal overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            Loved by Women Everywhere
          </h2>
          <p className="text-cream-dark/80 max-w-2xl mx-auto">
            Join thousands of happy customers who have found their perfect pieces at Omatrikaa
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-charcoal-light rounded-2xl p-6 relative"
            >
              {/* Quote Icon */}
              <Quote size={32} className="text-gold/20 absolute top-4 right-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-gold fill-gold" />
                ))}
              </div>
              
              {/* Text */}
              <p className="text-cream-dark text-sm leading-relaxed mb-4">
                &quot;{testimonial.text}&quot;
              </p>
              
              {/* Product */}
              <p className="text-gold text-xs font-medium mb-4">
                Purchased: {testimonial.product}
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-cream-dark/60 text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
