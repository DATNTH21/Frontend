'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { toast } from '@/hooks/use-toast';
import wretch from 'wretch';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown, LogOut, PanelTop, Settings } from 'lucide-react';
import SidebarFooterSkeleton from './sidebar-footer-skeleton';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/context/loading-context';

export default function AppSidebarFooter() {
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else hideLoading();
  }, [isLoading]);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await wretch('/api/access/logout').post().json();
      await signOut();
      toast({
        variant: 'success',
        title: 'Log out successfully'
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Log out failed',
        description: error?.json?.message || 'An unexpected error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {user ? (
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  <Avatar className='h-8 w-8 rounded-full'>
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className='rounded-full bg-primary text-primary-foreground'>PH</AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>{user.name}</span>
                    <span className='truncate text-xs'>{user.email}</span>
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
                  <DropdownMenuItem className='cursor-pointer' onClick={() => router.push('/')}>
                    <PanelTop />
                    Landing page
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer' onClick={() => router.push('/setting')}>
                    <Settings />
                    Profile
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
        <SidebarFooterSkeleton />
      )}
    </>
  );
}
