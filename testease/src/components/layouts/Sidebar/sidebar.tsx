import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar';
import AppSidebarMenu from './sidebar-menu';
import { Suspense } from 'react';
import SidebarFooterSkeleton from './sidebar-footer-skeleton';
import SidebarHeaderServer from './sidebar-header-server';
import AppSidebarFooter from './sidebar-footer';

const AppSidebar = async ({ projectId }: { projectId?: string }) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Suspense fallback={<SidebarFooterSkeleton />}>
          <SidebarHeaderServer projectId={projectId} />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        {projectId && (
          <SidebarGroup>
            <AppSidebarMenu projectId={projectId} />
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
