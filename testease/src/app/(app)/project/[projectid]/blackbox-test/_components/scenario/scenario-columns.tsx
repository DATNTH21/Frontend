'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import DataTableRowActions from './data-table-row-actions';
import { TScenario } from '@/types/scenario';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<TScenario>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-label='Select row'
        className='translate-y-[2px]'
        // disabled={row.getValue('status') != 'default'}
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: '_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => <div className='overflow-hidden text-ellipsis'>{row.getValue('_id')}</div>
  },
  {
    accessorKey: 'scenario_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='SCENARIO ID' />,
    cell: ({ row }) => <div className='overflow-hidden text-ellipsis'>{row.getValue('scenario_id')}</div>
  },
  {
    accessorKey: 'content',
    header: ({ column }) => <DataTableColumnHeader column={column} title='CONTENT' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='truncate font-medium'>{row.getValue('content')}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'test_cases_count',
    header: ({ column }) => <DataTableColumnHeader column={column} title='TESTCASES NUMBER' />,
    cell: ({ row }) => {
      const count = row.getValue('test_cases_count') as number;
      return (
        <div className='flex space-x-2'>
          {count === 0 ? (
            <Badge variant='secondary'>NO TEST CASE YET</Badge>
          ) : (
            <span className='font-medium'>
              {count} {count > 1 ? 'test cases' : 'test case'}{' '}
            </span>
          )}
        </div>
      );
    }
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='STATUS' />,
  //   cell: ({ row }) => {
  //     const status = scenarioStatus.find((status) => status.value === row.getValue('status'));
  //     if (!status || status.value == 'default') {
  //       return null;
  //     }

  //     return (
  //       <div className='flex w-[100px] items-center'>
  //         <span
  //           style={{ color: status.color }}
  //           className='font-semibold flex gap-1 items-center justify-center uppercase'
  //         >
  //           {row.getValue('status') === 'generating' && <Spinner size='sm' className='text-sidebar-active' />}
  //           {status.icon && <status.icon className='mr-2 h-4 w-4 text-muted-foreground' color={status.color} />}
  //           <span style={{ color: status.color }}>{status.label}</span>
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   }
  // },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex justify-end items-center'>
        <DataTableRowActions row={row} />
      </div>
    )
  }
];
