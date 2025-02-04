import { File, Folder, TreeViewElement } from '@/components/ui/tree-view-api';

type TreeItemProps = {
  elements: TreeViewElement[];
};

export const TreeItem = ({ elements }: TreeItemProps) => {
  return (
    <ul className='w-full space-y-1'>
      {elements.map((element) => (
        <li key={element.id} className='w-full space-y-2'>
          {element.children ? (
            <Folder element={element} value={element.id} isSelectable={element.isSelectable} className='pr-1'>
              <TreeItem key={element.id} aria-label={`folder ${element.name}`} elements={element.children} />
            </Folder>
          ) : (
            <File
              key={element.id}
              value={element.id}
              isSelectable={element.isSelectable}
              element={element}
              className={'px-1'}
            >
              <span className='ml-1'>{element?.name}</span>
            </File>
          )}
        </li>
      ))}
    </ul>
  );
};
