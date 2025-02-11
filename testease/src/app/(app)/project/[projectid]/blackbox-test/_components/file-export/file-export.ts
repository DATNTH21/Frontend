import { TTestcase } from '@/types/test-case';
import { TestCaseExportColumn } from '@/types/user-config';
import * as XLSX from 'xlsx';
export const exportTestCasesToExcel = (
  testCases: TTestcase[],
  template: TestCaseExportColumn[],
  fileName = 'Test_Cases.xlsx'
) => {
  if (!testCases || !template) {
    return;
  }
  // Filter visible fields and sort by order
  const visibleFields = template.filter((col) => col.visible).sort((a, b) => a.order - b.order);

  // Extract field keys and display names
  const fieldKeys = visibleFields.map((col) => col.fieldKey);
  const headers = visibleFields.map((col) => col.displayName);

  // Format test case data
  const formattedData = testCases.map((testCase) =>
    fieldKeys.map((key) => {
      const value = testCase[key];
      if (Array.isArray(value)) {
        return value.join('\n');
      }
      return value !== undefined ? value : '';
    })
  );

  // Sheet data
  const sheetData = [headers, ...formattedData];

  // Create a workbook and sheet
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Test Cases');

  // Export the file
  XLSX.writeFile(workbook, fileName);
};
