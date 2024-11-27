import AppSidebar from '@/components/layouts/Sidebar/sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
export interface SidebarItem {
  icon: string;
  href: string;
  label: string;
  isActive: boolean;
}

export default async function AllProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
        </header>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
