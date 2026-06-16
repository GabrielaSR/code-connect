import { LoginForm } from '../organisms/LoginForm'
import { AuthTemplate } from '../templates/AuthTemplate'

export function LoginPage() {
  return (
    <AuthTemplate
      bannerSrc="/banner-login.png"
      bannerAlt="Pessoa trabalhando no computador"
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
    >
      <LoginForm />
    </AuthTemplate>
  )
}
