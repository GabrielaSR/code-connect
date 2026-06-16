import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders with label text', () => {
    render(<Checkbox id="remember" checked={false} onChange={() => {}} label="Lembrar-me" />)
    expect(screen.getByLabelText('Lembrar-me')).toBeInTheDocument()
  })
})
