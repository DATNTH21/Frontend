import AddUseCaseButton from '../_components/file-upload/add-use-case-button';
import GenerateTestCaseButton from '../_components/generate-test-case-button';
import UseCaseArea from '../_components/use-case-area';

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
    <div className='flex-1 flex flex-col bg-background'>
      {/* Header */}
      <div className='sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-background'>
        <h2 className='text-2xl font-bold tracking-tight'>Black Box Testing</h2>
        <div className='flex justify-center items-center gap-3'>
          <GenerateTestCaseButton />
          <AddUseCaseButton projectId={projectId} />
        </div>
      </div>

      {/* Content Area */}
      <div className='w-full h-full flex-1'>
        <UseCaseArea projectId={projectId} />
        {children}
      </div>
    </div>
  );
}
