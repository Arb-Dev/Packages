import type { ReactNode } from 'react'

export interface AppShellProps {
  navbar: ReactNode
  sidebar: ReactNode
  children: ReactNode
}

export function AppShell({ navbar, sidebar, children }: AppShellProps) {
  return (
    <div className="arb-shell">
      {navbar}
      <div className="arb-layout-body">
        {sidebar}
        <main className="arb-main">{children}</main>
      </div>
    </div>
  )
}
