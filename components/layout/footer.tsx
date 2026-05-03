'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig, footerLinks } from '@/lib/data/site-config';

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream-light pb-24 md:pb-0">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={140}
                height={52}
                className="h-12 w-auto brightness-110"
              />
            </Link>
            <p className="text-cream-dark text-sm leading-relaxed mb-6">
              Handcrafted heritage jewelry celebrating Indian artistry. 
              Affordable luxury with modern + traditional fusion designs.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-dark hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold mb-4">Help</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-dark hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-start gap-3 text-sm text-cream-dark hover:text-gold transition-colors"
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 text-sm text-cream-dark hover:text-gold transition-colors"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-cream-dark hover:text-gold transition-colors"
                >
                  <Instagram size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{siteConfig.instagram}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream-dark">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>India</span>
              </li>
            </ul>
            
            {/* Payment Note */}
            <div className="mt-6 p-3 bg-gold/10 rounded-lg">
              <p className="text-xs text-cream-dark">
                <span className="text-gold font-medium">Payment:</span> Secure UPI QR payments only
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-light">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream-dark">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <p>
              Owner: <span className="text-gold">{siteConfig.owner}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
