import { getUser } from '@/api/auth/auth';
import AppSidebarFooter from './sidebar-footer';
import SidebarFooterSkeleton from './sidebar-footer-skeleton';

export default async function SidebarFooterServer() {
  const userResponse = await getUser();
  if (!userResponse.data) {
    return <SidebarFooterSkeleton />;
  }
  return <AppSidebarFooter user={userResponse.data} />;
}
