'use client';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { type SidebarItem } from '@/app/(app)/project/[projectId]/layout';
import { usePathname } from 'next/navigation';

export default function AppSidebarMenu({ sidebarItems }: { sidebarItems: SidebarItem[] }) {
  const pathName = usePathname();
  return (
    <SidebarMenu>
      <SidebarGroup>
        {sidebarItems.map((item, index) => {
          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                isActive={pathName == item.href}
                className='data-[active=true]:text-primary data-[active=true]:font-semibold'
              >
                <Link href={item.href} className='flex items-center'>
                  <Image src={item.icon} alt={item.label} width={14} height={14} />
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
