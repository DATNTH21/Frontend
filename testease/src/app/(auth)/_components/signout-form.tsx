'use client';

import { useToast } from '@/hooks/use-toast';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import wretch from 'wretch';
import React from 'react';
import { useLoading } from '@/context/loading-context';

export const SignOutForm = () => {
  const { showLoading, hideLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  if (isLoading) {
    showLoading();
  } else hideLoading();

  useEffect(() => {
    handleLogOut();
  });

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await wretch('/api/access/logout').post().json();

      toast({
        variant: 'destructive',
        title: 'Refresh token has been revoked',
        description: 'You need to log in again'
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      await signOut();
      router.push('/login');
      setIsLoading(false);
    }
  };

  return <h1 className='text-4xl'>Logging out...</h1>;
};
