'use client';

import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export default function NavbarMobileMenu() {
  const [isOpen, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pathName = usePathname();
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node) && buttonRef.current != e.target) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropDownRef]);
  return (
    <>
      <Button ref={buttonRef} variant='outline' size='icon' onClick={() => setOpen(!isOpen)} className='cursor-pointer'>
        <MenuIcon />
      </Button>
      <div
        ref={dropDownRef}
        data-open={isOpen}
        className='fixed top-16 inset-x-0 shadow-lg bg-background hidden transition-opacity data-[open=true]:block'
      >
        <Link
          href='/doc'
          className={` ${pathName.includes('/doc') ? 'text-sidebar-active' : ''} p-6 flex justify-center items-center border-b hover:text-sidebar-active cursor-pointer`}
        >
          Docs
        </Link>
        <Link
          href='/we-test'
          className={` ${pathName.includes('/we-test') ? 'text-sidebar-active' : ''} p-6 flex justify-center items-center border-b hover:text-sidebar-active cursor-pointer`}
        >
          WeTest Extension
        </Link>
        <Link
          href='/contact'
          className={` ${pathName.includes('/contact') ? 'text-sidebar-active' : ''} p-6 flex justify-center items-center border-b hover:text-sidebar-active cursor-pointer`}
        >
          Contact
        </Link>
      </div>
    </>
  );
}
