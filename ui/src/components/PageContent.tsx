import type { ReactNode } from 'react'

export interface PageContentProps {
  title?: string
  /** Buttons or controls rendered to the right of the title */
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export function PageContent({ title, actions, children, className = '' }: PageContentProps) {
  return (
    <div className={`arb-page ${className}`}>
      {(title || actions) && (
        <div className="arb-page-header">
          {title && <h2 className="arb-page-title">{title}</h2>}
          {actions && <div className="arb-page-actions">{actions}</div>}
        </div>
      )}
      <div className="arb-page-body">{children}</div>
    </div>
  )
}
