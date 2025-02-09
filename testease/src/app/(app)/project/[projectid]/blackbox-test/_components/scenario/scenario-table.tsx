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

import LoadingOverlay from '@/components/ui/loading/loading-overlay';
import { SolarSystem } from '@/components/ui/loading/solar-system';
import { TScenario } from '@/types/scenario';
import { useTreeStore } from '@/store/tree-store';
import { scenarioMockData } from '../../_data/scenario-mock-data';
import { useScenarioStore } from '@/store/scenario-store';
import { useScenariosOfUC } from '@/api/scenario/scenario';

interface DataTableProps<TScenario, TValue> {
  columns: ColumnDef<TScenario, TValue>[];
}

export default function ScenarioTable<TScenario, TValue>({ columns }: DataTableProps<TScenario, TValue>) {
  console.log('rerendering');
  const router = useRouter();
  const params = useParams<{ projectId: string; useCaseId: string; scenarioId: string }>();

  // Use tanstack query to get scenarios data of current use case:
  const { scenarioSelection, setScenarioSelection } = useScenarioStore();
  const rowSelection = scenarioSelection[params.useCaseId] || {};

  // console.log('Scenario Selection: ', scenarioSelection);

  // Fetch scenarios for the current use case
  // const scenarios = useMemo(() => scenarioMockData.find((s) => s._id === params.useCaseId), [params.useCaseId]);
  const scenarios = useScenariosOfUC(params.useCaseId).data?.data;
  // console.log('Scenarios: ', scenarios);

  const data = useMemo(
    () =>
      scenarios
        ? (scenarios.map((scenario) => ({
            _id: scenario._id,
            content: scenario.content,
            scenario_id: scenario.scenario_id
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
    //enableRowSelection: (row) => row.original.status == 'default',
    enableHiding: true,
    initialState: {
      columnVisibility: { _id: false }
    }
  });

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
                  // data-state={row.getValue('status')}
                  // className={`cursor-pointer ${row.getValue('status') === 'generating' ? 'pointer-events-none bg-muted !text-muted-foreground' : ''}`}
                  className='cursor-pointer'
                  onClick={() => {
                    router.push(
                      `/project/${params.projectId}/blackbox-test/use-case/${params.useCaseId}/scenario/${row.id}`
                    );
                    // if (row.getValue('status') != 'fail') {
                    //   router.push(
                    //     `/project/${params.projectId}/blackbox-test/use-case/${params.useCaseId}/scenario/${row.getValue('_id')}`
                    //   );
                    // } else {
                    //   //notify user that they can't view fail scenarios
                    // }
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
      {/* {status == 'pending' && <LoadingOverlay spinner={<SolarSystem />} />} */}
    </div>
  );
}
