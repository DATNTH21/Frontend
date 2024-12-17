import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar';
import AppSidebarHeader from './sidebar-header';
import AppSidebarMenu from './sidebar-menu';
import AppSidebarFooter from './sidebar-footer';
import { getUser } from '@/app/_api/auth/actions';

const AppSidebar = async ({ projectId }: { projectId?: string }) => {
  const userData = await getUser();
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
        <AppSidebarFooter user={userData.data.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
