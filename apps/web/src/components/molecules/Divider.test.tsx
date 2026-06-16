import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders divider text', () => {
    render(<Divider text="ou entre com outras contas" />)
    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
  })
})
