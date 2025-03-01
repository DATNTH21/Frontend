'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMemo, useState } from 'react';
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
import { useParams, useRouter } from 'next/navigation';
import { useScenarioStore } from '@/store/scenario-store';
import { useScenariosOfUC } from '@/api/scenario/scenario';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/hooks/use-toast';
import { useTestCasesOfUseCase } from '@/api/testcase/testcase';
import { useUserConfig } from '@/api/user-config/user-config';
import wretch from 'wretch';
import { saveAs } from 'file-saver';

interface DataTableProps<TScenario, TValue> {
  columns: ColumnDef<TScenario, TValue>[];
}

export default function ScenarioTable<TScenario, TValue>({ columns }: DataTableProps<TScenario, TValue>) {
  const router = useRouter();
  const params = useParams<{ projectId: string; useCaseId: string }>();

  // Use tanstack query to get scenarios data of current use case:
  const { scenarioSelection, setScenarioSelection } = useScenarioStore();
  const rowSelection = scenarioSelection[params.useCaseId] || {};
  const { data: scenariosResponse, status } = useScenariosOfUC(params.useCaseId);
  const { data: testCaseOfUseCaseResponse } = useTestCasesOfUseCase(params.useCaseId);
  const scenarios = scenariosResponse?.data;
  const exportTemplate = useUserConfig().data?.data?.testCaseExportTemplate || [];
  const testCases = testCaseOfUseCaseResponse?.data;

  const data = useMemo(
    () =>
      scenarios
        ? (scenarios.map((scenario) => ({
            _id: scenario._id,
            content: scenario.content,
            scenario_id: scenario.scenario_id,
            test_cases_count: scenario.test_cases_count
          })) as TScenario[])
        : [],
    [scenarios]
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ _id: false });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    getRowId: (row: any) => row.scenario_id,
    onRowSelectionChange: (newSelection) => setScenarioSelection(params.useCaseId, newSelection),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableMultiRowSelection: true,
    enableHiding: true,
    initialState: {
      columnVisibility: { _id: false }
    }
  });

  const handleExportTestCase = async () => {
    if (testCases == null || testCases?.length == 0 || !testCases) {
      toast({
        variant: 'destructive',
        title: 'Fail To Export Test Case',
        description: 'No test case available for this use case'
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
      const response = await wretch('/api/export-test-cases')
        .headers({
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        .post({ testCases: testCases, template: exportTemplate });

      const blob = await response.blob();
      saveAs(blob, 'Test_Cases.xlsx');
      toast({
        variant: 'success',
        title: 'Test Cases downloaded'
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Fail To Export Test Case',
        description: 'Something is wrong'
      });
    }
  };

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} onExportTestCaseButtonClick={handleExportTestCase} />
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
            {status == 'pending' ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='w-full h-24 text-center'>
                  <div className='w-full flex items-center justify-center'>
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className='cursor-pointer'
                  onClick={() => {
                    router.push(
                      `/project/${params.projectId}/blackbox-test/use-case/${params.useCaseId}/scenario/${row.id}`
                    );
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='w-full h-24 text-center'>
                  No scenarios available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
