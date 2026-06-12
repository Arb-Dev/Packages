import type { ReactNode } from 'react'

export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: ReactNode
}

export function Badge({ variant = 'neutral', className = '', children }: BadgeProps) {
  return (
    <span className={`arb-badge arb-badge-${variant} ${className}`}>
      {children}
    </span>
  )
}
