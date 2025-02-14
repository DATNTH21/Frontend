'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import DataTableRowActions from './data-table-row-actions';
import { projectStatus } from '../_data/schemas';
import { Spinner } from '@/components/ui/spinner';
import { Project } from '@/types/project';

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: '_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ORIGINAL_ID' />,
    cell: ({ row }) => <div className='overflow-hidden text-ellipsis'>{row.getValue('_id')}</div>
  },
  {
    accessorKey: 'project_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => <div className='overflow-hidden text-ellipsis'>{row.getValue('project_id')}</div>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='TITLE' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('name')}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='STATUS' />,
    cell: ({ row }) => {
      const status = projectStatus.find((status) => status.value === row.getValue('status'));
      if (!status || status.value == 'Default') {
        return null;
      }

      return (
        <div className='flex items-center'>
          <span style={{ color: status.color }} className='font-semibold flex gap-1 items-center justify-center'>
            {row.getValue('status')}
            {String(row.getValue('status')).startsWith('Generating') && <Spinner size='sm' />}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex justify-end items-center'>
        <DataTableRowActions row={row} />
      </div>
    )
  }
];
