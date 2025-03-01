'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { PasswordInput } from '@/app/(auth)/_components/password-input';
import { TProfileSchema, profileSchema } from '@/app/(auth)/_data/auth-schema';
import { editUserProfile } from '@/api/user-config/user-config';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const SettingPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TProfileSchema>({ resolver: zodResolver(profileSchema) });

  const onSubmit = async (data: TProfileSchema) => {
    try {
      const newUserData = {
        name: data?.name,
        password: data?.newPassword
      };
      const response = await editUserProfile(user?.id || '', newUserData);
      console.log('res', response);
      toast({ title: 'Profile updated successfully' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Update failed', description: error.message });
    }
  };

  return (
    <div className='flex justify-center min-h-screen p-6'>
      <div className='max-w-[800px] w-full'>
        {user && (
          <div className='grid grid-cols-2 gap-8'>
            <div className='flex flex-grow items-center justify-center space-y-4'>
              <Avatar className='h-64 w-64 rounded-full m-auto'>
                <AvatarImage src={user.image} alt={user.name} className='h-48 w-48 rounded-full' />
                <AvatarFallback className='rounded-full bg-primary text-primary-foreground text-[100px] p-10'>
                  PH
                </AvatarFallback>
              </Avatar>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full min-h-screen flex flex-col items-center'
              style={{ paddingTop: 'calc(50vh - 250px)' }}
            >
              <Tabs defaultValue='user' className='p-4 w-full mb-10'>
                <div className='w-full border-b relative'>
                  <TabsList className='relative p-0 flex h-fit w-fit'>
                    <TabsTrigger
                      value='user'
                      className='group relative py-4 px-8 bg-background text-foreground rounded-none data-[state=active]:shadow-none 
                            data-[state=active]:text-sidebar-active data-[state=active]:font-bold'
                    >
                      User Setting
                      <span
                        className='absolute bottom-0 left-0 h-[2px] bg-primary w-full scale-x-0 transition-all duration-300 ease-in-out 
                        group-data-[state=active]:scale-x-100'
                      ></span>
                    </TabsTrigger>

                    <TabsTrigger
                      value='password'
                      className='group relative py-4 px-8 bg-background text-foreground rounded-none data-[state=active]:shadow-none 
                            data-[state=active]:text-sidebar-active data-[state=active]:font-bold'
                    >
                      Change Password
                      {/* Active Indicator */}
                      <span
                        className='absolute bottom-0 left-0 h-[2px] bg-primary w-full scale-x-0 transition-all duration-300 ease-in-out 
                        group-data-[state=active]:scale-x-100'
                      ></span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value='user'>
                  <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='name'>Name</label>
                    <Input type='text' defaultValue={user.name} {...register('name')} />
                    {errors.name && <p className='text-destructive'>{errors.name.message}</p>}
                  </div>
                  <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='email'>Email</label>
                    <Input type='email' disabled defaultValue={user.email} />
                  </div>
                </TabsContent>
                <TabsContent value='password'>
                  <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='password'>Current Password</label>
                    <PasswordInput placeholder='Enter current password' {...register('oldPassword')} />
                    {errors.oldPassword && <p className='text-destructive'>{errors.oldPassword.message}</p>}
                  </div>
                  <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='password'>New Password</label>
                    <PasswordInput placeholder='Enter new password' {...register('newPassword')} />
                    {errors.newPassword && <p className='text-destructive'>{errors.newPassword.message}</p>}
                  </div>
                  <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='password'>Confirm Password</label>
                    <PasswordInput placeholder='Enter new password' {...register('confirmPassword')} />
                    {errors.confirmPassword && <p className='text-destructive'>{errors.confirmPassword.message}</p>}
                  </div>
                </TabsContent>
              </Tabs>
              <Button className='w-full' size='lg' type='submit'>
                Save Changes
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingPage;
