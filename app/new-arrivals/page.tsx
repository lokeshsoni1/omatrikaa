"use client"

import { products } from "@/lib/data/products"
import { CollectionPageContent } from "@/components/collections/collection-page-content"

export default function NewArrivalsPage() {
  // Filter products marked as new
  const newProducts = products.filter((p) => p.isNew)

  return (
    <CollectionPageContent
      title="New Arrivals"
      description="Discover our latest additions - fresh designs that blend traditional craftsmanship with contemporary elegance"
      products={newProducts.length > 0 ? newProducts : products.slice(0, 8)}
      showFilters={true}
    />
  )
}
