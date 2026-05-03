"use client"

import { motion } from "framer-motion"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl lg:text-4xl font-serif text-foreground mb-8">
            Returns & Exchange Policy
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Easy Returns</h2>
              <p>
                We want you to be completely satisfied with your purchase. If for any reason 
                you&apos;re not happy with your order, we offer a hassle-free return policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Return Window</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>Returns accepted within 7 days of delivery</li>
                <li>Items must be unused, unworn, and in original packaging</li>
                <li>All tags and certificates must be intact</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Exchange Policy</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>Exchanges available within 15 days of delivery</li>
                <li>Exchange for a different size, design, or product of equal/higher value</li>
                <li>Price difference (if any) to be paid by the customer</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Non-Returnable Items</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>Customized or personalized jewellery</li>
                <li>Items purchased during sale/clearance (unless defective)</li>
                <li>Items showing signs of wear or damage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">How to Initiate a Return</h2>
              <ol className="space-y-2 list-decimal pl-6">
                <li>Contact our support team via email or WhatsApp</li>
                <li>Provide your order number and reason for return</li>
                <li>Our team will arrange a pickup from your location</li>
                <li>Refund will be processed within 5-7 business days after receiving the item</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Refund Method</h2>
              <p>
                Refunds will be credited to the original payment method. For UPI/Bank transfers, 
                please allow 5-7 business days. For Cash on Delivery orders, refunds will be 
                processed via bank transfer.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
