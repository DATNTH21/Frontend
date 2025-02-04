export default function ReportLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex-1 bg-background'>
      {/* Header */}
      <div className='sticky top-0 z-50 flex justify-between items-center p-4 border-b bg-background'>
        <h2 className='text-2xl font-bold tracking-tight'>Report</h2>
      </div>

      {/* Content Area */}
      <div className='w-full'>{children}</div>
    </div>
  );
}
