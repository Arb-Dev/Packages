import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { AppLauncher, type AppLauncherItem } from './AppLauncher'

export interface NavbarProps {
  title?: string
  logoSrc?: string
  /**
   * When set, the brand (home icon + logo + title) becomes a link to the
   * platform home (e.g. `https://home.example.com`).
   */
  homeHref?: string
  /**
   * Apps for the waffle app-launcher menu. Omit (or pass an empty array) to
   * hide the launcher.
   */
  apps?: AppLauncherItem[]
  userName?: string
  userDetail?: string
  onLogout?: () => void
  /** Slot rendered at the right end of the navbar before the user block */
  end?: ReactNode
}

export function Navbar({
  title = 'ARB Platform',
  logoSrc,
  homeHref,
  apps,
  userName,
  userDetail,
  onLogout,
  end,
}: NavbarProps) {
  const brandInner = (
    <>
      {homeHref && <Home size={18} className="arb-navbar-home-icon" aria-hidden />}
      {logoSrc && <img src={logoSrc} alt="" className="arb-navbar-logo" />}
      <h1 className="arb-navbar-title">{title}</h1>
    </>
  )

  return (
    <header className="arb-navbar">
      <div className="arb-navbar-brand">
        {apps && apps.length > 0 && <AppLauncher apps={apps} />}

        {homeHref ? (
          <a href={homeHref} className="arb-navbar-home" aria-label="Platform home">
            {brandInner}
          </a>
        ) : (
          brandInner
        )}
      </div>

      <div className="arb-navbar-end">
        {end}

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
  )
}
