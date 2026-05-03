import { Suspense } from 'react';
import { CollectionPageContent } from '@/components/collections/collection-page-content';

export const metadata = {
  title: 'All Collections | Omatrikaa - Handcrafted Heritage Jewelry',
  description: 'Explore our complete collection of handcrafted Indian jewelry. Earrings, necklaces, bridal sets, and more.',
};

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const params = await searchParams;
  
  return (
    <Suspense fallback={<CollectionLoading />}>
      <CollectionPageContent initialFilter={params.filter} />
    </Suspense>
  );
}

function CollectionLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-cream py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="h-12 w-64 bg-muted rounded-lg mx-auto mb-3 animate-pulse" />
            <div className="h-6 w-96 bg-muted rounded-lg mx-auto animate-pulse" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square bg-muted rounded-xl animate-pulse" />
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              <div className="h-5 w-full bg-muted rounded animate-pulse" />
              <div className="h-6 w-24 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
