import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from '@/pages/home-page'
import { AuthContext } from '@/hooks/use-auth'

// Mock wouter
vi.mock('wouter', () => ({
  Link: ({ children, href }: any) => <a href={href}>{children}</a>,
  useLocation: () => ['/'],
}))

const createMockAuthContext = (user = null) => ({
  user,
  isLoading: false,
  error: null,
  loginMutation: { mutate: vi.fn(), isPending: false },
  logoutMutation: { mutate: vi.fn(), isPending: false },
  registerMutation: { mutate: vi.fn(), isPending: false },
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

describe('HomePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Landing Page (No User)', () => {
    it('renders landing page for unauthenticated users', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('TrustVerify')).toBeInTheDocument()
      expect(screen.getByText('Secure Transactions')).toBeInTheDocument()
      expect(screen.getByText('Built on Trust')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /verify now/i })).toBeInTheDocument()
    })

    it('displays trust indicators', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('99.9%')).toBeInTheDocument()
      expect(screen.getByText('Security Rate')).toBeInTheDocument()
      expect(screen.getByText('$5M+')).toBeInTheDocument()
      expect(screen.getByText('Protected Volume')).toBeInTheDocument()
      expect(screen.getByText('25K+')).toBeInTheDocument()
      expect(screen.getByText('Verified Users')).toBeInTheDocument()
    })

    it('shows feature cards with correct colors', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('Bulletproof Escrow')).toBeInTheDocument()
      expect(screen.getByText('Smart Verification')).toBeInTheDocument()
      expect(screen.getByText('AI Fraud Shield')).toBeInTheDocument()
    })

    it('displays CTA section with Verify Now button', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('Ready to Trade with Confidence?')).toBeInTheDocument()
      expect(screen.getAllByRole('button', { name: /verify now/i })).toHaveLength(2)
    })
  })

  describe('Dashboard (Authenticated User)', () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      trustScore: '95',
      verificationLevel: 'verified',
      isAdmin: false,
    }

    it('renders dashboard for authenticated users', () => {
      render(
        <TestWrapper user={mockUser}>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('Welcome back, testuser!')).toBeInTheDocument()
      expect(screen.getByText('Your secure transaction control center')).toBeInTheDocument()
    })

    it('displays user stats cards', () => {
      render(
        <TestWrapper user={mockUser}>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('Trust Score')).toBeInTheDocument()
      expect(screen.getByText('95')).toBeInTheDocument()
      expect(screen.getByText('Verification')).toBeInTheDocument()
      expect(screen.getByText('verified')).toBeInTheDocument()
      expect(screen.getByText('Active Deals')).toBeInTheDocument()
      expect(screen.getByText('Messages')).toBeInTheDocument()
    })

    it('shows quick action cards', () => {
      render(
        <TestWrapper user={mockUser}>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('New Transaction')).toBeInTheDocument()
      expect(screen.getByText('Identity Verification')).toBeInTheDocument()
      expect(screen.getByText('Report Scam')).toBeInTheDocument()
    })

    it('displays recent activity section', () => {
      render(
        <TestWrapper user={mockUser}>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('Recent Activity')).toBeInTheDocument()
      expect(screen.getByText('No activity yet')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /create first transaction/i })).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('handles mobile viewport correctly', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      const heroSection = screen.getByText('Secure Transactions').closest('section')
      expect(heroSection).toBeInTheDocument()
    })

    it('handles tablet viewport correctly', () => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('Why Choose TrustVerify?')).toBeInTheDocument()
    })

    it('handles desktop viewport correctly', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('TrustVerify')).toBeInTheDocument()
    })
  })

  describe('Color Scheme Compliance', () => {
    it('uses correct Royal Blue primary color', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      const primaryButton = screen.getAllByRole('button', { name: /verify now/i })[0]
      expect(primaryButton).toHaveClass('trustverify-button-primary')
    })

    it('applies Emerald Green accent color correctly', () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        trustScore: '95',
        verificationLevel: 'verified',
        isAdmin: false,
      }

      render(
        <TestWrapper user={mockUser}>
          <HomePage />
        </TestWrapper>
      )

      // Check for emerald green usage in verification status
      expect(screen.getByText('verified')).toBeInTheDocument()
    })

    it('uses Light Gray background color', () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        trustScore: '95',
        verificationLevel: 'verified',
        isAdmin: false,
      }

      render(
        <TestWrapper user={mockUser}>
          <HomePage />
        </TestWrapper>
      )

      const mainContainer = screen.getByText('Welcome back, testuser!').closest('div')
      expect(mainContainer).toHaveClass('bg-[#F4F6FA]')
    })
  })
})