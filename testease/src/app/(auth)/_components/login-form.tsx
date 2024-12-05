'use client';
import { TLoginSchema, loginSchema } from '../_data/auth-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PasswordInput } from './password-input';
import { paths } from '../../../lib/routes';
import { useLogin, useLogout } from '@/api/auth/auth';
import { useRouter } from 'next/navigation';
import LoginGoogleButton from './google-login-button';
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const router = useRouter();

  const loginMutation = useLogin({
    onSuccess: () => {
      router.push(paths.projectAll.getHref());
    },
    onError: () => {
      //do sth
    }
  });

  const onSubmit = (data: TLoginSchema) => {
    // const response = await loginWithEmailAndPassword(data);
    // console.log(response);
    // router.push(paths.projectAll.getHref());

    loginMutation.mutate(data);
  };

  const logoutMutation = useLogout({
    onSuccess: () => {
      router.push(paths.auth.login.getHref());
    },
    onError: () => {
      //do sth
    }
  });

  const handleLogout = () => {
    // const response = await logout();
    // console.log(response);
    logoutMutation.mutate();
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-card p-10 rounded-lg shadow-lg max-w-md'>
        <h2 className='text-2xl font-semibold mb-6 text-center text-primary'>Account Login</h2>
        <p className='text-gray-500 text-center mb-8'>
          If you are already a member you can login with your email address and password.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor='email' className='text-card-foreground mb-2'>
              Email address:{' '}
            </label>
            <Input type='email' placeholder='Enter your email' {...register('email')}></Input>
            {errors.email && <p className='text-destructive my-1'>{`${errors.email.message}`}</p>}
          </div>
          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor='password' className='text-card-foreground mb-2'>
              Password:{' '}
            </label>
            <PasswordInput placeholder='Enter your password' {...register('password')}></PasswordInput>
            {errors.password && <p className='text-destructive my-1'>{`${errors.password.message}`}</p>}
          </div>
          <div className='inline-flex items-center mb-6'>
            <Input type='checkbox' name='remember-me' className='mr-2 h-3 w-3'></Input>
            <label htmlFor='remember-me' className='text-card-foreground'>
              Remember me?
            </label>
          </div>
          <Button className='w-full' size='lg' type='submit'>
            Login
          </Button>
          <div className='flex justify-center mt-4 space-x-6'>
            <LoginGoogleButton />
          </div>
          <div className='text-center mt-4'>
            <p className='text-card-foreground'>
              Don&apos;t have an account?{' '}
              <Link href={paths.auth.register.getHref()} className='text-primary font-semibold'>
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
