export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex-1 bg-white'>
      {/* Header */}
      <div className='flex justify-between items-center p-4 border-b'>
        <h2 className='text-2xl font-bold tracking-tight'>ALL PROJECTS</h2>
      </div>

      {/* Content Area */}
      <div className='flex h-full p-6'>{children}</div>
    </div>
  );
}
  