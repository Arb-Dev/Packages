import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { AppShell } from './AppShell'
import { Navbar } from './Navbar'
import type { AppLauncherItem } from './AppLauncher'
import { Sidebar, NavSection, NavItem } from './Sidebar'

export interface PortalLayoutNavItem {
  id: string
  label: string
  icon: LucideIcon
  active?: boolean
  badge?: string | number
  onClick: () => void
}

export interface PortalLayoutNavSection {
  title?: string
  items: PortalLayoutNavItem[]
}

export interface PortalLayoutProps {
  title?: string
  logoSrc?: string
  /** Link target for the brand/home affordance (the platform home). */
  homeHref?: string
  /** Apps for the waffle app-launcher menu in the navbar. */
  apps?: AppLauncherItem[]
  userName?: string
  userDetail?: string
  sections: PortalLayoutNavSection[]
  children: ReactNode
  onLogout?: () => void
  navbarEnd?: ReactNode
}

export function PortalLayout({
  title,
  logoSrc,
  homeHref,
  apps,
  userName,
  userDetail,
  sections,
  children,
  onLogout,
  navbarEnd,
}: PortalLayoutProps) {
  return (
    <AppShell
      navbar={
        <Navbar
          title={title}
          logoSrc={logoSrc}
          homeHref={homeHref}
          apps={apps}
          userName={userName}
          userDetail={userDetail}
          onLogout={onLogout}
          end={navbarEnd}
        />
      }
      sidebar={
        <Sidebar>
          {sections.map((section, i) => (
            <NavSection key={section.title ?? i} title={section.title}>
              {section.items.map(item => (
                <NavItem key={item.id} {...item} />
              ))}
            </NavSection>
          ))}
        </Sidebar>
      }
    >
      {children}
    </AppShell>
  )
}
