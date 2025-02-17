'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CSSProperties, Dispatch, SetStateAction } from 'react';
import {
  Cell,
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  Header,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  columnVisibility: VisibilityState;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  columnOrder: ColumnOrderState;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
  onTemplateSave: () => void;
}

export default function ExportTemplateTable<TData>({
  columns,
  data,
  columnVisibility,
  setColumnVisibility,
  columnOrder,
  setColumnOrder,
  onTemplateSave
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder
    },
    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false,
    enableHiding: true,
    initialState: {
      columnVisibility
    }
  });

  const DraggableTableHead = ({ header }: { header: Header<TData, unknown> }) => {
    const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
      id: header.column.id
    });

    const style: CSSProperties = {
      opacity: isDragging ? 0.8 : 1,
      position: 'relative',
      transform: CSS.Translate.toString(transform),
      transition: 'width transform 0.2s ease-in-out',
      whiteSpace: 'nowrap',
      width: header.column.getSize(),
      zIndex: isDragging ? 1 : 0
    };

    return (
      <TableHead key={header.id} colSpan={header.colSpan} ref={setNodeRef} style={style}>
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        <Button size='icon' variant='ghost' {...attributes} {...listeners} className='flex w-full'>
          <GripVertical />
        </Button>
      </TableHead>
    );
  };

  const DragAlongCell = ({ cell }: { cell: Cell<TData, unknown> }) => {
    const { isDragging, setNodeRef, transform } = useSortable({
      id: cell.column.id
    });

    const style: CSSProperties = {
      opacity: isDragging ? 0.8 : 1,
      position: 'relative',
      transform: CSS.Translate.toString(transform),
      transition: 'width transform 0.2s ease-in-out',
      width: cell.column.getSize(),
      zIndex: isDragging ? 1 : 0
    };

    return (
      <TableCell key={cell.id} ref={setNodeRef} style={style}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    );
  };

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className='space-y-4 mt-4'>
        <div className='flex justify-between items-center'>
          <DataTableViewOptions table={table} />
          <Button onClick={onTemplateSave}>Save Template</Button>
        </div>
        <div className='rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                    {headerGroup.headers.map((header) => (
                      <DraggableTableHead key={header.id} header={header} />
                    ))}
                  </SortableContext>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <SortableContext key={cell.id} items={columnOrder} strategy={horizontalListSortingStrategy}>
                        <DragAlongCell key={cell.id} cell={cell} />
                      </SortableContext>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DndContext>
  );
}
