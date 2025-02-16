'use client';
import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DocSidebar } from './_components/doc-sidebar';
import { ErrorBoundary } from 'react-error-boundary';
const PublicLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <div className='max-w-screen-lg mx-auto py-10 px-4'>
        <SidebarProvider>
          <DocSidebar />
          <SidebarInset>
            <div className='flex-1'>{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ErrorBoundary>
  );
};

export default PublicLayout;
