import { notFound } from 'next/navigation';
import { ProductDetailContent } from '@/components/products/product-detail-content';
import { products, getProductBySlug } from '@/lib/data/products';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Omatrikaa',
    };
  }

  return {
    title: `${product.name} | Omatrikaa - Handcrafted Heritage Jewelry`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images,
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}
