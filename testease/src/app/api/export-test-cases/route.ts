import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { TTestcase } from '@/types/test-case';
import { TestCaseExportColumn } from '@/types/user-config';

interface ExportRequestBody {
  testCases: TTestcase[];
  template: TestCaseExportColumn[];
  fileName?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { testCases, template, fileName = 'Test_Cases.xlsx' } = (await req.json()) as ExportRequestBody;

    if (!testCases || !template) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // // Read template file
    // const templatePath = path.join(process.cwd(), 'public', 'template', 'test-cases-template.xlsx');
    // const templateExists = await fs.stat(templatePath).catch(() => null);

    // if (!templateExists) {
    //   return NextResponse.json({ error: 'Template file not found' }, { status: 404 });
    // }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Test Cases');
    //await workbook.xlsx.readFile(templatePath);

    // const worksheet = workbook.getWorksheet('Test cases');
    // if (!worksheet) {
    //   return NextResponse.json({ error: 'Worksheet not found' }, { status: 500 });
    // }

    // Extract visible fields
    const visibleFields = template.filter((col) => col.visible).sort((a, b) => a.order - b.order);
    const fieldKeys = visibleFields.map((col) => col.fieldKey);

    const tableColumns = visibleFields.map((col) => ({
      name: col.displayName,
      filterButton: false
    }));

    const tableRows = testCases.map((testCase) =>
      fieldKeys.map((key) => {
        const value = testCase[key as keyof TTestcase];
        return Array.isArray(value) ? value.map((step, index) => `${index + 1}. ${step}`).join('\n') : value || '';
      })
    );

    worksheet.addTable({
      name: 'TestCaseTable',
      ref: 'A1',
      headerRow: true,
      style: {
        theme: 'TableStyleMedium9',
        showRowStripes: true
      },
      columns: tableColumns,
      rows: tableRows
    });

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4f81bd' } // Dark blue
      };
      cell.font = { color: { argb: 'FFFFFF' }, bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    });

    for (let i = 2; i <= testCases.length + 1; i++) {
      const row = worksheet.getRow(i);
      row.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: i % 2 === 0 ? 'b8cce4' : 'dbe5f1' } // Even: medium blue, Odd: light blue
        };
        cell.alignment = { wrapText: true, vertical: 'top', horizontal: 'left' };
      });
    }

    worksheet.columns.forEach((col) => {
      col.width = 30;
    });

    // Generate file buffer
    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`
      }
    });
  } catch (error) {
    console.error('Error generating Excel:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
