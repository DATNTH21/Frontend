'use client';

import Image from 'next/image';

function LoginGoogleButton() {
  return (
    <button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200'>
      <Image src={'/assets/svg/google.svg'} alt={'Google'} width={24} height={24} />
    </button>
  );
}

export default LoginGoogleButton;
