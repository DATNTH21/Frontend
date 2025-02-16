'use client';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { DocSwitcher } from './doc-switcher';
import { SearchForm } from './search-form';
import { useGlobalStore } from '@/store/global-store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Menu tree
const data = {
  'Testease Core': [
    {
      title: 'Blackbox testing',
      url: '/testease-core/blackbox-testing',
      items: [
        {
          title: 'Create project',
          url: '/testease-core/blackbox-testing/create-project'
        },
        {
          title: 'Generate test cases',
          url: '/testease-core/blackbox-testing/generate-test-cases'
        },
        {
          title: 'Test cases',
          url: '/testease-core/blackbox-testing/test-cases'
        },
        {
          title: 'Export test cases',
          url: '/testease-core/blackbox-testing/export-test-cases'
        }
      ]
    },
    {
      title: 'Configuration and management',
      url: '/testease-core/configuration-and-management',
      items: [
        {
          title: 'Dashboard',
          url: '/testease-core/configuration-and-management/dashboard'
        },
        {
          title: 'Project setting',
          url: '/testease-core/configuration-and-management/project-setting'
        },
        {
          title: 'User setting',
          url: '/testease-core/configuration-and-management/user-setting'
        }
      ]
    }
  ],
  'WeTest Extension': [
    {
      title: 'Installation',
      url: '/wetest-extension/getting-started/installation'
    },
    {
      title: 'Features',
      url: '/wetest-extension/features',
      items: [
        { title: 'Unit testing', url: '/wetest-extension/unit-testing' },
        {
          title: 'API testing',
          url: '/wetest-extension/api-testing'
        },
        {
          title: 'UI Testing',
          url: '/wetest-extension/ui-testing'
        }
      ]
    },
    {
      title: 'Configuration and helpers',
      url: '/wetest-extension/configuration-and-helpers',
      items: [
        { title: 'Configuration', url: '/wetest-extension/configuration-and-helpers/configuration' },
        {
          title: 'Helpers',
          url: '/wetest-extension/configuration-and-helpers/helpers'
        }
      ]
    }
  ]
};

export function DocSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { selectedFeature } = useGlobalStore();
  const pathName = usePathname();
  //const urlRoot = `/doc/${selectedFeature.slug}`;
  return (
    <Sidebar {...props} className='sticky bg-background border-none'>
      <SidebarHeader className='bg-background'>
        <DocSwitcher />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className='bg-background'>
        {data[selectedFeature.name as keyof typeof data]?.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>
              <Link
                href={`/doc/${item.url}`}
                className={`${pathName == item.url && 'text-sidebar-active'} text-sm text-foreground`}
              >
                {item.title}
              </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/doc/${item.url}`}
                        className={`${pathName == item.url && 'text-sidebar-active'} text-[#A1A1A1]`}
                      >
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
