'use client';
import { TreeViewElement } from '@/components/ui/tree-view-api';
import { TOC } from '@/components/ui/tree';
import { useParams, useRouter } from 'next/navigation';
import { paths } from '@/lib/routes';
import { UseCase } from '@/types/use-case';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const UseCaseTree = ({ useCases }: { useCases: UseCase[] }) => {
  const router = useRouter();
  const params = useParams<{ projectId: string; useCaseId: string }>();
  const [usecaseSearch, setUsecaseSearch] = useState<string>('');

  if (!params.projectId) {
    router.push(paths.projectAll.getHref());
  }

  const elements: TreeViewElement[] = [
    {
      id: '1',
      name: 'Use Cases',
      children:
        useCases == undefined || useCases.length == 0 || !useCases
          ? []
          : useCases.map((useCase, index) => {
              return {
                id: useCase.use_case_id,
                name: useCase.name.trim()
              };
            })
    }
  ];
  return (
    <div className='flex flex-col gap-2 bg-background p-2'>
      <Input
        placeholder='Filter usecases...'
        value={usecaseSearch}
        onChange={(e) => setUsecaseSearch(e.target.value)}
        className='h-8 w-full text-sm'
      />
      <h3 className='font-bold px-2'>Files</h3>
      <div>
        <TOC toc={elements} searchValue={usecaseSearch} />
      </div>
    </div>
  );
};

export default UseCaseTree;
