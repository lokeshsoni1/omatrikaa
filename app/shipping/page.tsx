"use client"

import { motion } from "framer-motion"

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl lg:text-4xl font-serif text-foreground mb-8">
            Shipping & Delivery Policy
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Domestic Shipping (India)</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>Free shipping on all orders above Rs. 5,000</li>
                <li>Standard shipping fee of Rs. 150 for orders below Rs. 5,000</li>
                <li>Delivery within 5-7 business days for most locations</li>
                <li>Express delivery available at additional cost (2-3 business days)</li>
                <li>We ship to all serviceable pin codes across India</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">International Shipping</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>We ship to select international destinations</li>
                <li>Shipping charges calculated based on destination and package weight</li>
                <li>Delivery time: 10-15 business days</li>
                <li>Import duties and taxes are the responsibility of the customer</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Order Processing</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>Orders are processed within 1-2 business days</li>
                <li>You will receive a tracking number via email once shipped</li>
                <li>Orders placed on weekends/holidays are processed the next business day</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Packaging</h2>
              <p>
                All Omatrikaa jewellery comes in our signature packaging, perfect for gifting. 
                Each piece is carefully packaged in a velvet pouch within a branded box, 
                ensuring your jewellery arrives in perfect condition.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p>
                For shipping-related queries, please contact us at{" "}
                <a href="mailto:support@omatrikaa.com" className="text-primary hover:underline">
                  support@omatrikaa.com
                </a>{" "}
                or WhatsApp us at +91 98765 43210.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
