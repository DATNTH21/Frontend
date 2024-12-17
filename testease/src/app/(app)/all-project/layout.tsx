import AppSidebar from '@/components/layouts/Sidebar/sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default async function AllProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex sticky top-0 bg-background h-16 shrink-0 items-center border-b px-4 justify-between z-10'>
          <div className='flex gap-2 items-center'>
            <SidebarTrigger className='-ml-1' />
            <div className='font-bold tracking-tight text-xl'>All Projects</div>
          </div>
          <div className='flex gap-2 items-center'>
            <ModeToggle />
          </div>
        </header>
        <div className='w-full h-full flex flex-col bg-background p-2'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
