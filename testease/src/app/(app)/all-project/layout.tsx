import AppSidebar from '@/components/layouts/Sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/ui/mode-toggle';
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
        <header className='flex sticky top-0 bg-background h-16 shrink-0 items-center border-b px-4 justify-between'>
          <div className='flex gap-2 items-center'>
            <SidebarTrigger className='-ml-1' />
            <div className='font-bold tracking-tight'>ALL PROJECTS</div>
          </div>
          <div className='flex gap-2 items-center'>
            <Button>Create Project</Button>
            <ModeToggle />
          </div>
        </header>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
