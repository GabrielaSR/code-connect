interface DividerProps {
  text?: string
}

export function Divider({ text }: DividerProps) {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-border" />
      {text && <span className="text-muted text-sm whitespace-nowrap">{text}</span>}
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}
