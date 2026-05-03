"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, 
  CreditCard, 
  Smartphone, 
  Truck, 
  Check, 
  Lock,
  Gift,
  ShieldCheck
} from "lucide-react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type CheckoutStep = "shipping" | "payment" | "confirmation"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getCartTotal, clearCart } = useStore()
  const [step, setStep] = useState<CheckoutStep>("shipping")
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  })

  const subtotal = getCartTotal()
  const shipping = subtotal > 5000 ? 0 : 150
  const total = subtotal + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setOrderPlaced(true)
    setStep("confirmation")
    clearCart()
  }

  if (cart.length === 0 && !orderPlaced) {
    router.push("/cart")
    return null
  }

  const steps = [
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
    { id: "confirmation", label: "Confirmation" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/cart"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Cart
          </Link>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/omatrikaa%20logo.PNG-ADLWDzo4ojagHsHH364ICAOsJYUI59.png"
            alt="Omatrikaa"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    step === s.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : steps.findIndex((st) => st.id === step) > index
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {steps.findIndex((st) => st.id === step) > index ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:block ${
                    step === s.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-4 ${
                      steps.findIndex((st) => st.id === step) > index
                        ? "bg-primary"
                        : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* Shipping Step */}
              {step === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Truck className="w-6 h-6 text-primary" />
                      <h2 className="text-xl font-serif text-foreground">Shipping Information</h2>
                    </div>

                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            required
                            value={shippingInfo.firstName}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            required
                            value={shippingInfo.lastName}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={shippingInfo.email}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, email: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={shippingInfo.phone}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, phone: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Textarea
                          id="address"
                          required
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, address: e.target.value })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            required
                            value={shippingInfo.city}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, city: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            required
                            value={shippingInfo.state}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, state: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode *</Label>
                          <Input
                            id="pincode"
                            required
                            value={shippingInfo.pincode}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, pincode: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Order Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Special instructions for your order..."
                          value={shippingInfo.notes}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, notes: e.target.value })
                          }
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                      >
                        Continue to Payment
                      </Button>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Payment Step */}
              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-6 h-6 text-primary" />
                      <h2 className="text-xl font-serif text-foreground">Payment Method</h2>
                    </div>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div
                        className={`flex items-center space-x-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                          paymentMethod === "upi"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">UPI Payment</p>
                              <p className="text-sm text-muted-foreground">
                                Pay using Google Pay, PhonePe, Paytm or any UPI app
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                          paymentMethod === "cod"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setPaymentMethod("cod")}
                      >
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Cash on Delivery</p>
                              <p className="text-sm text-muted-foreground">
                                Pay when you receive your order
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {/* UPI QR Code Section */}
                    {paymentMethod === "upi" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-6 p-6 bg-muted/50 rounded-xl"
                      >
                        <p className="text-center text-sm text-muted-foreground mb-4">
                          Scan the QR code below to pay {formatPrice(total)}
                        </p>
                        <div className="flex justify-center">
                          <div className="bg-white p-4 rounded-xl shadow-sm">
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qr%20code%20ls-vTOTSvwFAbi7y6r8b8a3p6QGBAm5FX.jpeg"
                              alt="UPI QR Code"
                              width={200}
                              height={200}
                              className="rounded-lg"
                            />
                          </div>
                        </div>
                        <p className="text-center text-xs text-muted-foreground mt-4">
                          After payment, click &quot;Place Order&quot; to confirm
                        </p>
                      </motion.div>
                    )}

                    <div className="flex gap-4 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setStep("shipping")}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {isProcessing ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Confirmation Step */}
              {step === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-serif text-foreground mb-2">Order Confirmed!</h2>
                  <p className="text-muted-foreground mb-4">
                    Thank you for your order. We&apos;ll send you a confirmation email shortly.
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    Order ID: #OM{Date.now().toString().slice(-8)}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="outline">
                      <Link href="/collections">Continue Shopping</Link>
                    </Button>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href="/">Go to Home</Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          {step !== "confirmation" && (
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="bg-card border border-border rounded-2xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-serif text-foreground mb-4">Order Summary</h3>

                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize || "default"}`}
                      className="flex gap-3"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {item.product.name}
                        </p>
                        {item.selectedSize && (
                          <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>
                        )}
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Gift className="w-4 h-4" />
                    <span>Complimentary gift packaging</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% authentic products</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
