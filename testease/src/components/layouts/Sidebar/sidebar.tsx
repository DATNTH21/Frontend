import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar';
import AppSidebarHeader from './sidebar-header';
import AppSidebarMenu from './sidebar-menu';
import AppSidebarFooter from './sidebar-footer';
import { type SidebarItem } from '@/app/(app)/project/[projectId]/layout';

const AppSidebar = ({ projectId, menu }: { projectId?: string; menu?: SidebarItem[] }) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <AppSidebarHeader projectId={projectId} />
      </SidebarHeader>
      <SidebarContent>
        {menu && (
          <SidebarGroup>
            <AppSidebarMenu sidebarItems={menu} />
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
