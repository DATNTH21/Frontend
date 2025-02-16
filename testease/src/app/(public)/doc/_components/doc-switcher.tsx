'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useGlobalStore } from '@/store/global-store';

export function DocSwitcher() {
  const { features, selectedFeature, setFeature } = useGlobalStore();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <GalleryVerticalEnd className='size-4' />
              </div>
              <span className='font-semibold'>{selectedFeature.name}</span>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width]' align='start'>
            {features.map((feature) => (
              <DropdownMenuItem
                key={feature.name}
                className='cursor-pointer'
                onSelect={() => {
                  setFeature(feature);
                }}
              >
                {feature.name} {feature === selectedFeature && <Check className='ml-auto' />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
