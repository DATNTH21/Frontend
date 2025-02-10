'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
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
import { TTestcase } from '@/types/test-case';

import TestCaseDetail from './test-case-detail';
import { Sheet } from '@/components/ui/sheet';
import TestCaseEditForm from './test-case-edit-form';
import { useTestCasesOfScenario } from '@/api/testcase/testcase';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useUserConfig } from '@/api/user-config/user-config';
import { exportTestCasesToExcel } from '../file-export/file-export';

interface DataTableProps<TTestcase, TValue> {
  columns: ColumnDef<TTestcase, TValue>[];
}

export function TestCaseDataTable<TValue>({ columns }: DataTableProps<TTestcase, TValue>) {
  const params = useParams<{ useCaseId: string; projectId: string; scenarioId: string }>();
  const scenarioId = params.scenarioId;

  // Fetch test cases using the params:
  const { data: allTestCaseOfScenarioResponse, status: getTestCaseOfScenarioStatus } =
    useTestCasesOfScenario(scenarioId);
  const allTestCaseOfScenario = (allTestCaseOfScenarioResponse?.data || []) as TTestcase[];
  const exportTemplate = useUserConfig().data?.data?.testCaseExportTemplate || [];
  console.log('Test Cases: ', allTestCaseOfScenario);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isTestCaseDetailOpen, setTestCaseDetailOpen] = useState(false);
  const [testCaseDetailId, setTestCaseDetailId] = useState<string | undefined>(undefined);

  const table = useReactTable({
    data: allTestCaseOfScenario,
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

  const handleExportTestCaseInScenario = () => {
    console.log('Test case selection: ', rowSelection);
    if (!rowSelection || Object.keys(rowSelection).length == 0) {
      toast({
        variant: 'destructive',
        title: 'Fail To Export Test Case',
        description: 'Select at least 1 test case of this scenario to export'
      });
      return;
    }

    // Get test case data based on selection
    const testCasesToExport = allTestCaseOfScenario.filter((testCase) => rowSelection[testCase.test_case_id]);
    console.log('Test case to export data: ', testCasesToExport);

    if (!testCasesToExport) {
      toast({
        variant: 'destructive',
        title: 'Fail To Export Test Case',
        description: 'Something is wrong'
      });
      return;
    }

    if (!exportTemplate || exportTemplate.length == 0) {
      toast({
        variant: 'destructive',
        title: 'Fail To Export Test Case',
        description: 'No export template. Please config the template in the setting'
      });
      return;
    }

    try {
      exportTestCasesToExcel(testCasesToExport, exportTemplate);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Fail To Export Test Case',
        description: 'Something is wrong'
      });
    }
  };

  return (
    <>
      <div className='flex justify-between items-center mb-6'>
        <Link
          href={`/project/${params.projectId}/blackbox-test/use-case/${params.useCaseId}`}
          className='flex gap-1 items-center'
        >
          <ArrowLeft /> Go Back To{''}
          <span className='font-bold text-sidebar-active'>
            SCENARIO {''} {scenarioId}
          </span>
        </Link>
        <Button onClick={handleExportTestCaseInScenario}>Export All Test Cases</Button>
      </div>
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
                  <TableCell colSpan={columns.length} className='w-full h-24 text-center'>
                    <div className='w-full flex items-center justify-center'>
                      <Spinner />
                    </div>
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
        <TestCaseDetail
          testCaseId={testCaseDetailId}
          setOpen={setTestCaseDetailOpen}
          testCases={allTestCaseOfScenario}
        />
      </Sheet>

      {/* Test case edit dialog */}
      <TestCaseEditForm />
    </>
  );
}
