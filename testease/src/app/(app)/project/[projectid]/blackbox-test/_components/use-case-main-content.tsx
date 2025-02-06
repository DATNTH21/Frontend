'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTreeStore } from '@/store/tree-store';
import React, { useEffect, useState, useRef } from 'react';
import ScenarioTable from './scenario/scenario-table';
import { columns } from './scenario/scenario-columns';
import { useCaseMockData } from '../_data/use-case-mock-data';
import { useParams, useRouter } from 'next/navigation';
import { paths } from '@/lib/routes';
import { TestCaseDataTable } from './test-case/test-case-data-table';
import { testCaseColumns } from './test-case/test-case-columns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UseCaseMainContent() {
  const router = useRouter();
  const params = useParams<{ projectId: string; useCaseId: string; scenarioId: string }>();
  const projectId = params.projectId;
  const useCaseId = params.useCaseId;
  const scenarioId = params.scenarioId;

  if (!projectId) {
    router.push(paths.projectAll.getHref());
  }

  const { checkedIds } = useTreeStore();
  const data = useCaseMockData.find((useCase) => useCase.project_id === projectId && useCase.use_case_id === useCaseId);

  const [activeTab, setActiveTab] = useState(scenarioId ? 'Test Case' : 'Scenario');
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', width: '0px' });

  useEffect(() => {
    setActiveTab(scenarioId ? 'Test Case' : 'Scenario');
  }, [scenarioId]);

  // Update the underline position and width when the active tab changes
  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      setIndicatorStyle({
        left: `${activeElement.offsetLeft}px`,
        width: `${activeElement.offsetWidth}px`
      });
    }
  }, [activeTab]);

  if (!useCaseId) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        Create new use case or select a use case to see its content
      </div>
    );
  }

  if (!data) {
    return <div className='flex flex-1 justify-center items-center'>Cannot find this use case data</div>;
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
      <div className='w-full border-b relative'>
        <TabsList className='relative p-0 h-fit flex w-fit'>
          <TabsTrigger
            ref={(el) => {
              tabRefs.current['Use Case'] = el;
            }}
            value='Use Case'
            className='relative py-4 px-8 bg-background text-foreground rounded-none data-[state=active]:shadow-none 
            data-[state=active]:text-sidebar-active data-[state=active]:font-bold'
          >
            USE CASE
          </TabsTrigger>

          <TabsTrigger
            ref={(el) => {
              tabRefs.current['Scenario'] = el;
            }}
            value='Scenario'
            className='relative py-4 px-8 bg-background text-foreground rounded-none data-[state=active]:shadow-none 
            data-[state=active]:text-sidebar-active data-[state=active]:font-bold'
          >
            SCENARIO
          </TabsTrigger>

          {scenarioId && (
            <TabsTrigger
              ref={(el) => {
                tabRefs.current['Test Case'] = el;
              }}
              value='Test Case'
              className='relative py-4 px-8 bg-background text-foreground rounded-none data-[state=active]:shadow-none 
              data-[state=active]:text-sidebar-active data-[state=active]:font-bold'
            >
              TEST CASE
            </TabsTrigger>
          )}

          {/* Motion Indicator */}
          <span
            className='absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out'
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width
            }}
          ></span>
        </TabsList>
      </div>

      <TabsContent value='Use Case' className='p-4'>
        <p>Selected file: {useCaseId}</p>
        <p>Checked files: {checkedIds}</p>
        <p>{data.content}</p>
      </TabsContent>

      <TabsContent value='Scenario' className='p-4'>
        <ScenarioTable columns={columns} />
      </TabsContent>

      <TabsContent value='Test Case' className='p-4'>
        <div>
          <div className='flex justify-center items-center w-fit mb-6'>
            <ArrowLeft /> Go Back To{''}
            <Link
              href={`/project/${projectId}/blackbox-test/use-case/${useCaseId}`}
              className='ml-2 font-bold text-sidebar-active'
            >
              SCENARIO {''} {scenarioId}
            </Link>
          </div>
          <TestCaseDataTable columns={testCaseColumns} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
