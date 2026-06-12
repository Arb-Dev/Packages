import type { ReactNode } from 'react'

export interface DataPanelProps {
  /** Optional toolbar rendered above the content */
  toolbar?: ReactNode
  children: ReactNode
  className?: string
}

export function DataPanel({ toolbar, children, className = '' }: DataPanelProps) {
  return (
    <div className={`arb-data-panel ${className}`}>
      {toolbar && <div className="arb-data-panel-toolbar">{toolbar}</div>}
      <div className="arb-data-panel-body">{children}</div>
    </div>
  )
}
