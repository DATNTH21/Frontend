'use client';
import { Table } from '@tanstack/react-table';
// import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableViewOptions } from './data-table-view-options';
// import { DataTableFacetedFilter } from './data-table-faceted-filter';
// import { scenarioStatus } from '../../_data/constant';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onExportTestCaseButtonClick: () => void;
}

export function DataTableToolbar<TData>({ table, onExportTestCaseButtonClick }: DataTableToolbarProps<TData>) {
  //const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      {/* <div className='flex flex-1 items-center space-x-2'>
        {table.getColumn('status') && (
          <DataTableFacetedFilter column={table.getColumn('status')} title='Status' options={scenarioStatus} />
        )}
        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Reset
            <X />
          </Button>
        )}
      </div> */}
      <DataTableViewOptions table={table} />
      <Button onClick={onExportTestCaseButtonClick} className='bg-teal-600 hover:bg-teal-600/80'>
        Export Test Cases
      </Button>
    </div>
  );
}
