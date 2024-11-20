import Sidebar from '@/components/layouts/sidebar';

export default function AppLayout({ children, params }: { children: React.ReactNode; params: { projectId: string } }) {
  const projectId = params.projectId;

  return (
    <div className='flex min-h-screen'>
      <Sidebar projectId={projectId} />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
