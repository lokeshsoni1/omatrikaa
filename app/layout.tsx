import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SearchModal } from '@/components/search/search-modal'
import { QuickViewModal } from '@/components/products/quick-view-modal'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Omatrikaa - Handcrafted Heritage Jewelry | Gems & Jewellery',
  description: 'Discover exquisite handcrafted Indian jewelry at Omatrikaa. Affordable luxury with modern + traditional fusion designs. Kundan, pearl, and gemstone jewelry for weddings, festivals, and everyday elegance.',
  keywords: ['Indian jewelry', 'Kundan jewelry', 'handcrafted jewelry', 'wedding jewelry', 'bridal jewelry', 'jhumkas', 'earrings', 'necklaces', 'traditional jewelry', 'affordable luxury'],
  authors: [{ name: 'Omatrikaa' }],
  creator: 'Omatrikaa',
  publisher: 'Omatrikaa',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://omatrikaa.com',
    siteName: 'Omatrikaa',
    title: 'Omatrikaa - Handcrafted Heritage Jewelry',
    description: 'Discover exquisite handcrafted Indian jewelry. Affordable luxury with modern + traditional fusion designs.',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/omatrikaa%20logo.PNG-ADLWDzo4ojagHsHH364ICAOsJYUI59.png',
        width: 1200,
        height: 630,
        alt: 'Omatrikaa - Gems & Jewellery'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omatrikaa - Handcrafted Heritage Jewelry',
    description: 'Discover exquisite handcrafted Indian jewelry. Affordable luxury with modern + traditional fusion designs.',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/omatrikaa%20logo.PNG-ADLWDzo4ojagHsHH364ICAOsJYUI59.png']
  },
  icons: {
    icon: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-05-03%20144517-RjDseC02NrwEmUMMHJbUD4HvCB3Y2o.png',
        type: 'image/png',
      }
    ],
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-05-03%20144517-RjDseC02NrwEmUMMHJbUD4HvCB3Y2o.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <SearchModal />
        <QuickViewModal />
        <MobileBottomNav />
        <WhatsAppButton />
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#1F2937',
              color: '#F5F0E6',
              border: '1px solid #D4AF37'
            }
          }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
