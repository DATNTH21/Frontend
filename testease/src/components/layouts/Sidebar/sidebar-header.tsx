'use client';

import { use } from 'react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronsDownUp, Folder } from 'lucide-react';
import { GetProjectsResponse, type Project } from '@/types/api';
import { useRouter } from 'next/navigation';
import { paths } from '@/lib/routes';
export default function AppSidebarHeader({
  projectId,
  data
}: {
  projectId?: string;
  data: Promise<GetProjectsResponse>;
}) {
  const router = useRouter();
  const projects = use(data).data;
  const handleOnClickProject = (chosenProjectId?: string) => {
    //This means chosen project is not all-project page
    if (chosenProjectId) {
      router.push(`${paths.projectDetail.dashboard.getHref(chosenProjectId)}`);
    } else {
      router.push(`${paths.projectAll.getHref()}`);
    }
  };

  // Filter out the current project from the dropdown
  const filteredProjects = currentProject ? projects.filter((project) => project._id !== currentProject._id) : projects;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border border-border'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <Folder className='size-4' />
              </div>
              <div className='font-semibold leading-none'>{currentProject ? currentProject.name : 'All project'}</div>
              <ChevronsDownUp className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side='bottom'
            sideOffset={4}
          >
            {filteredProjects.map((project, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => handleOnClickProject(project._id)}
                className='gap-2 p-2 hover:bg-primary hover:text-primary-foreground cursor-pointer'
              >
                {project.name}
              </DropdownMenuItem>
            ))}
            {currentProject && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  key='all-project'
                  onClick={() => handleOnClickProject()}
                  className='gap-2 p-2 hover:bg-primary hover:text-primary-foreground cursor-pointer'
                >
                  View all projects
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
