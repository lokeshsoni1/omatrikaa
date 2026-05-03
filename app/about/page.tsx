"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Award, Heart, Gem, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const values = [
  {
    icon: Gem,
    title: "Authentic Craftsmanship",
    description: "Each piece is handcrafted by skilled artisans using traditional techniques passed down through generations.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "We pour our heart into every design, ensuring each piece tells a unique story of elegance and tradition.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use only the finest materials - genuine gemstones, pure metals, and the most lustrous pearls.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. We provide personalized service and lifetime maintenance support.",
  },
]

const milestones = [
  { year: "2018", event: "Omatrikaa was founded with a vision to revive traditional Indian jewellery" },
  { year: "2019", event: "Launched our first signature Kundan collection" },
  { year: "2020", event: "Expanded to serve customers across India" },
  { year: "2021", event: "Introduced our exclusive Polki and Temple jewellery lines" },
  { year: "2022", event: "Celebrated serving 10,000+ happy customers" },
  { year: "2023", event: "Launched international shipping to bring Indian heritage worldwide" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Omatrikaa is more than a jewellery brand - it&apos;s a celebration of Indian heritage, 
              craftsmanship, and the timeless beauty of traditional adornments. Each piece we create 
              is a tribute to the rich legacy of Indian artisanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square mb-10 lg:mb-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl -rotate-6" />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/om3-fs5rEuNtdp3s3guRfvI2bSlM7uYofB.jpeg"
                alt="Omatrikaa Craftsmanship"
                fill
                className="object-cover rounded-3xl relative z-10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif text-foreground mb-6">
                Preserving Heritage, Crafting Elegance
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded with a passion for preserving India&apos;s rich jewellery-making traditions, 
                  Omatrikaa brings you exquisite pieces that blend ancestral artistry with contemporary elegance.
                </p>
                <p>
                  Our name, &quot;Omatrikaa,&quot; draws inspiration from the divine feminine energy and the 
                  sacred lotus - symbolizing purity, beauty, and spiritual awakening. Just as the lotus 
                  blooms gracefully, each of our creations unfolds with timeless beauty.
                </p>
                <p>
                  We work directly with master artisans from Jaipur, Kolkata, and other traditional 
                  jewellery hubs, ensuring that ancient techniques like Kundan, Polki, and Meenakari 
                  continue to thrive while meeting modern aesthetic sensibilities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Omatrikaa
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground">
              From a small dream to a beloved brand
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border lg:-translate-x-px" />
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-6 pb-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"} hidden lg:block`}>
                  <div className={`inline-block ${index % 2 === 0 ? "" : ""}`}>
                    <span className="text-2xl font-serif text-primary">{milestone.year}</span>
                    <p className="text-muted-foreground mt-1">{milestone.event}</p>
                  </div>
                </div>
                <div className="relative z-10 w-8 h-8 rounded-full bg-primary border-4 border-background flex-shrink-0" />
                <div className="flex-1 lg:hidden pl-2">
                  <span className="text-xl font-serif text-primary">{milestone.year}</span>
                  <p className="text-muted-foreground mt-1 text-sm">{milestone.event}</p>
                </div>
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-foreground mb-4">
              Experience the Omatrikaa Difference
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover our curated collections and find your perfect piece of heritage
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/collections">
                Explore Collections
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
