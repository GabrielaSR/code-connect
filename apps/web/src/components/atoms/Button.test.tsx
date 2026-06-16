import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders button text', () => {
    render(<Button>Login →</Button>)
    expect(screen.getByRole('button', { name: 'Login →' })).toBeInTheDocument()
  })
})
