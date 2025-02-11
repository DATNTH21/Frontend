"use client"

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SummarySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { label: "Total Scenarios Generated", value: 50 },
            { label: "Total Test Cases Generated", value: 490 },
            { label: "Bug/Defect Report", value: 30 },
            { label: "Test Summary Report", value: 1 },
            { label: "Total Reports", value: 31 },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-sidebar rounded-lg">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-lg font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
