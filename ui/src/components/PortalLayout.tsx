import { useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  active?: boolean
  badge?: string | number
  onClick: () => void
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

export interface PortalLayoutProps {
  /** Application title shown in the navbar */
  title?: string
  /** Logo image src — shown left of title */
  logoSrc?: string
  /** Logged-in user's display name */
  userName?: string
  /** Secondary user detail (role, account, etc.) */
  userDetail?: string
  /** Navigation sections rendered in the sidebar */
  sections: NavSection[]
  /** Content rendered in the right-side main area */
  children: ReactNode
  /** Called when the logout button is clicked. Omit to hide the button. */
  onLogout?: () => void
  /** Extra slot rendered at the right end of the navbar (e.g. notifications) */
  navbarEnd?: ReactNode
}

export function PortalLayout({
  title = 'ARB Platform',
  logoSrc,
  userName,
  userDetail,
  sections,
  children,
  onLogout,
  navbarEnd,
}: PortalLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [tooltip, setTooltip] = useState<{ label: string; top: number; height: number } | null>(null)

  return (
    <div className="arb-shell">
      {/* ── Navbar ── */}
      <header className="arb-navbar">
        <div className="arb-navbar-brand">
          {logoSrc && <img src={logoSrc} alt="" className="arb-navbar-logo" />}
          <h1 className="arb-navbar-title">{title}</h1>
        </div>

        <div className="arb-navbar-end">
          {navbarEnd}

          {(userName || userDetail) && (
            <div className="arb-navbar-user">
              {userName && <span className="arb-navbar-user-name">{userName}</span>}
              {userDetail && <span className="arb-navbar-user-detail">{userDetail}</span>}
            </div>
          )}

          {onLogout && (
            <button type="button" className="arb-navbar-action" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </header>

      {/* ── Body ── */}
      <div className="arb-layout-body">
        {/* ── Sidebar ── */}
        <aside className={`arb-sidebar${collapsed ? ' collapsed' : ''}`}>
          <nav className="arb-sidebar-nav">
            {sections.map((section, i) => (
              <div key={section.title ?? i}>
                {section.title && (
                  <span className="arb-sidebar-section-label">{section.title}</span>
                )}
                {section.items.map(item => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`arb-nav-item${item.active ? ' active' : ''}`}
                      onClick={item.onClick}
                      onMouseEnter={e => {
                        if (collapsed) {
                          const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect()
                          setTooltip({ label: item.label, top: rect.top, height: rect.height })
                        }
                      }}
                      onMouseLeave={() => collapsed && setTooltip(null)}
                    >
                      <span className="arb-nav-icon"><Icon size={16} /></span>
                      <span className="arb-nav-label">{item.label}</span>
                      {item.badge != null && (
                        <span className="arb-badge arb-badge-primary" style={{ marginLeft: 'auto' }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>

          <div className="arb-sidebar-footer">
            <button
              type="button"
              className="arb-sidebar-toggle"
              onClick={() => setCollapsed(c => !c)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <span style={{ fontSize: 11 }}>{collapsed ? '▶' : '◀'}</span>
              <span className="arb-sidebar-toggle-label">{collapsed ? 'Expand' : 'Collapse'}</span>
            </button>
          </div>
        </aside>

        {/* Tooltip when collapsed */}
        {collapsed && tooltip && (
          <div
            className="arb-sidebar-tooltip"
            style={{ top: tooltip.top + tooltip.height / 2 - 18 }}
          >
            {tooltip.label}
          </div>
        )}

        {/* ── Main ── */}
        <main className="arb-main">{children}</main>
      </div>
    </div>
  )
}
