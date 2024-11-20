export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex-1 bg-white'>
      {/* Header */}
      <div className='flex justify-between items-center p-4 border-b'>
        <h2 className='text-2xl font-bold tracking-tight'>Black Box Testing</h2>
        <div>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mr-2'>Generate Test Case</button>
          <button className='bg-gray-200 p-2 rounded-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-gray-700'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className='flex h-full'>{children}</div>
    </div>
  );
}
