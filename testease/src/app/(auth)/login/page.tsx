'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Account Login</h2>
        <p className='text-gray-500 text-center mb-8'>
          If you are already a member you can login with your email address and password.
        </p>
        <form>
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
                <Image src={"/assets/svg/pw_hide.svg"} alt={"Password Hidden"} width={24} height={24}/>
              ) : (
                <Image src={"/assets/svg/pw_show.svg"} alt={"Password Visible"} width={24} height={24}/>
              )}
            </button>
          </div>
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
            Login
          </button>
        </form>
        <div className='text-center mt-6'>
          <p className='text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='text-blue-500'>
              Sign up here
            </Link>
          </p>
        </div>
        <div className='flex justify-center space-x-4 mt-6'>
          <button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200'>
            <Image src={"/assets/svg/google.svg"} alt={"Google"} width={24} height={24}/>
          </button>
          <button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200'>
            <Image src={"/assets/svg/github.svg"} alt={"Github"} width={24} height={24}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
