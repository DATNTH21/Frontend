import React from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DocSidebar } from './_components/doc-sidebar';
const PublicLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='max-w-screen-lg mx-auto py-10 px-4'>
      <SidebarProvider>
        <DocSidebar />
        <SidebarInset>
          <SidebarTrigger className='md:hidden ml-4' />
          <div className='flex-1'>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default PublicLayout;
