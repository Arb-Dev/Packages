import type { ReactNode } from 'react'

export interface NavbarProps {
  title?: string
  logoSrc?: string
  userName?: string
  userDetail?: string
  onLogout?: () => void
  /** Slot rendered at the right end of the navbar before the user block */
  end?: ReactNode
}

export function Navbar({
  title = 'ARB Platform',
  logoSrc,
  userName,
  userDetail,
  onLogout,
  end,
}: NavbarProps) {
  return (
    <header className="arb-navbar">
      <div className="arb-navbar-brand">
        {logoSrc && <img src={logoSrc} alt="" className="arb-navbar-logo" />}
        <h1 className="arb-navbar-title">{title}</h1>
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
