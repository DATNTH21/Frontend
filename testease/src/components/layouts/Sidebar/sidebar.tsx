import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar';
import AppSidebarHeader from './sidebar-header';
import AppSidebarMenu from './sidebar-menu';
import AppSidebarFooter from './sidebar-footer';
import { getUser } from '@/api/auth/auth';
import { Suspense } from 'react';
import SidebarFooterSkeleton from './sidebar-footer-skeleton';

const AppSidebar = async ({ projectId }: { projectId?: string }) => {
  const userData = getUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <AppSidebarHeader projectId={projectId} />
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
          <AppSidebarFooter userPromise={userData} />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
