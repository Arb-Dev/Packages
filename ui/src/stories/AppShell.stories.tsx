import type { Meta, StoryObj } from '@storybook/react-vite'
import { Users, Settings, LayoutDashboard, FileText, Bell, Plus } from 'lucide-react'
import { AppShell } from '../components/AppShell'
import { Navbar } from '../components/Navbar'
import { Sidebar, NavSection, NavItem } from '../components/Sidebar'
import { PageContent } from '../components/PageContent'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'

const meta: Meta = {
  title: 'Layout/AppShell',
  parameters: { layout: 'fullscreen' },
}

export default meta

const nav = (
  <Sidebar>
    <NavSection>
      <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} active onClick={() => {}} />
      <NavItem id="employees" label="Employees" icon={Users} badge={24} onClick={() => {}} />
      <NavItem id="documents" label="Documents" icon={FileText} onClick={() => {}} />
    </NavSection>
    <NavSection title="Admin">
      <NavItem id="settings" label="Settings" icon={Settings} onClick={() => {}} />
    </NavSection>
  </Sidebar>
)

export const Default: StoryObj = {
  render: () => (
    <AppShell
      navbar={<Navbar title="ARB Platform" userName="Jane Smith" userDetail="Admin" onLogout={() => {}} />}
      sidebar={nav}
    >
      <PageContent title="Dashboard">
        <p style={{ color: 'var(--arb-text-secondary)', fontSize: 14 }}>Main content area.</p>
      </PageContent>
    </AppShell>
  ),
}

export const WithPageActions: StoryObj = {
  render: () => (
    <AppShell
      navbar={
        <Navbar
          title="ARB Platform"
          userName="Jane Smith"
          userDetail="Admin"
          onLogout={() => {}}
          end={
            <Button variant="ghost" iconOnly aria-label="Notifications">
              <Bell size={16} />
            </Button>
          }
        />
      }
      sidebar={nav}
    >
      <PageContent
        title="Employees"
        actions={
          <>
            <Badge variant="primary">24 total</Badge>
            <Button variant="primary" size="sm">
              <Plus size={14} /> Add employee
            </Button>
          </>
        }
      >
        <p style={{ color: 'var(--arb-text-secondary)', fontSize: 14 }}>Table or content goes here.</p>
      </PageContent>
    </AppShell>
  ),
}

export const CollapsedSidebar: StoryObj = {
  render: () => (
    <AppShell
      navbar={<Navbar title="ARB Platform" userName="Jane Smith" userDetail="Admin" />}
      sidebar={
        <Sidebar defaultCollapsed>
          <NavSection>
            <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} active onClick={() => {}} />
            <NavItem id="employees" label="Employees" icon={Users} onClick={() => {}} />
            <NavItem id="documents" label="Documents" icon={FileText} onClick={() => {}} />
          </NavSection>
        </Sidebar>
      }
    >
      <PageContent title="Dashboard">
        <p style={{ color: 'var(--arb-text-secondary)', fontSize: 14 }}>Sidebar starts collapsed.</p>
      </PageContent>
    </AppShell>
  ),
}
