import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import AllProjectPage from '@/app/all-project/page'; 

describe('AllProjectPage', () => {
  it('should render correctly', () => {
    // Render the component
    render(<AllProjectPage />);

    // Check if the correct text is displayed
    const textElement = screen.getByText(/This is all project page/i);
    expect(textElement).toBeInTheDocument();
  });
});
