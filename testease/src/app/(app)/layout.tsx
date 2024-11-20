import AppSidebar from '@/components/layouts/Sidebar/sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AppLayout({ children, params }: { children: React.ReactNode; params: { projectId: string } }) {
  const projectId = params.projectId;

  return (
    <SidebarProvider>
      <AppSidebar projectId={projectId} />
      <SidebarInset>
        <header className='flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
        </header>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
