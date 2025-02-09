'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import { useParams } from 'next/navigation';
import { testcaseMockData } from '../../_data/test-case-mock-data';
import { TTestcase as BaseTestcase } from '@/types/test-case';

import TestCaseDetail from './test-case-detail';
import { Sheet } from '@/components/ui/sheet';
import TestCaseEditForm from './test-case-edit-form';
import { useGlobalStore } from '@/store/global-store';
import { useTestCasesOfScenario } from '@/api/testcase/testcase';

interface TTestcase extends BaseTestcase {
  _id: string;
  test_case_id: string;
  name: string;
  objective: string;
  steps: string[];
  status: string;
  expected_result: string;
  priority: 'low' | 'medium' | 'high';
}

interface DataTableProps<TTestcase, TValue> {
  columns: ColumnDef<TTestcase, TValue>[];
}

export function TestCaseDataTable<TValue>({ columns }: DataTableProps<TTestcase, TValue>) {
  const params = useParams<{ projectId: string; scenarioId: string }>();
  const projectId = params.projectId;
  const scenarioId = params.scenarioId;

  // Fetch test cases using the params:
  const data = (useTestCasesOfScenario(scenarioId).data?.data || []) as TTestcase[];
  console.log('Test Cases: ', data);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isTestCaseDetailOpen, setTestCaseDetailOpen] = useState(false);
  const [testCaseDetailId, setTestCaseDetailId] = useState<string | undefined>(undefined);

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    getRowId: (row: any) => row.test_case_id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  return (
    <>
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
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => {
                      setTestCaseDetailId(row.id);
                      setTestCaseDetailOpen(true);
                    }}
                    className='cursor-pointer'
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
      </div>

      {/* Test case detail sheet */}
      <Sheet open={isTestCaseDetailOpen} onOpenChange={setTestCaseDetailOpen}>
        <TestCaseDetail testCaseId={testCaseDetailId} setOpen={setTestCaseDetailOpen} testCases={data} />
      </Sheet>

      {/* Test case edit dialog */}
      <TestCaseEditForm />
    </>
  );
}
