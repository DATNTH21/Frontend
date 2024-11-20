import { Tree, TreeViewElement, CollapseButton } from '@/components/ui/tree/tree-view-api';
import { TreeItem } from './tree-item';

type TOCProps = {
  toc: TreeViewElement[];
};

export const TOC = ({ toc }: TOCProps) => {
  return (
    <Tree className='w-full h-full bg-background p-2 rounded-md' indicator={true}>
      {toc.map((element, _) => (
        <TreeItem key={element.id} elements={[element]} />
      ))}
      <CollapseButton elements={toc} expandAll={true} />
    </Tree>
  );
};
