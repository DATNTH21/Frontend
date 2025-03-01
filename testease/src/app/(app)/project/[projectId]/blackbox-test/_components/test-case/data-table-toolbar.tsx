'use client';

import { ChangeEvent, useState } from 'react';
import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const [value, setValue] = useState('');

  const handleChangeInputFilter = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn('name')?.setFilterValue(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter test cases...'
          value={value}
          onChange={handleChangeInputFilter}
          className='h-8 w-[170px] lg:w-[250px] text-sm'
        />
        {/* {table.getColumn('status') && (
          <DataTableFacetedFilter column={table.getColumn('status')} title='Status' options={testCaseStatuses} />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter column={table.getColumn('priority')} title='Priority' options={testCasePriorities} />
        )}
        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Reset
            <X />
          </Button>
        )} */}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
