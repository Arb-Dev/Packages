import { createContext, useContext, useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface SidebarCtxValue {
  collapsed: boolean
  onItemEnter: (label: string, el: HTMLButtonElement) => void
  onItemLeave: () => void
}

const SidebarCtx = createContext<SidebarCtxValue>({
  collapsed: false,
  onItemEnter: () => {},
  onItemLeave: () => {},
})

// ── NavItem ──────────────────────────────────────────────────────────────────

export interface NavItemProps {
  id: string
  label: string
  icon: LucideIcon
  active?: boolean
  badge?: string | number
  onClick: () => void
}

export function NavItem({ label, icon: Icon, active, badge, onClick }: NavItemProps) {
  const { collapsed, onItemEnter, onItemLeave } = useContext(SidebarCtx)

  return (
    <button
      type="button"
      className={`arb-nav-item${active ? ' active' : ''}`}
      onClick={onClick}
      onMouseEnter={e => collapsed && onItemEnter(label, e.currentTarget)}
      onMouseLeave={() => collapsed && onItemLeave()}
    >
      <span className="arb-nav-icon"><Icon size={16} /></span>
      <span className="arb-nav-label">{label}</span>
      {badge != null && (
        <span className="arb-badge arb-badge-primary" style={{ marginLeft: 'auto' }}>
          {badge}
        </span>
      )}
    </button>
  )
}

// ── NavSection ───────────────────────────────────────────────────────────────

export interface NavSectionProps {
  title?: string
  children: ReactNode
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <div>
      {title && <span className="arb-sidebar-section-label">{title}</span>}
      {children}
    </div>
  )
}

// ── Sidebar ──────────────────────────────────────────────────────────────────

export interface SidebarProps {
  children: ReactNode
  defaultCollapsed?: boolean
  /** Controlled collapsed state */
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function Sidebar({
  children,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
  const [tooltip, setTooltip] = useState<{ label: string; top: number; height: number } | null>(null)

  const isControlled = controlledCollapsed !== undefined
  const collapsed = isControlled ? controlledCollapsed! : internalCollapsed

  const toggle = () => {
    const next = !collapsed
    if (!isControlled) setInternalCollapsed(next)
    onCollapsedChange?.(next)
  }

  const onItemEnter = (label: string, el: HTMLButtonElement) => {
    const rect = el.getBoundingClientRect()
    setTooltip({ label, top: rect.top, height: rect.height })
  }

  return (
    <SidebarCtx.Provider value={{ collapsed, onItemEnter, onItemLeave: () => setTooltip(null) }}>
      <aside className={`arb-sidebar${collapsed ? ' collapsed' : ''}`}>
        <nav className="arb-sidebar-nav">{children}</nav>

        <div className="arb-sidebar-footer">
          <button
            type="button"
            className="arb-sidebar-toggle"
            onClick={toggle}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span style={{ fontSize: 11 }}>{collapsed ? '▶' : '◀'}</span>
            <span className="arb-sidebar-toggle-label">{collapsed ? 'Expand' : 'Collapse'}</span>
          </button>
        </div>
      </aside>

      {collapsed && tooltip && (
        <div
          className="arb-sidebar-tooltip"
          style={{ top: tooltip.top + tooltip.height / 2 - 18 }}
        >
          {tooltip.label}
        </div>
      )}
    </SidebarCtx.Provider>
  )
}
