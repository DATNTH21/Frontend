'use client';
import React, { useState } from 'react';
import ExportTemplateTable from './ExportTemplateTable/export-template-table';
import { useUpdateTestCaseExportTemplate, useUserConfig } from '@/api/user-config/user-config';
import { ExportTemplateColumns } from './ExportTemplateTable/export-template-columns';
import { ExampleTestCaseData, TestCaseExportColumn } from '@/types/user-config';
import { VisibilityState } from '@tanstack/react-table';
import { toast } from '@/hooks/use-toast';

const exampleData: ExampleTestCaseData[] = [
  {
    status: 'Passed',
    test_case_id: 'TC-001',
    use_case: 'UC-101',
    name: 'Verify user login with valid credentials',
    objective: 'Ensure that users can successfully log in using valid credentials.',
    pre_condition: 'User must have a registered account with valid credentials.',
    steps: ['Navigate to the login page', 'Enter a valid username and password', "Click the 'Login' button"],
    expected_result: 'User should be redirected to the dashboard after successful login.',
    priority: 'High',
    test_date: '2024-02-10',
    tester: 'John Doe',
    remarks: 'Login successful, session token validated.'
  },
  {
    status: 'Failed',
    test_case_id: 'TC-002',
    use_case: 'UC-102',
    name: 'Verify password reset functionality',
    objective: 'Ensure that users can reset their password using the forgot password feature.',
    pre_condition: 'User must have a registered email linked to their account.',
    steps: [
      "Navigate to the 'Forgot Password' page",
      'Enter a registered email address',
      "Click on the 'Reset Password' button",
      'Check email inbox for the reset link',
      'Click the reset link and set a new password'
    ],
    expected_result: 'User should receive a password reset email and be able to set a new password.',
    priority: 'Medium',
    test_date: '2024-02-10',
    tester: 'Jane Smith',
    remarks: 'Reset email was not received within 15 minutes.'
  },
  {
    status: 'Blocked',
    test_case_id: 'TC-003',
    use_case: 'UC-103',
    name: 'Verify adding a product to the cart',
    objective: 'Ensure that users can add a product to the shopping cart successfully.',
    pre_condition: 'User must be logged in and viewing a product page.',
    steps: [
      'Navigate to a product page',
      "Click on the 'Add to Cart' button",
      'Open the cart page to check if the item is added'
    ],
    expected_result: 'The product should be successfully added to the cart with correct details.',
    priority: 'High',
    test_date: '2024-02-10',
    tester: 'Michael Lee',
    remarks: 'Test blocked due to database connectivity issues.'
  }
];

export default function TestCaseExportConfiguration() {
  const { data: userConfigResponse, status } = useUserConfig();
  const updateTemplateMutation = useUpdateTestCaseExportTemplate({
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Update export template successfully'
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Update export template failed',
        description: error.message
      });
    }
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    userConfigResponse?.data?.testCaseExportTemplate.reduce((acc, field) => {
      acc[field.fieldKey] = field.visible;
      return acc;
    }, {} as VisibilityState) || {}
  );
  const [columnDisplayName, setColumnDisplayName] = useState<Record<string, string>>(
    userConfigResponse?.data?.testCaseExportTemplate.reduce(
      (acc, field) => {
        acc[field.fieldKey] = field.displayName;
        return acc;
      },
      {} as Record<string, string>
    ) || {}
  );

  const columns = ExportTemplateColumns(
    userConfigResponse?.data?.testCaseExportTemplate || [],
    columnDisplayName,
    setColumnDisplayName
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    userConfigResponse?.data?.testCaseExportTemplate?.sort((a, b) => a.order - b.order).map((col) => col.fieldKey) || []
  );

  const handleSaveTemplate = () => {
    console.log('Column display name: ', columnDisplayName);
    console.log('Column visibility: ', columnVisibility);
    console.log('Column order: ', columnOrder);

    if (!userConfigResponse?.data?.testCaseExportTemplate) {
      console.error('No template data available.');
      return;
    }

    const template: TestCaseExportColumn[] = columnOrder.map((field, index) => {
      return {
        fieldKey: field as TestCaseExportColumn['fieldKey'],
        displayName: columnDisplayName[field] || field,
        order: index,
        visible: columnVisibility[field] ?? true
      };
    });

    console.log('Export template: ', template);
    updateTemplateMutation.mutate(template);
  };

  return status == 'success' && userConfigResponse.data?.testCaseExportTemplate ? (
    <ExportTemplateTable
      columns={columns}
      data={exampleData}
      columnVisibility={columnVisibility}
      setColumnVisibility={setColumnVisibility}
      columnOrder={columnOrder}
      setColumnOrder={setColumnOrder}
      onTemplateSave={handleSaveTemplate}
    />
  ) : (
    <div>No data for template</div>
  );
}
