import UseCaseArea from '../_components/use-case-area';
import FeatureButtonsList from '../_components/feature-buttons-list';

export const metadata = {
  title: 'Black-box testing'
};

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;

  return (
    <>
      {/* Header */}
      <div className='sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-background'>
        <h2 className='text-2xl font-bold tracking-tight'>Black Box Testing</h2>
        <FeatureButtonsList projectId={projectId} />
      </div>

      {/* Content Area */}
      <div className='w-full h-full flex-1'>
        <UseCaseArea projectId={projectId} />
        {children}
      </div>
    </>
  );
}
