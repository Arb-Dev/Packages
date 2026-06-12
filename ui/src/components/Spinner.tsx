export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <span className={`arb-spinner${size !== 'md' ? ` arb-spinner-${size}` : ''} ${className}`} />
  )
}

export interface EmptyStateProps {
  title?: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="arb-empty">
      {title && <p className="arb-empty-title">{title}</p>}
      {description && <p className="arb-empty-desc">{description}</p>}
      {action}
    </div>
  )
}
