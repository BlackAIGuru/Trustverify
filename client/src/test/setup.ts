import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock File and FileReader
global.File = class MockFile {
  name: string
  size: number
  type: string
  
  constructor(bits: any[], name: string, options: any = {}) {
    this.name = name
    this.size = bits.reduce((acc, bit) => acc + (bit?.length || 0), 0)
    this.type = options.type || ''
  }
} as any

global.FileReader = class MockFileReader {
  readAsDataURL = vi.fn()
  addEventListener = vi.fn()
  removeEventListener = vi.fn()
} as any