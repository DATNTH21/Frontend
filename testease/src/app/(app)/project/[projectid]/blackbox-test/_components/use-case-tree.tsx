'use client';
import { TreeViewElement } from '@/components/ui/tree-view-api';
import { TOC } from '@/components/ui/tree';
import { UseCase } from '@/types/use-case';
import { useParams, useRouter } from 'next/navigation';
import { useCaseMockData } from '../_data/use-case-mock-data';
import { paths } from '@/lib/routes';

// const elements: TreeViewElement[] = [
//   {
//     id: '1',
//     name: 'Use Cases',
//     children: [
//       {
//         id: '2',
//         name: 'usecase1'
//       },
//       {
//         id: '3',
//         name: 'usecase2'
//       },
//       {
//         id: '4',
//         name: 'usecase3'
//       },
//       {
//         id: '5',
//         name: 'usecase4'
//       }
//     ]
//   }
// ];

const UseCaseTree = () => {
  const router = useRouter();
  const params = useParams<{ projectId: string; useCaseId: string }>();

  if (!params.projectId) {
    router.push(paths.projectAll.getHref());
  }

  // Get use case by projectID:
  const useCases = useCaseMockData.filter((useCase) => useCase.project_id == params.projectId);

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
                name: `use_case_${index}`
              };
            })
    }
  ];
  return (
    <div className='flex flex-col gap-2 bg-background p-2'>
      <h3 className='font-bold px-2'>Files</h3>
      <div>
        <TOC toc={elements} />
      </div>
    </div>
  );
};

export default UseCaseTree;
