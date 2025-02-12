'use client';

import AddUseCaseButton from './file-upload/add-use-case-button';
import GenerateTestCaseButton from './generate-test-case-button';

export default function FeatureButtonsList({ projectId }: { projectId: string }) {
  return (
    <div className='flex justify-center items-center gap-3'>
      <GenerateTestCaseButton />
      <AddUseCaseButton projectId={projectId} />
    </div>
  );
}
