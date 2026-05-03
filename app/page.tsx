import { HeroSection } from '@/components/home/hero-section';
import { TrustBar } from '@/components/home/trust-bar';
import { ProductGridSection } from '@/components/home/product-grid-section';
import { CategoriesSection } from '@/components/home/categories-section';
import { FeaturedBanner } from '@/components/home/featured-banner';
import { AboutSection } from '@/components/home/about-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { NewsletterSection } from '@/components/home/newsletter-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductGridSection
        title="New Arrivals"
        subtitle="Discover our latest handcrafted pieces, freshly added to our collection"
        type="new-arrivals"
        viewAllLink="/collections?filter=new"
      />
      <CategoriesSection />
      <ProductGridSection
        title="Bestsellers"
        subtitle="Our most loved pieces, chosen by thousands of happy customers"
        type="bestsellers"
        viewAllLink="/collections?filter=bestseller"
      />
      <FeaturedBanner />
      <AboutSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
