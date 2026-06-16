import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from './Label'

describe('Label', () => {
  it('renders label text', () => {
    render(<Label>Email ou usuário</Label>)
    expect(screen.getByText('Email ou usuário')).toBeInTheDocument()
  })
})
