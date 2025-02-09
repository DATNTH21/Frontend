import { File, Folder, TreeViewElement } from '@/components/ui/tree-view-api';

type TreeItemProps = {
  elements: TreeViewElement[];
  searchValue?: string;
};

export const TreeItem = ({ elements, searchValue }: TreeItemProps) => {
  return (
    <ul className='w-full space-y-1'>
      {elements.map((element) => (
        <li key={element.id} className='w-full space-y-2'>
          {element.children ? (
            <Folder element={element} value={element.id} isSelectable={element.isSelectable} className='pr-1'>
              <TreeItem
                key={element.id}
                aria-label={`folder ${element.name}`}
                elements={element.children}
                searchValue={searchValue}
              />
            </Folder>
          ) : (
            (!searchValue || element.name.toLowerCase().includes(searchValue.toLowerCase())) && (
              <File
                key={element.id}
                value={element.id}
                isSelectable={element.isSelectable}
                element={element}
                className={'px-1 flex-1 min-w-0'}
              >
                <span className='ml-1 truncate'>{element.name}</span>
              </File>
            )
          )}
        </li>
      ))}
    </ul>
  );
};
