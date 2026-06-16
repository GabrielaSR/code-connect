interface SocialButtonProps {
  iconSrc: string
  label: string
  onClick?: () => void
}

export function SocialButton({ iconSrc, label, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 py-3 px-8 border border-border rounded-lg hover:border-brand transition-colors cursor-pointer bg-transparent"
    >
      <img src={iconSrc} alt="" aria-hidden="true" className="w-7 h-7 object-contain" />
      <span className="text-label text-sm">{label}</span>
    </button>
  )
}
