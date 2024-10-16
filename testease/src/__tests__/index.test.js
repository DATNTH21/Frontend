import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '@/app/(auth)/login/page'; 

describe('Login Component', () => {
  it('should render the login form', () => {
    render(<Login />);
    expect(screen.getByText('Account Login')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText('Remember me')).toBeInTheDocument();
  });

  it('should toggle password visibility', () => {
    render(<Login />);
    
    // Initially password should be hidden
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Simulate clicking the toggle button to show password
    const toggleButton = screen.getByRole('button', { name: /PasswordShow/i });
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Simulate clicking the toggle button to hide password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should update the email and password fields on input', () => {
    render(<Login />);
    
    // Check email input change
    const emailInput = screen.getByLabelText(/Email address/i);
    fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
    expect(emailInput.value).toBe('newemail@example.com');

    // Check password input change
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
    expect(passwordInput.value).toBe('newpassword');
  });

  it('should render the social login buttons', () => {
    render(<Login />);
    
    // Check if the Google and GitHub buttons are rendered
    const googleButton = screen.getByRole('button', { name: /Google/i });
    const githubButton = screen.getByRole('button', { name: /Github/i });
    
    expect(googleButton).toBeInTheDocument();
    expect(githubButton).toBeInTheDocument();
  });
});
function expect(arg0) {
  throw new Error('Function not implemented.');
}

