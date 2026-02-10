import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthPage from '@/pages/auth-page'
import { AuthContext } from '@/hooks/use-auth'

// Mock wouter
vi.mock('wouter', () => ({
  Redirect: ({ to }: any) => <div data-testid="redirect" data-to={to} />,
}))

const createMockAuthContext = (user = null) => ({
  user,
  isLoading: false,
  error: null,
  loginMutation: { 
    mutate: vi.fn(), 
    isPending: false,
    isError: false,
    error: null
  },
  logoutMutation: { mutate: vi.fn(), isPending: false },
  registerMutation: { 
    mutate: vi.fn(), 
    isPending: false,
    isError: false,
    error: null
  },
})

const TestWrapper = ({ children, user = null }: any) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={createMockAuthContext(user)}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  )
}

describe('AuthPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Authentication Form', () => {
    it('renders login and register tabs', () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      expect(screen.getByRole('tab', { name: /sign in/i })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /register/i })).toBeInTheDocument()
    })

    it('displays TrustVerify logo and branding', () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      expect(screen.getByText('TrustVerify')).toBeInTheDocument()
      expect(screen.getByText('Welcome to TrustVerify')).toBeInTheDocument()
      expect(screen.getByText('Secure transactions, verified users, fraud-free trading')).toBeInTheDocument()
    })

    it('shows login form by default', () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('switches to register form when register tab is clicked', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      await user.click(screen.getByRole('tab', { name: /register/i }))

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
    })
  })

  describe('Login Functionality', () => {
    it('handles login form submission', async () => {
      const user = userEvent.setup()
      const mockLogin = vi.fn()
      
      const mockAuthContext = {
        ...createMockAuthContext(),
        loginMutation: { 
          mutate: mockLogin, 
          isPending: false,
          isError: false,
          error: null
        }
      }

      render(
        <QueryClientProvider client={new QueryClient()}>
          <AuthContext.Provider value={mockAuthContext}>
            <AuthPage />
          </AuthContext.Provider>
        </QueryClientProvider>
      )

      await user.type(screen.getByLabelText(/username/i), 'testuser')
      await user.type(screen.getByLabelText(/password/i), 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))

      expect(mockLogin).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123'
      })
    })

    it('displays loading state during login', () => {
      const mockAuthContext = {
        ...createMockAuthContext(),
        loginMutation: { 
          mutate: vi.fn(), 
          isPending: true,
          isError: false,
          error: null
        }
      }

      render(
        <QueryClientProvider client={new QueryClient()}>
          <AuthContext.Provider value={mockAuthContext}>
            <AuthPage />
          </AuthContext.Provider>
        </QueryClientProvider>
      )

      expect(screen.getByRole('button', { name: /signing in.../i })).toBeInTheDocument()
    })
  })

  describe('Registration Functionality', () => {
    it('handles registration form submission', async () => {
      const user = userEvent.setup()
      const mockRegister = vi.fn()
      
      const mockAuthContext = {
        ...createMockAuthContext(),
        registerMutation: { 
          mutate: mockRegister, 
          isPending: false,
          isError: false,
          error: null
        }
      }

      render(
        <QueryClientProvider client={new QueryClient()}>
          <AuthContext.Provider value={mockAuthContext}>
            <AuthPage />
          </AuthContext.Provider>
        </QueryClientProvider>
      )

      await user.click(screen.getByRole('tab', { name: /register/i }))
      await user.type(screen.getByLabelText(/username/i), 'newuser')
      await user.type(screen.getByLabelText(/email/i), 'new@example.com')
      await user.type(screen.getByLabelText(/password/i), 'password123')
      await user.click(screen.getByRole('button', { name: /create account/i }))

      expect(mockRegister).toHaveBeenCalledWith({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123'
      })
    })

    it('displays loading state during registration', async () => {
      const user = userEvent.setup()
      
      const mockAuthContext = {
        ...createMockAuthContext(),
        registerMutation: { 
          mutate: vi.fn(), 
          isPending: true,
          isError: false,
          error: null
        }
      }

      render(
        <QueryClientProvider client={new QueryClient()}>
          <AuthContext.Provider value={mockAuthContext}>
            <AuthPage />
          </AuthContext.Provider>
        </QueryClientProvider>
      )

      await user.click(screen.getByRole('tab', { name: /register/i }))

      expect(screen.getByRole('button', { name: /creating account.../i })).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('validates required fields in login form', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      await user.click(screen.getByRole('button', { name: /sign in/i }))

      await waitFor(() => {
        expect(screen.getByText(/username/i)).toBeInTheDocument()
        expect(screen.getByText(/password/i)).toBeInTheDocument()
      })
    })

    it('validates email format in registration form', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      await user.click(screen.getByRole('tab', { name: /register/i }))
      await user.type(screen.getByLabelText(/email/i), 'invalid-email')
      await user.click(screen.getByRole('button', { name: /create account/i }))

      await waitFor(() => {
        expect(screen.getByText(/valid email/i)).toBeInTheDocument()
      })
    })
  })

  describe('Design System Compliance', () => {
    it('uses correct color scheme', () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      const signInButton = screen.getByRole('button', { name: /sign in/i })
      expect(signInButton).toHaveClass('trustverify-button-primary')
    })

    it('applies proper border radius (12px)', () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      const usernameInput = screen.getByLabelText(/username/i)
      expect(usernameInput).toHaveClass('rounded-xl')
    })

    it('uses Poppins font family', () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      const container = screen.getByText('Welcome to TrustVerify').closest('div')
      expect(getComputedStyle(container!).fontFamily).toContain('Poppins')
    })
  })

  describe('Responsive Design', () => {
    it('adapts to mobile viewport (375px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      const form = screen.getByRole('button', { name: /sign in/i }).closest('form')
      expect(form).toBeInTheDocument()
    })

    it('adapts to tablet viewport (768px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })

      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      expect(screen.getByText('Trade with Confidence')).toBeInTheDocument()
    })

    it('shows hero content on desktop viewport (1024px+)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })

      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      expect(screen.getByText('Trade with Confidence')).toBeInTheDocument()
      expect(screen.getByText('Secure Escrow')).toBeInTheDocument()
      expect(screen.getByText('Verified Users')).toBeInTheDocument()
      expect(screen.getByText('Fraud Protection')).toBeInTheDocument()
    })
  })

  describe('User Redirection', () => {
    it('redirects authenticated users to home page', () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        trustScore: '95',
        verificationLevel: 'verified',
        isAdmin: false,
      }

      render(
        <TestWrapper user={mockUser}>
          <AuthPage />
        </TestWrapper>
      )

      expect(screen.getByTestId('redirect')).toHaveAttribute('data-to', '/')
    })
  })
})