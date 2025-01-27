import { ApiResponse } from '@/types/response';
import { NextResponse } from 'next/server';

export async function POST() {
  const htmlContent = `
    <div>
      <h1>Hello, World!</h1>
      <p>This is some HTML content.</p>
    </div>
  `;

  const response: ApiResponse<{ description: string }> = {
    status: 'success',
    message: 'HTML content successfully generated',
    data: {
      description: htmlContent
    }
  };
  return NextResponse.json(response);
}
