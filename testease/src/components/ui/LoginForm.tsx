'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { loginUser } from '@/app/_api/loginAPI';

function LoginForm() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // Optional: Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);

      // Call the login API
      const response = await loginUser(email, password);

      if (response && response.status === 'success') {
        router.replace('/all-project');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label className='block text-gray-700 mb-2' htmlFor='email'>
          Email address
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          required
        />
      </div>
      <div className='mb-4 relative'>
        <label className='block text-gray-700 mb-2' htmlFor='password'>
          Password
        </label>
        <input
          type={passwordVisible ? 'text' : 'password'}
          id='password'
          name='password'
          value={password}
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          required
        />
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute right-2 top-14 transform -translate-y-1/2'
        >
          {passwordVisible ? (
            <Image src={'/assets/svg/pw_hide.svg'} alt={'Password Hidden'} width={24} height={24} />
          ) : (
            <Image src={'/assets/svg/pw_show.svg'} alt={'Password Visible'} width={24} height={24} />
          )}
        </button>
      </div>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <div className='mb-6 flex items-center'>
        <input type='checkbox' id='remember-me' className='mr-2' />
        <label htmlFor='remember-me' className='text-gray-700'>
          Remember me
        </label>
      </div>
      <button
        type='submit'
        className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;
