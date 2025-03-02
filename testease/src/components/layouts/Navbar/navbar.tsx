'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import LoadingOverlay from '@/components/ui/loading/loading-overlay';
import { SolarSystem } from '@/components/ui/loading/solar-system';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { LogOut, Menu, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import wretch from 'wretch';
import NavbarMobileMenu from './navbar-mobile-menu';

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;

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
      <div className='sticky top-0 w-full z-20 backdrop-blur-lg'>
        <header className='w-full'>
          <nav className='container sticky top-0 h-16 flex flex-col justify-center'>
            <div className='flex justify-between items-center h-8'>
              <Link href={'/'} className='flex items-center'>
                <Image src={'/svg/logo.svg'} width={24} height={24} alt='logo' className='w-9 h-9' />
                <p className='font-semibold text-2xl font-sans tracking-wider'>Testease</p>
              </Link>
              <div className='hidden md:flex items-center gap-2'>
                <Link href='/doc' className=''>
                  <Button
                    variant='ghost'
                    size='lg'
                    className={`text-lg rounded-full transition-all  ${
                      pathName === '/doc' ? 'text-primary dark:text-sidebar-active font-bold' : ''
                    }`}
                  >
                    Docs
                  </Button>
                </Link>
                <Link href='/we-test'>
                  <Button
                    variant='ghost'
                    size='lg'
                    className={`text-lg rounded-full transition-all ${
                      pathName === '/we-test' ? 'text-primary dark:text-sidebar-active font-bold' : ''
                    }`}
                  >
                    WeTest
                  </Button>
                </Link>
                <Link href='/contact'>
                  <Button
                    variant='ghost'
                    size='lg'
                    className={`text-lg rounded-full transition-all ${
                      pathName === '/contact' ? 'text-primary dark:text-sidebar-active font-bold ' : ''
                    }`}
                  >
                    Contact
                  </Button>
                </Link>
              </div>
              <div className='flex items-center gap-4'>
                <ModeToggle className='rounded-full' />
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className='cursor-pointer'>
                      <Avatar className='h-8 w-8 rounded-full'>
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className='rounded-full bg-primary text-primary-foreground text-sm'>
                          PH
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10} align='end'>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => router.push('/all-project')}
                          className='flex items-center cursor-pointer'
                        >
                          <Menu />
                          <span>Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push('/setting')}
                          className='flex items-center cursor-pointer'
                        >
                          <User />
                          <span>Profile</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className='flex items-center cursor-pointer'>
                        <LogOut />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href={'/login'}>
                    <Button className='bg-foreground text-background font-semibold text-lg rounded-2xl hover:text-primary-foreground py-3 px-5'>
                      Log In
                    </Button>
                  </Link>
                )}
                <div className='md:hidden'>
                  <NavbarMobileMenu />
                </div>
              </div>
            </div>
          </nav>
        </header>
        <Separator />
      </div>

      {isLoading && <LoadingOverlay spinner={<SolarSystem />} />}
    </>
  );
}
