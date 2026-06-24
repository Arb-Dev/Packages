import { useEffect, useId, useRef, useState } from 'react'
import { LayoutGrid } from 'lucide-react'

export interface AppLauncherItem {
  /** Stable key, and the seed for the fallback letter avatar. */
  subdomain: string
  /** Display name shown under the tile. */
  name: string
  /** Where the tile links to (the app's URL). */
  url: string
  /** Optional icon image; falls back to a coloured letter avatar. */
  iconUrl?: string | null
}

export interface AppLauncherProps {
  /** Apps to show in the grid. Mirrors the `/portal/apps` shape. */
  apps: AppLauncherItem[]
  /** Accessible label / tooltip for the trigger button. */
  label?: string
  /** Heading shown at the top of the panel. */
  title?: string
}

// Matches the landing portal's tile palette so avatars look consistent.
const COLORS = ['#7c3aed', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1']
const avatarColor = (s: string) => COLORS[s.charCodeAt(0) % COLORS.length]
const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export function AppLauncher({ apps, label = 'Apps', title = 'Switch app' }: AppLauncherProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="arb-applauncher" ref={rootRef}>
      <button
        type="button"
        className="arb-applauncher-trigger"
        aria-label={label}
        title={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(o => !o)}
      >
        <LayoutGrid size={18} />
      </button>

      {open && (
        <div className="arb-applauncher-panel" id={panelId} role="menu">
          {title && <span className="arb-applauncher-title">{title}</span>}
          {apps.length === 0 ? (
            <p className="arb-applauncher-empty">No apps available.</p>
          ) : (
            <div className="arb-applauncher-grid">
              {apps.map(app => (
                <a
                  key={app.subdomain}
                  href={app.url}
                  className="arb-applauncher-item"
                  role="menuitem"
                >
                  {app.iconUrl ? (
                    <img className="arb-applauncher-icon" src={app.iconUrl} alt="" />
                  ) : (
                    <span
                      className="arb-applauncher-icon arb-applauncher-icon-letter"
                      style={{ background: avatarColor(app.subdomain) }}
                    >
                      {titleCase(app.subdomain)[0]}
                    </span>
                  )}
                  <span className="arb-applauncher-name">{titleCase(app.subdomain)}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
