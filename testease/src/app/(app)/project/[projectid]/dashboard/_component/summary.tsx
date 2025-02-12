'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProjectOverviewStatistics } from '@/types/project';

export default function SummarySection({ statistics }: { statistics: ProjectOverviewStatistics }) {
  const { total_test_cases, total_scenarios } = statistics;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {[
            { label: 'Total Scenarios Generated', value: total_scenarios },
            { label: 'Total Test Cases Generated', value: total_test_cases },
            { label: 'Bug/Defect Report', value: 30 },
            { label: 'Test Summary Report', value: 1 },
            { label: 'Total Reports', value: 31 }
          ].map((item, index) => (
            <div key={index} className='flex justify-between items-center p-4 bg-sidebar rounded-lg'>
              <span className='text-sm font-medium'>{item.label}</span>
              <span className='text-lg font-bold'>{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
