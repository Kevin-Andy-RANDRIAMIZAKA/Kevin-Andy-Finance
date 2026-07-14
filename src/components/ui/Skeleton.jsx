export default function Skeleton({ className = '', variant = 'rect' }) {
  const base = 'animate-pulse bg-[var(--bg-tertiary)]'
  const shapes = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
  }

  return <div className={`${base} ${shapes[variant]} ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-[var(--radius-card)] p-6 space-y-4">
      <Skeleton className="h-4 w-24" variant="text" />
      <Skeleton className="h-8 w-40" variant="text" />
    </div>
  )
}

export function SkeletonList({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)]">
          <Skeleton className="w-10 h-10" variant="circle" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" variant="text" />
            <Skeleton className="h-3 w-20" variant="text" />
          </div>
          <Skeleton className="h-5 w-16" variant="text" />
        </div>
      ))}
    </div>
  )
}
