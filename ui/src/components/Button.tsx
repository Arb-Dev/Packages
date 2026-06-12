import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Renders as a square icon-only button */
  iconOnly?: boolean
  children?: ReactNode
}

export function Button({
  variant = 'secondary',
  size = 'md',
  iconOnly = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const cls = [
    'arb-btn',
    `arb-btn-${variant}`,
    `arb-btn-${size}`,
    iconOnly ? 'arb-btn-icon' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  )
}
