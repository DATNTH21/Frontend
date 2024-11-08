import Link from 'next/link';
import LoginForm from '@/components/ui/LoginForm';
import LoginGoogleButton from '@/components/ui/LoginGoogleButton';

const Login = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <div className='bg-card p-10 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Account Login</h2>
        <p className='text-gray-500 text-center mb-8'>
          If you are already a member you can login with your email address and password.
        </p>

        <LoginForm />

        <div className='text-center mt-6'>
          <p className='text-card-foreground'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='text-primary'>
              Sign up here
            </Link>
          </p>
        </div>
        <div className='flex justify-center space-x-4 mt-6'>
          <LoginGoogleButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
