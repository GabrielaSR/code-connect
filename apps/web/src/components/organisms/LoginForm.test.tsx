import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('renders email/usuario and password fields', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })
})
