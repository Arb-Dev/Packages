import type { Meta, StoryObj } from '@storybook/react-vite'
import { Users, Settings, LayoutDashboard, FileText, Bell } from 'lucide-react'
import { PortalLayout } from '../components/PortalLayout'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'

const meta: Meta<typeof PortalLayout> = {
  title: 'Components/PortalLayout',
  component: PortalLayout,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PortalLayout>

const defaultSections = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true, onClick: () => {} },
      { id: 'employees', label: 'Employees', icon: Users, badge: 24, onClick: () => {} },
      { id: 'documents', label: 'Documents', icon: FileText, onClick: () => {} },
    ],
  },
  {
    title: 'Admin',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings, onClick: () => {} },
    ],
  },
]

export const Default: Story = {
  args: {
    title: 'ARB Platform',
    userName: 'Jane Smith',
    userDetail: 'Admin',
    sections: defaultSections,
    onLogout: () => {},
    children: (
      <div style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Dashboard</h2>
        <p style={{ color: 'var(--arb-text-secondary)' }}>Main content area.</p>
      </div>
    ),
  },
}

export const WithNavbarEnd: Story = {
  args: {
    ...Default.args,
    navbarEnd: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button variant="ghost" iconOnly aria-label="Notifications">
          <Bell size={16} />
        </Button>
        <Badge variant="danger">2</Badge>
      </div>
    ),
  },
}

export const NoUser: Story = {
  args: {
    title: 'ARB Platform',
    sections: defaultSections,
    children: (
      <div style={{ padding: 24 }}>
        <p style={{ color: 'var(--arb-text-secondary)' }}>No user info shown.</p>
      </div>
    ),
  },
}
