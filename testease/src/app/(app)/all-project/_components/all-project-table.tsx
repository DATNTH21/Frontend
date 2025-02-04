'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTablePagination } from './data-table-pagination';
import { useRouter } from 'next/navigation';
import { paths } from '@/lib/routes';
import { Project } from '@/types/project';
import { useProject } from '@/api/project/project';
import LoadingOverlay from '@/components/ui/loading/loading-overlay';
import { SolarSystem } from '@/components/ui/loading/solar-system';

interface DataTableProps<TValue> {
  columns: ColumnDef<Project, TValue>[];
  searchParam: string;
}

export default function AllProjectTable<TValue>({ columns, searchParam }: DataTableProps<TValue>) {
  const router = useRouter();
  const { data: projectResponse, status } = useProject(searchParam);
  const projects = projectResponse ? projectResponse.data : [];

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ _id: false });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<Project>({
    data: projects,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableMultiRowSelection: false,
    enableHiding: true,
    initialState: {
      columnVisibility: { _id: false }
    }
  });

  // If fail to retrieve project, return
  if (status == 'error') {
    router.push(paths.projectAll.getHref());
  }

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getValue('status')}
                  className={`cursor-pointer ${row.getValue('status') === 'Generating' ? 'pointer-events-none bg-muted !text-muted-foreground' : ''}`}
                  onClick={() => {
                    router.push(paths.projectDetail.dashboard.getHref(row.getValue('_id')));
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
      <DataTablePagination table={table} />
      {status == 'pending' && <LoadingOverlay spinner={<SolarSystem />} />}
    </div>
  );
}
