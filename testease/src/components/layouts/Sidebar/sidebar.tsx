import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar';
import AppSidebarMenu from './sidebar-menu';
import { Suspense } from 'react';
import SidebarFooterSkeleton from './sidebar-footer-skeleton';
import SidebarFooterServer from './sidebar-footer-server';
import SidebarHeaderServer from './sidebar-header-server';

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
        <Suspense fallback={<SidebarFooterSkeleton />}>
          <SidebarFooterServer />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
