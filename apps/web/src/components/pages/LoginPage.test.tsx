import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('renders login heading and form fields', () => {
    render(<LoginPage />)
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })
})
