'use client';
import { useLogout, useUser } from '@/api/auth/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner';
import { paths } from '@/lib/routes';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown, LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AppSidebarFooter() {
  const router = useRouter();
  const logoutMutation = useLogout({
    onSuccess: () => {
      router.push(paths.auth.login.getHref());
    },
    onError: () => {
      //dosth
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const { data, status } = useUser();
  return status == 'success' ? (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={data.data.user.photo} alt={data.data.user.name} />
                <AvatarFallback className='rounded-lg bg-primary text-primary-foreground'>PH</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{data.data.user.name}</span>
                <span className='truncate text-xs'>{data.data.user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            sideOffset={4}
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
          >
            <DropdownMenuGroup>
              <DropdownMenuItem className='cursor-pointer'>
                <Settings />
                Setting
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  ) : (
    <Spinner />
  );
}
