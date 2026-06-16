import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SocialButton } from './SocialButton'

describe('SocialButton', () => {
  it('renders with label', () => {
    render(<SocialButton iconSrc="/github.png" label="Github" />)
    expect(screen.getByText('Github')).toBeInTheDocument()
  })
})
