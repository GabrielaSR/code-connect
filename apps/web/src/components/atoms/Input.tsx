interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
  id?: string
  name?: string
}

export function Input({ value, onChange, type = 'text', placeholder, id, name }: InputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:border-brand transition-colors"
    />
  )
}
