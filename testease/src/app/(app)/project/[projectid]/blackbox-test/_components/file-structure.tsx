import { TreeViewElement } from '@/components/ui/tree-view-api';
import { TOC } from '@/components/ui/tree';

const elements: TreeViewElement[] = [
  {
    id: '1',
    name: 'Use-cases',
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
  },
  {
    id: '6',
    name: 'Test-cases',
    children: [
      {
        id: '7',
        name: 'testcase1'
      },
      {
        id: '8',
        name: 'testcase2'
      },
      {
        id: '9',
        name: 'testcase3'
      },
      {
        id: '10',
        name: 'testcase4'
      },
      {
        id: '11',
        name: 'testcase5'
      },
      {
        id: '12',
        name: 'testcase6'
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
