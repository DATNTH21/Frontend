import AppSidebar from '@/components/layouts/Sidebar/sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { redirect } from 'next/navigation';

export default async function AppLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;
  //console.log('Project layout: Get current project ID: ', projectId);
  if (!projectId) {
    redirect('/all-project');
  }
  return (
    <SidebarProvider>
      <AppSidebar projectId={projectId} />
      <SidebarInset className='flex flex-col min-w-0'>
        <header className='flex bg-background px-4 py-3 shrink-0 items-center gap-2 border-b justify-between'>
          <SidebarTrigger className='-ml-1' />
          <ModeToggle />
        </header>
        <main className='flex-1 flex flex-col bg-background'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
