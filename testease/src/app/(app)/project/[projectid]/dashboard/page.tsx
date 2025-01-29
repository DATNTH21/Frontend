'use client'

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const pieData = {
    labels: ["Passed", "Failed", "Untested", "Blocked", "Skipped"],
    datasets: [
      {
        data: [438, 16, 773, 0, 0],
        backgroundColor: [
          "#4CAF50", // Green for Passed
          "#F44336", // Red for Failed
          "#FF9800", // Orange for Untested
          "#9E9E9E", // Gray for Blocked
          "#607D8B", // Blue-Gray for Skipped
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Dashboard</h1>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2">
          {[
            "7D",
            "30D",
            "3M",
            "6M",
            "1Y",
            "All time",
            "Custom",
          ].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-100 focus:ring focus:ring-indigo-200"
            >
              {filter}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:ring focus:ring-indigo-300">
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Test Cases Status
          </h2>
          <div className="flex justify-center">
            <Pie data={pieData} />
          </div>
          <p className="mt-4 text-center text-sm text-blue-600 hover:underline cursor-pointer">
            View All Test Cases
          </p>
        </div>

        {/* Summary Section */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Summary
          </h2>
          <div className="space-y-4">
            {[
              { label: "Total Test Cases Generated", value: 490 },
              { label: "Bug/Defect Report", value: 490 },
              { label: "Test Summary Report", value: 0 },
              { label: "Total Reports", value: 490 },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-600">
                  {item.label}
                </span>
                <span className="text-lg font-bold text-gray-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;