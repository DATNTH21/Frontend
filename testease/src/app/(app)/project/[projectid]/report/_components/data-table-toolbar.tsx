'use client';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTableViewOptions } from './data-table-view-options';
import { ChangeEvent, useState } from 'react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [value, setValue] = useState('');

  const handleChangeInputFilter = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn('title')?.setFilterValue(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter reports...'
          value={value}
          onChange={handleChangeInputFilter}
          className='h-8 w-[170px] lg:w-[250px] text-sm'
        />
        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
