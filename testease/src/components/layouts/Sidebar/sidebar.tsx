import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar';
import { Suspense } from "react";
import AppSidebarHeader from './sidebar-header';
import AppSidebarMenu from './sidebar-menu';
import AppSidebarFooter from './sidebar-footer';
import { getUser } from '@/app/api/auth/actions';
import { getProjects } from '@/api/project/project';

const AppSidebar = async ({ projectId }: { projectId?: string }) => {
  const userData = await getUser();
  const data = getProjects("673f2e9bedec8e80219667a3");
  return (
    <Sidebar>
      <SidebarHeader>
        <Suspense
          fallback={
            <>Loading</>
          }
        >
          <AppSidebarHeader projectId={projectId} data={data}/>
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
        <AppSidebarFooter user={userData.data.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
