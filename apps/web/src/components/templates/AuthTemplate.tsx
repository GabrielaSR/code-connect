// Converte o PNG (correntes cinzas em fundo branco) para correntes #132E35 em fundo transparente:
// invert: fundo branco→preto, correntes→claras | sepia+hue-rotate: adiciona teal 192° |
// saturate+brightness: ajusta para #132E35 | mix-blend-screen: fundo preto some no bg escuro
const watermarkStyle: React.CSSProperties = {
  filter: 'invert(1) sepia(1) hue-rotate(154deg) saturate(2.6) brightness(0.33)',
}

interface AuthTemplateProps {
  bannerSrc: string
  bannerAlt: string
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthTemplate({ bannerSrc, bannerAlt, title, subtitle, children }: AuthTemplateProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Watermark superior-esquerdo */}
      <img
        src="/watermark.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-16 -left-16 w-[420px] pointer-events-none select-none mix-blend-screen"
        style={watermarkStyle}
      />
      {/* Watermark inferior-direito */}
      <img
        src="/watermark.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-16 -right-16 w-[420px] pointer-events-none select-none mix-blend-screen"
        style={watermarkStyle}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[640px] mx-6 flex rounded-2xl overflow-hidden shadow-2xl">
        {/* Banner lateral */}
        <div className="relative w-[40%] flex-shrink-0 min-h-[480px]">
          <img
            src={bannerSrc}
            alt={bannerAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <img src="/favicon.svg" alt="" aria-hidden="true" className="w-6 h-6" />
            <div className="text-white font-semibold text-xs leading-tight">
              <div>code</div>
              <div>connect</div>
            </div>
          </div>
        </div>

        {/* Área do formulário */}
        <div className="flex-1 flex items-center justify-center bg-surface px-7 py-8">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-heading mb-1">{title}</h1>
            <p className="text-label text-sm mb-5">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
