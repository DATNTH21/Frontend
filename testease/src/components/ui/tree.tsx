'use client';
import { Tree, TreeViewElement } from '@/components/ui/tree-view-api';
import { TreeItem } from './tree-item';
import { useTreeStore } from '@/store/tree-store';

type TOCProps = {
  toc: TreeViewElement[];
};

export const TOC = ({ toc }: TOCProps) => {
  const { selectedId, checkedIds } = useTreeStore();
  return (
    <div>
      <Tree className='w-full h-full bg-background rounded-md' indicator={true} initialExpandedItems={['1']}>
        {toc.map((element) => (
          <TreeItem key={element.id} elements={[element]} />
        ))}
      </Tree>

      {/* Debugging or Displaying State */}
      <div className='mt-4 p-2 bg-gray-100 rounded'>
        <p>
          <strong>Selected File ID:</strong> {selectedId ?? 'None'}
        </p>
        <p>
          <strong>Checked IDs:</strong> {Array.from(checkedIds).join(', ') || 'None'}
        </p>
      </div>
    </div>
  );
};
