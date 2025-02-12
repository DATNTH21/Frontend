'use client';
import Footer from '@/components/layouts/Footer/footer';
import Navbar from '@/components/layouts/Navbar/navbar';
import { Spinner } from '@/components/ui/spinner';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
const PublicLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <Navbar />
        {children}
        <Footer />
      </ErrorBoundary>
    </Suspense>
  );
};

export default PublicLayout;
