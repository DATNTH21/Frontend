'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { testCasePriorities, testCaseStatuses } from '../../_data/constant';
import { TTestcase } from '@/types/test-case';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Badge } from '@/components/ui/badge';

export const testCaseColumns: ColumnDef<TTestcase>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='TEST CASE ID' />,
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='truncate font-medium'>{row.id}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='NAME' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('name')}</span>
        </div>
      );
    }
  },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='Priority' />,
  //   cell: ({ row }) => {
  //     const priority = testCasePriorities.find((priority) => priority.value === row.getValue('priority'));

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className='flex items-center'>
  //         <Badge variant='outline'>
  //           {priority.icon && <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
  //           <span>{priority.label}</span>
  //         </Badge>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   sortingFn: (rowA, rowB, columnId) => {
  //     const { priority: priority1 } = rowA.original;
  //     const { priority: priority2 } = rowB.original;

  //     return priorityToInt[priority1] - priorityToInt[priority2];
  //   }
  // },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='STATUS' />,
    cell: ({ row }) => {
      const status = testCaseStatuses.find((status) => status.value === String(row.getValue('status')).toLowerCase());
      if (!status) {
        return null;
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && <status.icon className='mr-2 h-4 w-4 text-muted-foreground' color={status.color} />}
          <span style={{ color: status.color }}>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
