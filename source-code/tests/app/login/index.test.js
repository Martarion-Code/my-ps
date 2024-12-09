import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '@/app/login/page.jsx'
import { signIn } from 'next-auth/react';

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signIn: jest.fn()
}));

describe('LoginPage Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the login page correctly', () => {
    render(<LoginPage />);

    // Check page title
    const loginTitle = screen.getByText('Login');
    expect(loginTitle).toBeInTheDocument();

    // Check Google login button
    const googleLoginButton = screen.getByText('Login with Google');
    expect(googleLoginButton).toBeInTheDocument();
  });

  it('calls signIn with google provider when Google login button is clicked', () => {
    render(<LoginPage />);

    // Find and click the Google login button
    const googleLoginButton = screen.getByText('Login with Google');
    fireEvent.click(googleLoginButton);

    // Verify signIn was called with the correct provider
    expect(signIn).toHaveBeenCalledWith('google');
  });

  it('has correct button styling for Google login', () => {
    render(<LoginPage />);

    const googleLoginButton = screen.getByText('Login with Google');
    
    // Check button classes for styling
    expect(googleLoginButton).toHaveClass('bg-red-500');
    expect(googleLoginButton).toHaveClass('text-white');
    expect(googleLoginButton).toHaveClass('rounded-md');
    expect(googleLoginButton).toHaveClass('hover:bg-red-600');
  });

  it('renders the login container with correct layout', () => {
    render(<LoginPage />);

    const loginContainer = screen.getByText('Login').closest('div');
    
    // Check container classes
    expect(loginContainer).toHaveClass('bg-white');
    expect(loginContainer).toHaveClass('rounded-lg');
    expect(loginContainer).toHaveClass('shadow-md');
  });

  it('ensures accessibility of login button', () => {
    render(<LoginPage />);

    const googleLoginButton = screen.getByText('Login with Google');
    
    // Check button is enabled and can be clicked
    expect(googleLoginButton).not.toBeDisabled();
    expect(googleLoginButton).toBeVisible();
  });
});