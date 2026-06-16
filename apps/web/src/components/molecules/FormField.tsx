import { Input } from '../atoms/Input'
import { Label } from '../atoms/Label'

interface FormFieldProps {
  label: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
}

export function FormField({ label, id, value, onChange, type = 'text', placeholder }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}
