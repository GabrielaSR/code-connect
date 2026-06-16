import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AuthTemplate } from './AuthTemplate'

describe('AuthTemplate', () => {
  it('renders title and children content', () => {
    render(
      <AuthTemplate
        bannerSrc="/banner-login.png"
        bannerAlt="Banner"
        title="Login"
        subtitle="Boas-vindas! Faça seu login."
      >
        <p>Form content</p>
      </AuthTemplate>,
    )
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText('Form content')).toBeInTheDocument()
  })
})
