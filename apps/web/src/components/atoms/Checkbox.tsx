interface CheckboxProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  id: string
}

export function Checkbox({ checked, onChange, label, id }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-brand cursor-pointer"
      />
      <label htmlFor={id} className="text-label text-sm cursor-pointer">
        {label}
      </label>
    </div>
  )
}
