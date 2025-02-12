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

// This is sample data.
const data = {
  'Blackbox Test': [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#'
        },
        {
          title: 'Project Structure',
          url: '#'
        }
      ]
    },
    {
      title: 'Building Your Application',
      url: '#',
      items: [
        {
          title: 'Routing',
          url: '#'
        },
        {
          title: 'Data Fetching',
          url: '#'
        },
        {
          title: 'Rendering',
          url: '#'
        },
        {
          title: 'Caching',
          url: '#'
        },
        {
          title: 'Styling',
          url: '#'
        },
        {
          title: 'Optimizing',
          url: '#'
        },
        {
          title: 'Configuring',
          url: '#'
        },
        {
          title: 'Testing',
          url: '#'
        },
        {
          title: 'Authentication',
          url: '#'
        },
        {
          title: 'Deploying',
          url: '#'
        },
        {
          title: 'Upgrading',
          url: '#'
        },
        {
          title: 'Examples',
          url: '#'
        }
      ]
    },
    {
      title: 'Architecture',
      url: '#',
      items: [
        {
          title: 'Accessibility',
          url: '#'
        },
        {
          title: 'Fast Refresh',
          url: '#'
        },
        {
          title: 'Next.js Compiler',
          url: '#'
        },
        {
          title: 'Supported Browsers',
          url: '#'
        },
        {
          title: 'Turbopack',
          url: '#'
        }
      ]
    }
  ],
  'Unit Test': [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#'
        },
        {
          title: 'Project Structure',
          url: '#'
        }
      ]
    },
    {
      title: 'Building Your Application',
      url: '#',
      items: [
        {
          title: 'Routing',
          url: '#'
        },
        {
          title: 'Data Fetching',
          url: '#',
          isActive: true
        },
        {
          title: 'Rendering',
          url: '#'
        },
        {
          title: 'Caching',
          url: '#'
        },
        {
          title: 'Styling',
          url: '#'
        },
        {
          title: 'Optimizing',
          url: '#'
        },
        {
          title: 'Configuring',
          url: '#'
        },
        {
          title: 'Testing',
          url: '#'
        },
        {
          title: 'Authentication',
          url: '#'
        },
        {
          title: 'Deploying',
          url: '#'
        },
        {
          title: 'Upgrading',
          url: '#'
        },
        {
          title: 'Examples',
          url: '#'
        }
      ]
    },
    {
      title: 'API Reference',
      url: '#',
      items: [
        {
          title: 'Components',
          url: '#'
        },
        {
          title: 'File Conventions',
          url: '#'
        },
        {
          title: 'Functions',
          url: '#'
        },
        {
          title: 'next.config.js Options',
          url: '#'
        },
        {
          title: 'CLI',
          url: '#'
        },
        {
          title: 'Edge Runtime',
          url: '#'
        }
      ]
    },
    {
      title: 'Architecture',
      url: '#',
      items: [
        {
          title: 'Accessibility',
          url: '#'
        },
        {
          title: 'Fast Refresh',
          url: '#'
        },
        {
          title: 'Next.js Compiler',
          url: '#'
        },
        {
          title: 'Supported Browsers',
          url: '#'
        },
        {
          title: 'Turbopack',
          url: '#'
        }
      ]
    }
  ],
  'API Test': [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#'
        },
        {
          title: 'Project Structure',
          url: '#'
        }
      ]
    },
    {
      title: 'Building Your Application',
      url: '#',
      items: [
        {
          title: 'Routing',
          url: '#'
        },
        {
          title: 'Data Fetching',
          url: '#',
          isActive: true
        },
        {
          title: 'Rendering',
          url: '#'
        },
        {
          title: 'Caching',
          url: '#'
        },
        {
          title: 'Styling',
          url: '#'
        },
        {
          title: 'Optimizing',
          url: '#'
        },
        {
          title: 'Configuring',
          url: '#'
        },
        {
          title: 'Testing',
          url: '#'
        },
        {
          title: 'Authentication',
          url: '#'
        },
        {
          title: 'Deploying',
          url: '#'
        },
        {
          title: 'Upgrading',
          url: '#'
        },
        {
          title: 'Examples',
          url: '#'
        }
      ]
    },
    {
      title: 'API Reference',
      url: '#',
      items: [
        {
          title: 'Components',
          url: '#'
        },
        {
          title: 'File Conventions',
          url: '#'
        },
        {
          title: 'Functions',
          url: '#'
        },
        {
          title: 'next.config.js Options',
          url: '#'
        },
        {
          title: 'CLI',
          url: '#'
        },
        {
          title: 'Edge Runtime',
          url: '#'
        }
      ]
    },
    {
      title: 'Architecture',
      url: '#',
      items: [
        {
          title: 'Accessibility',
          url: '#'
        },
        {
          title: 'Fast Refresh',
          url: '#'
        },
        {
          title: 'Next.js Compiler',
          url: '#'
        },
        {
          title: 'Supported Browsers',
          url: '#'
        },
        {
          title: 'Turbopack',
          url: '#'
        }
      ]
    }
  ]
};

export function DocSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { selectedFeature } = useGlobalStore();
  return (
    <Sidebar {...props} className='sticky h-[calc(100vh-121px)] bg-background border-none'>
      <SidebarHeader className='bg-background'>
        <DocSwitcher />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className='bg-background'>
        {/* We create a SidebarGroup for each parent. */}
        {data[selectedFeature as keyof typeof data]?.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
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
