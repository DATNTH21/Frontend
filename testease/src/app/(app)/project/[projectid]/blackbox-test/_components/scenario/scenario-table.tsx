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
import { useTestCasesOfScenario } from '@/api/testcase/testcase';

interface DataTableProps<TScenario, TValue> {
  columns: ColumnDef<TScenario, TValue>[];
}

export default function ScenarioTable<TScenario, TValue>({ columns }: DataTableProps<TScenario, TValue>) {
  const router = useRouter();
  const params = useParams<{ projectId: string; useCaseId: string; scenarioId: string }>();

  // Use tanstack query to get scenarios data of current use case:
  const { scenarioSelection, setScenarioSelection } = useScenarioStore();
  const rowSelection = scenarioSelection[params.useCaseId] || {};
  const scenarios = useScenariosOfUC(params.useCaseId).data?.data;
<<<<<<< HEAD
  //const { data: allTestCasesOfScenarioResponse, status: testCaseStatus } = useTestCasesOfScenario(params.scenarioId);
=======
  console.log('Scenarios: ', scenarios);
>>>>>>> e5ee8bcc7f755b1e09bb7e27e38816c85727cac4

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

  const handleExportTestCase = () => {
    // scenarioSelection object:
    // {
    //   "UC-2": {
    //       "SC-20": true,
    //       "SC-21": true
    //   }
    // }
    console.log('scenarioSelection: ', scenarioSelection);

    if (!scenarioSelection[params.useCaseId]) {
      toast({
        variant: 'destructive',
        title: 'Fail To Export Test Case',
        description: 'Select at least 1 scenario of this use case for exporting test case'
      });
    }

    // if (testCaseStatus == 'pending') {
    //   toast({
    //     variant: 'default',
    //     title: 'Fail To Export Test Case',
    //     description: 'Fetching test cases in progress, comeback later'
    //   });
    // }

    // if (testCaseStatus == 'error') {
    //   toast({
    //     variant: 'default',
    //     title: 'Fail To Export Test Case',
    //     description: 'Error getting test cases of this use case'
    //   });
    // }

    // if (
    //   allTestCasesOfScenarioResponse?.data == null ||
    //   allTestCasesOfScenarioResponse?.data.length == 0 ||
    //   !allTestCasesOfScenarioResponse?.data
    // ) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Fail To Export Test Case',
    //     description: 'No test case available for this use case'
    //   });
    // }
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
            {table.getRowModel().rows?.length ? (
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
  );
}
