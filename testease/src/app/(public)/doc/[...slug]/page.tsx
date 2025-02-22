import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// Function to generate the dynamic import path
const getDynamicImport = (slugPath: string) => {
  try {
    return dynamic(() => import(`@/app/(public)/doc/_doc/${slugPath}`));
  } catch (error) {
    return null;
  }
};

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const slugs = (await params).slug;
  const slugPath = slugs?.join('/') || '';

  const DocComponent = getDynamicImport(slugPath);

  if (!DocComponent) return notFound();

  return <DocComponent />;
}
