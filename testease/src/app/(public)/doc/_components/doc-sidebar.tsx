'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Menu tree
const data = {
  'Testease Core': [
    {
      title: 'Blackbox Testing',
      url: '/testease-core/blackbox-testing',
      items: [
        { title: 'Create Project', url: '/testease-core/blackbox-testing/create-project' },
        { title: 'Generate Test Cases', url: '/testease-core/blackbox-testing/generate-test-cases' },
        { title: 'Test Cases', url: '/testease-core/blackbox-testing/test-cases' },
        { title: 'Export Test Cases', url: '/testease-core/blackbox-testing/export-test-cases' }
      ]
    },
    {
      title: 'Configuration & Management',
      url: '/testease-core/configuration-and-management',
      items: [
        { title: 'Dashboard', url: '/testease-core/configuration-and-management/dashboard' },
        { title: 'Project Settings', url: '/testease-core/configuration-and-management/project-setting' },
        { title: 'User Settings', url: '/testease-core/configuration-and-management/user-setting' }
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
        { title: 'Unit Testing', url: '/wetest-extension/features/unit-testing' },
        { title: 'API Testing', url: '/wetest-extension/features/api-testing' },
        { title: 'UI Testing', url: '/wetest-extension/features/ui-testing' }
      ]
    },
    {
      title: 'Configuration & Helpers',
      url: '/wetest-extension/configuration-and-helpers',
      items: [
        { title: 'Configuration', url: '/wetest-extension/configuration-and-helpers/configuration' },
        { title: 'Helpers', url: '/wetest-extension/configuration-and-helpers/helpers' }
      ]
    }
  ]
};

export function DocSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();

  return (
    <Sidebar {...props} className='lg:sticky bg-background border-none'>
      {/* <SidebarHeader className='bg-background'>
        <SearchForm />
      </SidebarHeader> */}
      <SidebarContent className='bg-background'>
        {Object.entries(data).map(([featureName, sections]) => (
          <div key={featureName} className='pl-4 pt-4 lg:p-0 mb-6'>
            <h2 className='text-lg font-bold text-foreground mb-2'>{featureName}</h2>
            {sections.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupLabel>
                  <div
                    className={`${pathName === `/doc${section.url}` ? '!text-sidebar-active' : ''} text-sm text-foreground`}
                  >
                    {section.title}
                  </div>
                </SidebarGroupLabel>
                {section.items && (
                  <SidebarGroupContent className='relative'>
                    <div className='indicator absolute h-full w-[1px] bg-muted left-2'></div>
                    <SidebarMenu>
                      {section.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={`/doc${item.url}`}
                              className={`${pathName === `/doc${item.url}` && '!text-sidebar-active'} dark:text-[#A1A1A1] ml-3`}
                            >
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                )}
              </SidebarGroup>
            ))}
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
