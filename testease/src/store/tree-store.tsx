import { TreeViewElement } from '@/components/ui/tree-view-api';
import { create } from 'zustand';

type TreeState = {
  //parentMap: Record<string, string | null>;
  selectedId: string | undefined;
  expandedItems: string[];
  checkedIds: Set<string>;
  direction?: 'rtl' | 'ltr';
  indicator: boolean;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;

  //setParentMap: (elements: TreeViewElement[]) => void;
  selectItem: (id: string) => void;
  handleExpand: (id: string) => void;
  toggleCheck: (checked: boolean, element: TreeViewElement) => void;
  setExpandedItems: (items: string[]) => void;
  setDirection: (dir: 'rtl' | 'ltr' | undefined) => void;
  setIndicator: (show: boolean) => void;
  setIcons: (openIcon?: React.ReactNode, closeIcon?: React.ReactNode) => void;
};

// const buildParentMap = (
//   elements: TreeViewElement[],
//   parentId: string | null = null,
//   map: Record<string, string | null> = {}
// ): Record<string, string | null> => {
//   elements.forEach((element) => {
//     map[element.id] = parentId; // Store parent ID
//     if (element.children) {
//       buildParentMap(element.children, element.id, map);
//     }
//   });

//   //console.log('Tree map: ', map);
//   return map;
// };

// Recursive function to get all descendant IDs
const getDescendantIds = (element: TreeViewElement): string[] => {
  let ids: string[] = [];
  if (element.children) {
    element.children.forEach((child) => {
      ids.push(child.id);
      ids = ids.concat(getDescendantIds(child));
    });
  }
  //   console.log('element: ', element);
  //   console.log('descendant ids: ', ids);
  return ids;
};

// const findParentElement = (id: string, elements: TreeViewElement[]): TreeViewElement | null => {
//   for (const element of elements) {
//     if (element.children?.some((child) => child.id === id)) {
//       return element;
//     }
//     const foundInChild = findParentElement(id, element.children || []);
//     if (foundInChild) return foundInChild;
//   }
//   return null;
// };

export const useTreeStore = create<TreeState>((set) => ({
  //parentMap: {},
  selectedId: undefined,
  expandedItems: [],
  checkedIds: new Set(),
  direction: 'ltr',
  indicator: true,
  openIcon: undefined,
  closeIcon: undefined,

  //setParentMap: (elements) => set({ parentMap: buildParentMap(elements) }),

  selectItem: (id) => set({ selectedId: id }),

  handleExpand: (id) =>
    set((state) => ({
      expandedItems: state.expandedItems.includes(id)
        ? state.expandedItems.filter((item) => item !== id)
        : [...state.expandedItems, id]
    })),

  toggleCheck: (isChecked, element) =>
    set((state) => {
      const newCheckedIds = new Set(state.checkedIds);

      // This is a folder
      // If a folder is checked, all of the children are checked
      // If a folder is unchecked, all of the children are unchecked
      if (element.children) {
        const descendantIds = getDescendantIds(element);
        descendantIds.forEach((childId) => (isChecked ? newCheckedIds.add(childId) : newCheckedIds.delete(childId)));
      } else {
        // Toggle a file
        isChecked ? newCheckedIds.add(element.id) : newCheckedIds.delete(element.id);
      }

      return { checkedIds: newCheckedIds };
    }),

  setExpandedItems: (items) => set({ expandedItems: items }),

  setDirection: (dir) => set({ direction: dir }),

  setIndicator: (show) => set({ indicator: show }),

  setIcons: (openIcon, closeIcon) => set({ openIcon, closeIcon })
}));
