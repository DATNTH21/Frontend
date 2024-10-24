<<<<<<< HEAD
"use client";

import React, { useState } from "react";
import { PasswordShow, PasswordHide, Google, Github } from "@/assets/svg";
import Link from "next/link";
=======
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { registerUser } from '@/app/api/registerAPI';
>>>>>>> 1b01330e110dfcd389b66b4d914013a97a978672

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
<<<<<<< HEAD
  const [password, setPassword] = useState("Password");
  const [confirmPassword, setConfirmPassword] = useState("Password");
  const [email, setEmail] = useState("user@email.com");
=======
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
>>>>>>> 1b01330e110dfcd389b66b4d914013a97a978672

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

<<<<<<< HEAD
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Account Sign up
        </h2>
        <p className="text-gray-500 text-center mb-8">
          If you are already a member you can login with your email address and
          password.
        </p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-14 transform -translate-y-1/2"
            >
              {passwordVisible ? (
                <PasswordShow className="h-6 w-6 text-gray-500" />
              ) : (
                <PasswordHide className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="cf_password">
              Confirm Password
            </label>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="cf_password"
              name="cf_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-2 top-14 transform -translate-y-1/2"
            >
              {passwordVisible ? (
                <PasswordShow className="h-6 w-6 text-gray-500" />
              ) : (
                <PasswordHide className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
          <div className="mb-6 flex items-center">
            <input type="checkbox" id="remember-me" className="mr-2" />
            <label htmlFor="remember-me" className="text-gray-700">
=======
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
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

      // Call the register API
      const response = await registerUser(email, password);

      if (response && response.success) {
        // Handle successful registration (e.g., navigate to login, show success message)
        console.log('Registration successful:', response);
      } else {
        setError('Registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Account Sign up</h2>
        <p className='text-gray-500 text-center mb-8'>
          If you are already a member you can login with your email address and password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              value={email}
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
              placeholder='Enter your password'
              value={password}
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
          <div className='mb-4 relative'>
            <label className='block text-gray-700 mb-2' htmlFor='cf_password'>
              Confirm Password
            </label>
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              id='cf_password'
              name='cf_password'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
            />
            <button
              type='button'
              onClick={toggleConfirmPasswordVisibility}
              className='absolute right-2 top-14 transform -translate-y-1/2'
            >
              {confirmPasswordVisible ? (
                <Image src={"/assets/svg/pw_hide.svg"} alt={"Password Hidden"} width={24} height={24}/>
              ) : (
                <Image src={"/assets/svg/pw_show.svg"} alt={"Password Visible"} width={24} height={24}/>
              )}
            </button>
          </div>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          <div className='mb-6 flex items-center'>
            <input type='checkbox' id='remember-me' className='mr-2' />
            <label htmlFor='remember-me' className='text-gray-700'>
>>>>>>> 1b01330e110dfcd389b66b4d914013a97a978672
              Remember me
            </label>
          </div>
          <button
<<<<<<< HEAD
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register Account
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Or{" "}
            <Link href="/signup" className="text-blue-500">
=======
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            {loading ? 'Registering...' : 'Register Account'}
          </button>
        </form>
        <div className='text-center mt-6'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-500'>
              Sign in
            </Link>
          </p>
          <p className='text-gray-600'>
            Or{' '}
            <Link href='#' className='text-blue-500'>
>>>>>>> 1b01330e110dfcd389b66b4d914013a97a978672
              Sign up with
            </Link>
          </p>
        </div>
<<<<<<< HEAD
        <div className="flex justify-center space-x-4 mt-6">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Google className="h-6 w-6" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Github className="h-6 w-6" />
=======
        <div className='flex justify-center space-x-4 mt-6'>
          <button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200'>
            <Image src={"/assets/svg/google.svg"} alt={"Google"} width={24} height={24}/>
          </button>
          <button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200'>
            <Image src={"/assets/svg/github.svg"} alt={"Github"} width={24} height={24}/>
>>>>>>> 1b01330e110dfcd389b66b4d914013a97a978672
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
