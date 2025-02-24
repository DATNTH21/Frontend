'use client';

import React from 'react';
import { Pie, PieChart, Label, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ProjectOverviewStatistics } from '@/types/project';

const randomColor = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#FF6633',
  '#FF33FF',
  '#33FF33',
  '#33CCFF'
];
export default function TestPieChart({ statistics }: { statistics: ProjectOverviewStatistics }) {
  const { total_test_cases, test_cases_by_status } = statistics;

  const chartData = test_cases_by_status.map(({ status, count }, index) => {
    let fill = '';
    if (status === 'Pass') fill = '#4CAF50';
    else if (status === 'Fail') fill = '#F44336';
    else if (status === 'In Progress') fill = '#FF9800';
    // else if (status === 'Default') fill = '#886c6c';
    else if (status === 'Untested') fill = '#9E9E9E';
    else fill = randomColor[index % randomColor.length];

    return {
      status,
      count,
      fill
    };
  });

  return (
    <Card className='lg:col-span-2'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Test Cases Status</CardTitle>
        <CardDescription>Overview of test cases</CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <PieChart width={400} height={400}>
          <Pie data={chartData} dataKey='count' nameKey='status' innerRadius={60} outerRadius={100} strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                      <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
                        {total_test_cases.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                        Total Cases
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
    </Card>
  );
}
