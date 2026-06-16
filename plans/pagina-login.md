# Plano: Página de Login (Code Connect)

## Contexto

O app `apps/web` é um scaffold limpo do Vite + React 19 + TypeScript — ainda só
tem o boilerplate de demonstração. Precisamos construir a **página de login**
seguindo o layout em anexo (tema escuro com destaque verde, layout em duas
colunas: banner à esquerda, formulário à direita).

O CLAUDE.md exige **Atomic Design** e **Tailwind CSS exclusivo** para estilização,
além de **teste co-localizado** (Vitest + React Testing Library) para cada
componente — mas nada disso está instalado ainda. A página de **cadastro** virá
depois com o **mesmo layout base** (muda só o banner e os campos do formulário),
então a estrutura será desenhada para reuso imediato.

**Decisões do usuário:**
- Formulário **só UI** (estado local + `onSubmit` placeholder, sem chamar a API).
- **Sem roteador** agora — renderizar só o Login no `App.tsx`; links como
  "Crie seu cadastro!" e "Esqueci a senha" ficam visuais/placeholder.
- **Instalar Tailwind + Vitest + RTL** (seguindo o CLAUDE.md).

## Etapa 1 — Setup de ferramentas

### Tailwind CSS (v4, via plugin Vite)
- Instalar em `apps/web`: `tailwindcss` e `@tailwindcss/vite`.
- Registrar o plugin em [apps/web/vite.config.ts](apps/web/vite.config.ts).
- Substituir o conteúdo de [apps/web/src/index.css](apps/web/src/index.css) por
  `@import "tailwindcss";` + um bloco `@theme` com os tokens do tema escuro/verde
  (cores derivadas do layout). Tokens sugeridos:
  - `--color-brand` ≈ `#22c55e` (verde do botão/destaques)
  - `--color-background` ≈ `#1a1a1a`, `--color-surface` ≈ `#2a2a2a` (inputs)
  - `--color-text` ≈ `#e5e5e5`, `--color-muted` ≈ `#a3a3a3`
- Remover [apps/web/src/App.css](apps/web/src/App.css) (boilerplate).

### Vitest + React Testing Library
- Instalar (dev) em `apps/web`: `vitest`, `jsdom`, `@testing-library/react`,
  `@testing-library/jest-dom`, `@testing-library/user-event`.
- Adicionar a config de teste em [apps/web/vite.config.ts](apps/web/vite.config.ts)
  (`test: { environment: 'jsdom', globals: true, setupFiles: './src/setupTests.ts' }`).
- Criar `apps/web/src/setupTests.ts` importando `@testing-library/jest-dom`.
- Adicionar script `"test": "vitest"` no [apps/web/package.json](apps/web/package.json).

## Etapa 2 — Componentes (Atomic Design)

Estrutura nova em `apps/web/src/components/`. Cada pasta tem o `.tsx` + teste
co-localizado (`*.test.tsx`). Regra de import: cada nível só importa de níveis
**abaixo** do seu. Atoms totalmente controlados (sem estado interno além de
foco/hover).

### atoms/
- **Button** — variante primária (verde, largura cheia), aceita `icon` opcional
  (a seta `→` do layout) e `type`. Controlado via props.
- **Input** — input de texto controlado (`value`, `onChange`, `type`,
  `placeholder`). Estilo de fundo cinza do layout.
- **Checkbox** — checkbox controlado (`checked`, `onChange`, `label`) — o
  "Lembrar-me".
- **Label** — rótulo de campo (`htmlFor`, `children`).
- **TextLink** — link de texto estilizado (verde) — "Esqueci a senha",
  "Crie seu cadastro!".

### molecules/
- **FormField** — compõe `Label` + `Input` (e espaço para mensagem de erro
  futura). **Reuso chave**: login e cadastro montam seus campos com este bloco.
- **SocialButton** — imagem do logo (`/github.png`, `/gmail.png`) + texto;
  recebe `iconSrc`, `label`, `onClick`.
- **Divider** — linha com texto centralizado ("ou entre com outras contas").

### organisms/
- **LoginForm** — gerencia o **estado local** do formulário (email/usuário,
  senha, lembrar-me). Compõe: dois `FormField`, a linha "Lembrar-me /
  Esqueci a senha", o `Button` de submit, o `Divider`, os dois `SocialButton`
  (Github/Gmail) e o `TextLink` "Crie seu cadastro!". `onSubmit` chama um
  handler placeholder (ex.: `console.log` / prop opcional).

### templates/
- **AuthTemplate** — o layout base reutilizável. Duas colunas:
  - Esquerda: banner via prop `bannerSrc` + `bannerAlt`, com o logo
    "code connect" sobreposto no rodapé (usar `favicon.svg`/`icons.svg` +
    texto, ou só texto estilizado se o logo não estiver disponível).
  - Direita: `title` ("Login"), `subtitle` ("Boas-vindas! Faça seu login.")
    e um slot `children` para o formulário.
  - É o que login e cadastro vão **compartilhar** (cadastro passa outro banner
    e outro formulário como `children`).

### pages/
- **LoginPage** — conecta `AuthTemplate` (banner `/banner-login.png`, título
  "Login", subtítulo "Boas-vindas! Faça seu login.") com `LoginForm`.

## Etapa 3 — Montagem

- Substituir o conteúdo de [apps/web/src/App.tsx](apps/web/src/App.tsx) para
  renderizar `<LoginPage />`. Remover o boilerplate e os assets de demo não
  usados (`src/assets/hero.png`, etc. — opcional).

## Reuso para o Cadastro (futuro, não implementar agora)

A divisão garante o reuso: a página de cadastro será uma nova `pages/SignupPage`
que reaproveita **`AuthTemplate`** (passando outro banner + título/subtítulo) e
um novo organism **`SignupForm`** montado com os mesmos `FormField` / `Button` /
`TextLink` / `SocialButton`. Nenhum atom/molecule precisará mudar.

## Verificação

1. `pnpm install` na raiz (instala as novas deps do workspace).
2. `pnpm dev:web` → abrir http://localhost:5173 e comparar visualmente com o
   layout: duas colunas, banner à esquerda, campos email/senha, checkbox,
   botão verde, divisor e botões sociais.
3. Interagir: digitar nos campos e marcar "Lembrar-me" (estado controlado
   funcionando); submit dispara o handler placeholder.
4. `cd apps/web && pnpm test` → todos os testes co-localizados passam.
5. `pnpm build:web` → type-check + build sem erros.
6. `cd apps/web && pnpm lint` → sem erros de lint.
