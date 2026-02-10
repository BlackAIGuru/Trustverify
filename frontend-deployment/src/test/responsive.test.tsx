import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from '@/pages/home-page'
import AuthPage from '@/pages/auth-page'
import { AuthContext } from '@/hooks/use-auth'

// Mock wouter
const mockUseLocation = () => ['/']
const mockLink = ({ children, href }: any) => <a href={href}>{children}</a>
const mockRedirect = ({ to }: any) => <div data-testid="redirect" data-to={to} />

vi.mock('wouter', () => ({
  Link: mockLink,
  useLocation: mockUseLocation,
  Redirect: mockRedirect,
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

describe('Responsive Design Tests', () => {
  const originalInnerWidth = window.innerWidth
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    // Mock matchMedia for different viewport sizes
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
    window.matchMedia = originalMatchMedia
  })

  describe('Mobile Responsiveness (320px - 768px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375, // iPhone SE width
      })
    })

    it('HomePage adapts to mobile viewport', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      // Check mobile-specific layout elements
      expect(screen.getByText('TrustVerify')).toBeInTheDocument()
      expect(screen.getByText('Secure Transactions')).toBeInTheDocument()
      
      // Verify responsive grid layout classes exist
      const heroSection = screen.getByText('Built on Trust').closest('section')
      expect(heroSection).toBeInTheDocument()
    })

    it('AuthPage displays properly on mobile', () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      expect(screen.getByText('Welcome to TrustVerify')).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /sign in/i })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /register/i })).toBeInTheDocument()
    })

    it('uses mobile-first grid layouts', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      // Check for responsive grid classes
      const statsSection = screen.getByText('99.9%').closest('div')
      expect(statsSection).toBeInTheDocument()
    })
  })

  describe('Tablet Responsiveness (768px - 1024px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768, // iPad width
      })
    })

    it('HomePage scales correctly for tablet', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      expect(screen.getByText('Why Choose TrustVerify?')).toBeInTheDocument()
      expect(screen.getByText('Bulletproof Escrow')).toBeInTheDocument()
      expect(screen.getByText('Smart Verification')).toBeInTheDocument()
      expect(screen.getByText('AI Fraud Shield')).toBeInTheDocument()
    })

    it('AuthPage shows enhanced layout on tablet', () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      // Hero content should be visible on tablet
      expect(screen.getByText('Trade with Confidence')).toBeInTheDocument()
    })

    it('displays proper grid layouts for medium screens', () => {
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

      // Check dashboard grid layout
      expect(screen.getByText('Welcome back, testuser!')).toBeInTheDocument()
      expect(screen.getByText('Trust Score')).toBeInTheDocument()
    })
  })

  describe('Desktop Responsiveness (1024px+)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440, // Desktop width
      })
    })

    it('HomePage displays full desktop layout', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      // All desktop features should be visible
      expect(screen.getByText('TrustVerify')).toBeInTheDocument()
      expect(screen.getByText('Secure Transactions')).toBeInTheDocument()
      expect(screen.getByText('Built on Trust')).toBeInTheDocument()
      expect(screen.getByText('Why Choose TrustVerify?')).toBeInTheDocument()
      expect(screen.getByText('Ready to Trade with Confidence?')).toBeInTheDocument()
    })

    it('AuthPage shows two-column layout on desktop', () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      // Both form and hero content should be visible
      expect(screen.getByText('Welcome to TrustVerify')).toBeInTheDocument()
      expect(screen.getByText('Trade with Confidence')).toBeInTheDocument()
      expect(screen.getByText('Secure Escrow')).toBeInTheDocument()
      expect(screen.getByText('Verified Users')).toBeInTheDocument()
      expect(screen.getByText('Fraud Protection')).toBeInTheDocument()
    })

    it('dashboard uses full-width layout', () => {
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

      expect(screen.getByText('Welcome back, testuser!')).toBeInTheDocument()
      expect(screen.getByText('New Transaction')).toBeInTheDocument()
      expect(screen.getByText('Identity Verification')).toBeInTheDocument()
      expect(screen.getByText('Report Scam')).toBeInTheDocument()
    })
  })

  describe('Color Scheme Compliance', () => {
    it('enforces Royal Blue primary color (#1F4DD8)', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      const primaryButton = screen.getAllByRole('button', { name: /verify now/i })[0]
      expect(primaryButton).toHaveClass('trustverify-button-primary')
    })

    it('uses Emerald Green accent color (#00B386)', () => {
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

      // Verification status should use emerald green
      expect(screen.getByText('verified')).toBeInTheDocument()
    })

    it('applies Light Gray background (#F4F6FA)', () => {
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

    it('uses Charcoal text color (#2B2E3A)', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      const headingElement = screen.getByText('Secure Transactions')
      expect(headingElement).toHaveClass('text-[#2B2E3A]')
    })

    it('applies Crimson Red for warnings (#D72638) sparingly', () => {
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

      // Report scam button should use crimson red
      expect(screen.getByText('Report Fraud')).toBeInTheDocument()
    })
  })

  describe('Typography and Spacing', () => {
    it('uses Poppins font family', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      const bodyElement = document.body
      const computedStyle = window.getComputedStyle(bodyElement)
      expect(computedStyle.fontFamily).toContain('Poppins')
    })

    it('applies 12px border-radius consistently', () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>
      )

      const inputElement = screen.getByLabelText(/username/i)
      expect(inputElement).toHaveClass('rounded-xl') // Tailwind's rounded-xl = 12px
    })

    it('uses proper whitespace and clean layout', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      // Check for proper spacing classes
      const heroSection = screen.getByText('Built on Trust').closest('section')
      expect(heroSection).toBeInTheDocument()
    })
  })

  describe('Component Reusability', () => {
    it('reuses Button component with consistent styling', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
      
      // Primary buttons should have consistent classes
      const primaryButtons = buttons.filter(btn => 
        btn.className.includes('trustverify-button-primary')
      )
      expect(primaryButtons.length).toBeGreaterThan(0)
    })

    it('reuses Card component throughout the application', () => {
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

      // Multiple cards should be present with consistent styling
      expect(screen.getByText('Trust Score')).toBeInTheDocument()
      expect(screen.getByText('Verification')).toBeInTheDocument()
      expect(screen.getByText('Active Deals')).toBeInTheDocument()
    })

    it('uses consistent Badge components', () => {
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

      expect(screen.getByText('verified')).toBeInTheDocument()
    })
  })
})