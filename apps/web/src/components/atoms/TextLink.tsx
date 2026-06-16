interface TextLinkProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
}

export function TextLink({ href = '#', onClick, children }: TextLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-brand text-sm hover:underline cursor-pointer"
    >
      {children}
    </a>
  )
}
