import { Tree, TreeViewElement } from '@/components/ui/tree-view-api';
import { TreeItem } from './tree-item';

type TOCProps = {
  toc: TreeViewElement[];
  searchValue: string;
};

export const TOC = ({ toc, searchValue }: TOCProps) => {
  return (
    <div>
      <Tree className='w-full h-full bg-background rounded-md' indicator={true} initialExpandedItems={['1']}>
        {toc.map((element) => (
          <TreeItem key={element.id} elements={[element]} searchValue={searchValue} />
        ))}
      </Tree>
    </div>
  );
};
