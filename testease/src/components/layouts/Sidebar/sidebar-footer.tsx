'use client';
import { useLogout } from '@/api/auth/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { paths } from '@/lib/routes';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown, LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function AppSidebarFooter({ userPromise }: { userPromise: Promise<any> }) {
  const userResponse = use(userPromise);
  const user = userResponse.data.user;

  const router = useRouter();
  const logoutMutation = useLogout({
    onSuccess: () => {
      router.push(paths.auth.login.getHref());
    },
    onError: (error) => {
      toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.', description: error.message });
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return user ? (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={user.photo} alt={user.name} />
                <AvatarFallback className='rounded-lg bg-primary text-primary-foreground'>PH</AvatarFallback>
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
    <div className='flex'>
      <Skeleton className='h-8 w-8 rounded-lg'></Skeleton>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
      </div>
    </div>
  );
}
