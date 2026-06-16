import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormField } from './FormField'

describe('FormField', () => {
  it('renders label associated with input', () => {
    render(<FormField label="Senha" id="password" value="" onChange={() => {}} type="password" />)
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })
})
