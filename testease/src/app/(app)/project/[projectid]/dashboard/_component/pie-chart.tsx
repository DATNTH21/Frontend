"use client"

import React from "react";
import { Pie, PieChart, Label, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const chartData = [
  { name: "Passed", value: 438, fill: "#4CAF50" },
  { name: "Failed", value: 16, fill: "#F44336" },
  { name: "Untested", value: 773, fill: "#FF9800" },
  { name: "Blocked", value: 0, fill: "#9E9E9E" },
  { name: "Skipped", value: 0, fill: "#607D8B" },
];

export default function TestPieChart() {
  const totalCases = chartData.reduce((acc, curr) => acc + curr.value, 0);
  
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Test Cases Status</CardTitle>
        <CardDescription>Overview of test cases</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <PieChart width={400} height={400}>
          <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                        {totalCases.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
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
  )
}