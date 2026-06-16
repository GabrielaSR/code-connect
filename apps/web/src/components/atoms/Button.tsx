interface ButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export function Button({ children, type = 'button', onClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-brand text-background font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
    >
      {children}
    </button>
  )
}
