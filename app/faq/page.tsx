"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Domestic orders are delivered within 5-7 business days. Express delivery (2-3 business days) is available at an additional cost. International orders take 10-15 business days.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free shipping on all orders above Rs. 5,000 within India. Orders below this amount have a flat shipping fee of Rs. 150.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely! Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order in real-time.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to select international destinations. Shipping charges and delivery times vary by location. Import duties are the responsibility of the customer.",
      },
    ],
  },
  {
    category: "Product & Quality",
    questions: [
      {
        q: "Are your products authentic?",
        a: "Yes, all our jewellery is 100% authentic. We provide authenticity certificates with all precious metal and gemstone products. Our pieces are crafted by skilled artisans using traditional techniques.",
      },
      {
        q: "What materials do you use?",
        a: "We use a variety of materials including gold-plated brass, sterling silver, genuine gemstones (rubies, emeralds, pearls), Kundan, Polki, and Meenakari work. Material details are listed on each product page.",
      },
      {
        q: "How do I care for my jewellery?",
        a: "Store your jewellery in a cool, dry place. Avoid contact with perfumes, water, and chemicals. Clean with a soft, dry cloth. For detailed care instructions, refer to the care guide that comes with your purchase.",
      },
      {
        q: "Do you offer lifetime maintenance?",
        a: "Yes! We offer complimentary lifetime cleaning and polishing for all Omatrikaa jewellery. Minor repairs are also covered. Contact us to schedule a maintenance appointment.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery. Items must be unused, unworn, and in original packaging with all tags intact. Customized items cannot be returned unless defective.",
      },
      {
        q: "How do I exchange a product?",
        a: "Exchanges are available within 15 days of delivery. Contact our support team with your order number and preferred replacement. We will arrange pickup and delivery.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5-7 business days after we receive the returned item. The amount will be credited to your original payment method.",
      },
    ],
  },
  {
    category: "Payment & Security",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery. All online payments are secured with industry-standard encryption.",
      },
      {
        q: "Is Cash on Delivery available?",
        a: "Yes, COD is available for orders within India. A nominal COD fee may apply for certain locations.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use SSL encryption and secure payment gateways. We never store your complete card details on our servers.",
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-primary transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-muted-foreground">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-serif text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground">
            Find answers to common questions about our products, orders, and policies
          </p>
        </motion.div>

        <div className="space-y-10">
          {faqs.map((section, sectionIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b-2 border-primary/20">
                {section.category}
              </h2>
              <div>
                {section.questions.map((faq) => (
                  <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-muted/50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-serif text-foreground mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Our support team is here to help you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@omatrikaa.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              WhatsApp Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
