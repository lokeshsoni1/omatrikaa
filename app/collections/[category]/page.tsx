import { notFound } from 'next/navigation';
import { CollectionPageContent } from '@/components/collections/collection-page-content';
import { categories } from '@/lib/data/products';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryData = categories.find(c => c.slug === category);
  
  if (!categoryData) {
    return {
      title: 'Category Not Found | Omatrikaa',
    };
  }

  return {
    title: `${categoryData.name} | Omatrikaa - Handcrafted Heritage Jewelry`,
    description: categoryData.description,
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryData = categories.find(c => c.slug === category);

  if (!categoryData) {
    notFound();
  }

  return <CollectionPageContent categorySlug={category} />;
}
