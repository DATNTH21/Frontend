import Image from 'next/image';

export default function Loading() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Image
        src='/img/loading-meo.gif'
        alt='loading'
        unoptimized
        className='my-32 rounded-lg'
        width={400}
        height={200}
      />
    </div>
  );
}
