import { TreeViewElement } from '@/components/ui/tree-view-api';
import { TOC } from '@/components/ui/tree';

const elements: TreeViewElement[] = [
  {
    id: '1',
    name: 'Use Cases',
    children: [
      {
        id: '2',
        name: 'usecase1.pdf'
      },
      {
        id: '3',
        name: 'usecase2.pdf'
      },
      {
        id: '4',
        name: 'usecase3.pdf'
      },
      {
        id: '5',
        name: 'usecase4.pdf'
      }
    ]
  }
];

const FileStructure = () => {
  return (
    <div className='flex flex-col gap-2 bg-background p-2'>
      <h3 className='font-bold px-2'>Files</h3>
      <div>
        <TOC toc={elements} />
      </div>
    </div>
  );
};

export default FileStructure;
