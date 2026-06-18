import type { ComponentPropsWithoutRef, ReactNode } from 'react'

// ── Table ────────────────────────────────────────────────────────────────────

export interface TableProps extends ComponentPropsWithoutRef<'table'> {}

export function Table({ className = '', ...props }: TableProps) {
  return (
    <div className="arb-table-wrap">
      <table className={`arb-table ${className}`.trim()} {...props} />
    </div>
  )
}

// ── Thead ────────────────────────────────────────────────────────────────────

export interface TheadProps extends ComponentPropsWithoutRef<'thead'> {}

export function Thead({ className = '', ...props }: TheadProps) {
  return <thead className={`arb-thead ${className}`.trim()} {...props} />
}

// ── Tbody ────────────────────────────────────────────────────────────────────

export interface TbodyProps extends ComponentPropsWithoutRef<'tbody'> {}

export function Tbody({ className = '', ...props }: TbodyProps) {
  return <tbody className={`arb-tbody ${className}`.trim()} {...props} />
}

// ── Tr ──────────────────────────────────────────────────────────────────────

export interface TrProps extends ComponentPropsWithoutRef<'tr'> {}

export function Tr({ className = '', onClick, ...props }: TrProps) {
  const cls = ['arb-tr', onClick ? 'arb-tr-clickable' : '', className].filter(Boolean).join(' ')
  return <tr className={cls} onClick={onClick} {...props} />
}

// ── Th ──────────────────────────────────────────────────────────────────────

export interface ThProps extends ComponentPropsWithoutRef<'th'> {}

export function Th({ className = '', ...props }: ThProps) {
  return <th className={`arb-th ${className}`.trim()} {...props} />
}

// ── Td ──────────────────────────────────────────────────────────────────────

export interface TdProps extends ComponentPropsWithoutRef<'td'> {
  /** Secondary text color and slightly smaller font */
  dim?: boolean
  /** Tabular-nums, monospace spacing */
  mono?: boolean
}

export function Td({ dim, mono, className = '', ...props }: TdProps) {
  const cls = [
    'arb-td',
    dim  ? 'arb-td-dim'  : '',
    mono ? 'arb-td-mono' : '',
    className,
  ].filter(Boolean).join(' ')
  return <td className={cls} {...props} />
}

// ── CellStack ────────────────────────────────────────────────────────────────

export interface CellStackProps {
  /** Primary line — bold */
  title: ReactNode
  /** Optional secondary line — muted, smaller */
  subtitle?: ReactNode
}

/** Renders a title + subtitle stacked inside a single cell. */
export function CellStack({ title, subtitle }: CellStackProps) {
  return (
    <div>
      <div className="arb-cell-stack-title">{title}</div>
      {subtitle && <div className="arb-cell-stack-sub">{subtitle}</div>}
    </div>
  )
}
