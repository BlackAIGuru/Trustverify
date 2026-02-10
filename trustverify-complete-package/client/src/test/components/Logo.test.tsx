import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Logo } from '@/components/logo'

describe('Logo Component', () => {
  it('renders with default props', () => {
    render(<Logo />)
    
    expect(screen.getByText('TrustVerify')).toBeInTheDocument()
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument() // Lucide icons have role="img"
  })

  it('renders without text when showText is false', () => {
    render(<Logo showText={false} />)
    
    expect(screen.queryByText('TrustVerify')).not.toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<Logo size="sm" />)
    expect(screen.getByText('TrustVerify')).toHaveClass('text-lg')

    rerender(<Logo size="md" />)
    expect(screen.getByText('TrustVerify')).toHaveClass('text-xl')

    rerender(<Logo size="lg" />)
    expect(screen.getByText('TrustVerify')).toHaveClass('text-3xl')
  })

  it('applies custom className', () => {
    render(<Logo className="custom-class" />)
    
    const logoContainer = screen.getByText('TrustVerify').closest('div')
    expect(logoContainer).toHaveClass('custom-class')
  })

  it('uses correct color scheme', () => {
    render(<Logo />)
    
    const logoText = screen.getByText('TrustVerify')
    expect(logoText).toHaveClass('text-[#2B2E3A]')
  })
})