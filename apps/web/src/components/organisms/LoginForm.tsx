import { useState } from 'react'
import { Button } from '../atoms/Button'
import { Checkbox } from '../atoms/Checkbox'
import { TextLink } from '../atoms/TextLink'
import { Divider } from '../molecules/Divider'
import { FormField } from '../molecules/FormField'
import { SocialButton } from '../molecules/SocialButton'

interface LoginFormProps {
  onSubmit?: (data: { identifier: string; password: string; rememberMe: boolean }) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ identifier, password, rememberMe })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormField
        label="Email ou usuário"
        id="identifier"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="usuario123"
      />

      <FormField
        label="Senha"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••"
      />

      <div className="flex items-center justify-between">
        <Checkbox
          id="remember"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          label="Lembrar-me"
        />
        <TextLink href="#">Esqueci a senha</TextLink>
      </div>

      <Button type="submit">Login →</Button>

      <Divider text="ou entre com outras contas" />

      <div className="flex justify-center gap-4">
        <SocialButton iconSrc="/github.png" label="Github" />
        <SocialButton iconSrc="/gmail.png" label="Gmail" />
      </div>

      <p className="text-center text-muted text-sm mt-2">
        Ainda não tem conta?{' '}
        <TextLink href="#">Crie seu cadastro! 🗒️</TextLink>
      </p>
    </form>
  )
}
