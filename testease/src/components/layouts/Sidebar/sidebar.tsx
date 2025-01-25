import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar';
import { Suspense } from "react";
import AppSidebarHeader from './sidebar-header';
import AppSidebarMenu from './sidebar-menu';
import AppSidebarFooter from './sidebar-footer';
import { auth } from "@/auth";
import { getProjects } from '@/api/project/project';

const AppSidebar = async ({ projectId }: { projectId?: string }) => {
  
  const session = await auth();
  const user = session?.user;
  const data = getProjects(user?.id as string);
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
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
