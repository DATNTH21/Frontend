'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/utils/cn';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react';
import React, { forwardRef, useCallback, useEffect } from 'react';
import { useTreeStore } from '@/store/tree-store';
import { Checkbox } from './checkbox';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useScenarioStore } from '@/store/scenario-store';
import { useProject } from '@/api/project/project';

type TreeViewElement = {
  id: string;
  name: string;
  isSelectable?: boolean;
  children?: TreeViewElement[];
};

interface TreeViewComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

type TreeViewProps = {
  initialSelectedId?: string;
  indicator?: boolean;
  elements?: TreeViewElement[];
  initialExpandedItems?: string[];
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  direction?: 'ltr' | 'rtl';

  //For checkbox purpose
  initialCheckedIds?: string[];
} & TreeViewComponentProps;

/**
 * Tree View Docs: {@link: https://shadcn-extension.vercel.app/docs/tree-view}
 */

const Tree = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      elements,
      initialSelectedId,
      initialExpandedItems,
      indicator = true,
      openIcon,
      closeIcon,
      initialCheckedIds,
      direction,
      ...props
    },
    ref
  ) => {
    const {
      expandedItems,
      direction: ContextDirection,
      setExpandedItems,
      setIndicator,
      setIcons,
      setDirection
    } = useTreeStore();

    useEffect(() => {
      setIndicator(indicator);
      setIcons(openIcon, closeIcon);
      setDirection(direction);
    }, [indicator, openIcon, closeIcon, setIndicator, setIcons, direction]);

    const expandSpecificTargetedElements = useCallback(
      (elements?: TreeViewElement[], selectId?: string) => {
        if (!elements || !selectId) return;
        const findParent = (currentElement: TreeViewElement, currentPath: string[] = []) => {
          const newPath = [...currentPath, currentElement.id];
          if (currentElement.id === selectId) {
            setExpandedItems([...expandedItems, ...newPath]);
            return;
          }
          currentElement.children?.forEach((child) => findParent(child, newPath));
        };
        elements.forEach((element) => findParent(element));
      },
      [expandedItems, setExpandedItems]
    );

    // Expand on mount
    useEffect(() => {
      if (initialExpandedItems) {
        setExpandedItems(initialExpandedItems);
      }
    }, []);

    useEffect(() => {
      if (initialSelectedId) {
        expandSpecificTargetedElements(elements, initialSelectedId);
      }
    }, [initialSelectedId, elements, expandSpecificTargetedElements]);

    return (
      <div className={cn('size-full', className)}>
        <ScrollArea ref={ref} className='h-full relative px-2'>
          <AccordionPrimitive.Root
            {...props}
            type='multiple'
            defaultValue={expandedItems}
            value={expandedItems}
            className='flex flex-col gap-1'
            onValueChange={(value) => setExpandedItems(value)}
            dir={ContextDirection}
          >
            {props.children}
          </AccordionPrimitive.Root>
        </ScrollArea>
      </div>
    );
  }
);

Tree.displayName = 'Tree';

const TreeIndicator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { direction } = useTreeStore();

    return (
      <div
        dir={direction}
        ref={ref}
        className={cn(
          'h-full w-px bg-muted absolute left-1.5 rtl:right-1.5 py-3 rounded-md hover:bg-slate-300 duration-300 ease-in-out',
          className
        )}
        {...props}
      />
    );
  }
);

TreeIndicator.displayName = 'TreeIndicator';

interface FolderComponentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

type FolderProps = {
  expandedItems?: string[];
  element: TreeViewElement;
  isSelectable?: boolean;
  isSelect?: boolean;
} & FolderComponentProps;

const Folder = forwardRef<HTMLDivElement, FolderProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ className, element, value, isSelectable = true, isSelect, children, ...props }, ref) => {
    const {
      direction,
      handleExpand,
      expandedItems,
      indicator,
      setExpandedItems,
      openIcon,
      closeIcon,
      toggleCheck,
      checkedIds
    } = useTreeStore();

    const { scenarioSelection } = useScenarioStore();
    const isScenarioSelected = Object.keys(scenarioSelection).length > 0;

    const params = useParams<{ projectId: string; useCaseId: string; scenarioId: string }>();
    const { data: { data: project } = {} } = useProject(params.projectId);
    const isGenerating = project ? project.status === 'Generating' : true;

    const isChecked = element.children?.every((child) => checkedIds.has(child.id));
    return (
      <AccordionPrimitive.Item {...props} value={value} className='relative overflow-hidden h-full'>
        <div className='flex gap-2 items-center'>
          {element.children?.length != 0 && (
            <Checkbox
              checked={isChecked}
              onCheckedChange={(value) => toggleCheck(value as boolean, element)}
              disabled={isScenarioSelected || isGenerating}
            />
          )}

          <AccordionPrimitive.Trigger
            className={cn(`flex items-center gap-1 text-sm rounded-md`, className, {
              'bg-muted rounded-md': isSelect && isSelectable,
              'cursor-pointer': isSelectable,
              'cursor-not-allowed opacity-50': !isSelectable
            })}
            disabled={!isSelectable}
            onClick={() => handleExpand(value)}
          >
            {expandedItems?.includes(value)
              ? (openIcon ?? <FolderOpenIcon className='h-4 w-4' />)
              : (closeIcon ?? <FolderIcon className='h-4 w-4' />)}
            <span>{element.name}</span>
          </AccordionPrimitive.Trigger>
        </div>

        <AccordionPrimitive.Content className='text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down relative overflow-hidden h-full'>
          {element && indicator && <TreeIndicator aria-hidden='true' />}
          <AccordionPrimitive.Root
            dir={direction}
            type='multiple'
            className='flex flex-col gap-1 py-1 ml-5 rtl:mr-5 '
            defaultValue={expandedItems}
            value={expandedItems}
            onValueChange={(value) => setExpandedItems(value)}
          >
            {children}
          </AccordionPrimitive.Root>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );
  }
);

Folder.displayName = 'Folder';

const File = forwardRef<
  HTMLButtonElement,
  {
    value: string;
    handleSelect?: (id: string) => void;
    isSelectable?: boolean;
    isSelect?: boolean;
    fileIcon?: React.ReactNode;
    element: TreeViewElement;
  } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ value, className, handleSelect, isSelectable = true, isSelect, fileIcon, children, element, ...props }, ref) => {
  const router = useRouter();
  const params = useParams<{ projectId: string; useCaseId: string }>();
  const { direction, selectItem, checkedIds, toggleCheck } = useTreeStore();
  const isSelected = isSelect ?? params.useCaseId === value;
  const isChecked = checkedIds.has(element.id);

  const { scenarioSelection } = useScenarioStore();
  const isScenarioSelected = Object.keys(scenarioSelection).length > 0;

  const { data: { data: project } = {} } = useProject(params.projectId);
  const isGenerating = project ? project.status === 'Generating' : true;
  return (
    <AccordionPrimitive.Item value={value} className='relative'>
      <div className='flex gap-2 items-center'>
        <Checkbox
          checked={isChecked}
          onCheckedChange={(value) => toggleCheck(value as boolean, element)}
          disabled={isScenarioSelected || isGenerating}
        />
        <AccordionPrimitive.Trigger
          ref={ref}
          {...props}
          dir={direction}
          disabled={!isSelectable}
          aria-label='File'
          className={cn(
            'flex items-center gap-1 cursor-pointer text-sm pr-1 rtl:pl-1 rtl:pr-0 w-full duration-200 ease-in-out border border-transparent hover:bg-sidebar-accent rounded-md',
            {
              'font-semibold text-sidebar-active bg-sidebar-accent': isSelected && isSelectable
            },
            isSelectable ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed',
            className
          )}
          onClick={() => {
            selectItem(value);
            router.push(`/project/${params.projectId}/blackbox-test/use-case/${value}`);
          }}
        >
          {fileIcon ?? <FileIcon className='h-4 w-4' />}
          {children}
        </AccordionPrimitive.Trigger>
      </div>
    </AccordionPrimitive.Item>
  );
});

File.displayName = 'File';

export { Tree, Folder, File, type TreeViewElement };
