import { paths } from '@/lib/routes';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import AppSidebarHeader from './sidebar-header';
interface SidebarMenuItem {
  icon: string;
  href: string;
  label: string;
}

const AppSidebar = ({ projectId }: { projectId: string }) => {
  const sidebarMenu: SidebarMenuItem[] = [
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
    }
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
