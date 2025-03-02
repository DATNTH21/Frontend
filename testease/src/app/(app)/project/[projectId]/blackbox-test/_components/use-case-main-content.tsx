'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTreeStore } from '@/store/tree-store';
import { useEffect, useState } from 'react';
import ScenarioTable from './scenario/scenario-table';
import { columns } from './scenario/scenario-columns';
import { useParams, useRouter } from 'next/navigation';
import { paths } from '@/lib/routes';
import { TestCaseDataTable } from './test-case/test-case-data-table';
import { testCaseColumns } from './test-case/test-case-columns';
import Link from 'next/link';
import { UseCase } from '@/types/use-case';
import { Button } from '@/components/ui/button';

export default function UseCaseMainContent({ useCases }: { useCases: UseCase[] }) {
  const router = useRouter();
  const params = useParams<{ projectId: string; useCaseId: string; scenarioId: string }>();
  const projectId = params.projectId;
  const useCaseId = params.useCaseId;
  const scenarioId = params.scenarioId;

  if (!projectId) {
    router.push(paths.projectAll.getHref());
  }

  const { checkedIds } = useTreeStore();
  console.log('Checked IDs: ', checkedIds);
  const data = useCases.find((useCase) => useCase.project_id === projectId && useCase.use_case_id === useCaseId);

  const [activeTab, setActiveTab] = useState(scenarioId ? 'Test Case' : 'Scenario');

  useEffect(() => {
    setActiveTab(scenarioId ? 'Test Case' : 'Scenario');
  }, [scenarioId]);

  if (!useCaseId) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        Create new use case or select a use case to see its content
      </div>
    );
  }

  if (!data) {
    return (
      <div className='flex flex-col flex-1 gap-2 justify-center items-center'>
        Cannot find this use case data
        <Link href={`/project/${projectId}/blackbox-test/use-case/`}>
          <Button>Go back</Button>
        </Link>
      </div>
    );
  }

  const description = data.description.split('\\n');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
      <div className='w-full border-b relative'>
        <TabsList className='relative p-0 h-fit flex w-fit'>
          <TabsTrigger
            value='Use Case'
            className='group relative py-4 px-8 bg-background text-foreground rounded-none data-[state=active]:shadow-none 
            data-[state=active]:text-sidebar-active data-[state=active]:font-bold'
          >
            USE CASE
            <span
              className='absolute bottom-0 left-0 h-[2px] bg-primary w-full scale-x-0 transition-all duration-300 ease-in-out 
              group-data-[state=active]:scale-x-100'
            ></span>
          </TabsTrigger>

          <TabsTrigger
            value='Scenario'
            className='group relative py-4 px-8 bg-background text-foreground rounded-none data-[state=active]:shadow-none 
            data-[state=active]:text-sidebar-active data-[state=active]:font-bold'
          >
            SCENARIO
            <span
              className='absolute bottom-0 left-0 h-[2px] bg-primary w-full scale-x-0 transition-all duration-300 ease-in-out 
              group-data-[state=active]:scale-x-100'
            ></span>
          </TabsTrigger>

          {scenarioId && (
            <TabsTrigger
              value='Test Case'
              className='group relative py-4 px-8 bg-background text-foreground rounded-none data-[state=active]:shadow-none 
              data-[state=active]:text-sidebar-active data-[state=active]:font-bold'
            >
              TEST CASE
              <span
                className='absolute bottom-0 left-0 h-[2px] bg-primary w-full scale-x-0 transition-all duration-300 ease-in-out 
              group-data-[state=active]:scale-x-100'
              ></span>
            </TabsTrigger>
          )}
        </TabsList>
      </div>

      <TabsContent value='Use Case' className='p-4'>
        <div className='flex items-center gap-2 mb-3'>
          <h1 className='text-sidebar-active font-bold'>Use Case ID: </h1>
          <p>{data.use_case_id}</p>
        </div>
        <div className='flex items-center gap-2 mb-3'>
          <h1 className='text-sidebar-active font-bold'>Use Case Name: </h1>
          <p>{data.name}</p>
        </div>
        <div className='mb-3'>
          <h1 className='text-sidebar-active font-bold'>Use Case Description: </h1>
          {description.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </TabsContent>

      <TabsContent value='Scenario' className='p-4'>
        <ScenarioTable columns={columns} />
      </TabsContent>

      <TabsContent value='Test Case' className='p-4'>
        <TestCaseDataTable columns={testCaseColumns} />
      </TabsContent>
    </Tabs>
  );
}
