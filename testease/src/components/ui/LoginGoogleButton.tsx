'use client';

import Image from 'next/image';

function LoginGoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/login/federated/google';
  };

  return (
    <button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200' onClick={handleGoogleLogin}>
      <Image src={'/assets/svg/google.svg'} alt={'Google'} width={24} height={24} />
    </button>
  );
}

export default LoginGoogleButton;
