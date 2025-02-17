'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import DataTableRowActions from './data-table-row-actions';
import { type TReportSchema } from '../_data/schemas';

export const columns: ColumnDef<TReportSchema>[] = [
  {
    accessorKey: '_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => <div className='overflow-hidden text-ellipsis'>{row.getValue('_id')}</div>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title='REPORT TITLE' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[400px] truncate font-medium'>{row.getValue('title')}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title='REPORT TYPE' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[80px] truncate'>{row.getValue('type')}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'reportedBy',
    header: ({ column }) => <DataTableColumnHeader column={column} title='REPORTED BY' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[200px] truncate'>{row.getValue('reportedBy')}</span>
        </div>
      );
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
