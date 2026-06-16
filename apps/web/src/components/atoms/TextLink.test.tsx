import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TextLink } from './TextLink'

describe('TextLink', () => {
  it('renders link text', () => {
    render(<TextLink href="#">Esqueci a senha</TextLink>)
    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toBeInTheDocument()
  })
})
