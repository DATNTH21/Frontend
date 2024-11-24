import AppSidebar from '@/components/layouts/Sidebar/sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { paths } from '@/lib/routes';
export interface SidebarItem {
  icon: string;
  href: string;
  label: string;
}

export default async function AppLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;
  console.log('Project layout: Get current project ID: ', projectId);

  const sidebarMenu: SidebarItem[] = [
    {
      icon: '/svg/dashboard.svg',
      href: paths.projectDetail.dashboard.getHref(projectId),
      label: 'Dashboard'
    },
    {
      icon: '/svg/blackboxtest_icon.svg',
      href: paths.projectDetail.blackboxTest.getHref(projectId),
      label: 'Blackbox test'
    },
    {
      icon: '/svg/unittest_icon.svg',
      href: paths.projectDetail.unitTest.getHref(projectId),
      label: 'Unit test'
    },
    {
      icon: '/svg/report.svg',
      href: paths.projectDetail.report.getHref(projectId),
      label: 'Report'
    },
    {
      icon: '/svg/setting.svg',
      href: paths.projectDetail.setting.getHref(projectId),
      label: 'Setting'
    }
  ];
  return (
    <SidebarProvider>
      <AppSidebar projectId={projectId} menu={sidebarMenu} />
      <SidebarInset>
        <header className='flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
        </header>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
