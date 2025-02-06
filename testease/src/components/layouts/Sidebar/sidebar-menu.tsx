'use client';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { paths } from '@/lib/routes';
import { usePathname } from 'next/navigation';
import { Box, LayoutDashboard, type LucideIcon, Puzzle, ScrollText, Settings } from 'lucide-react';

export type SidebarItem = {
  icon: LucideIcon;
  href: string;
  label: string;
};
export default function AppSidebarMenu({ projectId }: { projectId: string }) {
  const pathName = usePathname();
  const sidebarMenu: SidebarItem[] = [
    {
      icon: LayoutDashboard,
      href: paths.projectDetail.dashboard.getHref(projectId),
      label: 'Dashboard'
    },
    {
      icon: Box,
      href: paths.projectDetail.blackboxTest.getHref(projectId),
      label: 'Blackbox test'
    },
    {
      icon: Puzzle,
      href: paths.projectDetail.unitTest.getHref(projectId),
      label: 'Unit test'
    },
    {
      icon: ScrollText,
      href: paths.projectDetail.report.getHref(projectId),
      label: 'Report'
    },
    {
      icon: Settings,
      href: paths.projectDetail.setting.getHref(projectId),
      label: 'Setting'
    }
  ];
  return (
    <SidebarMenu>
      <SidebarGroup>
        {sidebarMenu.map((item, index) => {
          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                isActive={pathName.includes(item.href)}
                className='data-[active=true]:text-sidebar-active data-[active=true]:font-semibold hover:text-sidebar-active hover:font-semibold'
              >
                <Link href={item.href} className='flex items-center'>
                  <item.icon className='w-12 h-14' />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarGroup>
    </SidebarMenu>
  );
}
