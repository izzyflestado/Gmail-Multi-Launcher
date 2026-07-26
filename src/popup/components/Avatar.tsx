
const PALETTE = [
  '#1a73e8', 
  '#d93025', 
  '#188038', 
  '#f9ab00', 
  '#8430ce', 
  '#12a4af', 
]

function colorForLabel(label: string): string {
  let hash = 0
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash)
  }
  return PALETTE[Math.abs(hash) % PALETTE.length]
}

function initialsForLabel(label: string): string {
  const trimmed = label.trim()
  if (!trimmed) return '?'
  const parts = trimmed.split(/\s+/)
  if (parts.length === 1) return parts[0][0]!.toUpperCase()
  return (parts[0][0]! + parts[parts.length - 1][0]!).toUpperCase()
}

export function Avatar({ label }: { label: string }) {
  return (
    <div
      className="avatar"
      style={{ backgroundColor: colorForLabel(label || '?') }}
      aria-hidden="true"
    >
      {initialsForLabel(label)}
    </div>
  )
}
