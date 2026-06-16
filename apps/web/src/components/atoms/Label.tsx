interface LabelProps {
  htmlFor?: string
  children: React.ReactNode
}

export function Label({ htmlFor, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-label text-sm block mb-1">
      {children}
    </label>
  )
}
