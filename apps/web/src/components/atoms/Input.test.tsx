import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders with placeholder text', () => {
    render(<Input value="" onChange={() => {}} placeholder="usuario123" />)
    expect(screen.getByPlaceholderText('usuario123')).toBeInTheDocument()
  })
})
