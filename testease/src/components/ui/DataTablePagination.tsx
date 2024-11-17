import { Combobox } from './Combobox';
import { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  console.log(table.getState());
  return (
    <>
      <div className='flex items-center space-x-2'>
        <p className='text-sm font-medium'>Rows per page</p>
        <Combobox updateValFunc={table.setPageSize} />
      </div>
      <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>
    </>
  );
}
