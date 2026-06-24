import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Button } from '../components/Button'

const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'ARB Platform',
  },
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {}

export const WithUser: Story = {
  args: {
    userName: 'Jane Smith',
    userDetail: 'Admin',
    onLogout: () => {},
  },
}

export const WithEndSlot: Story = {
  args: {
    userName: 'Jane Smith',
    userDetail: 'Admin',
    onLogout: () => {},
    end: (
      <Button variant="ghost" iconOnly aria-label="Notifications">
        <Bell size={16} />
      </Button>
    ),
  },
}

export const WithHomeAndLauncher: Story = {
  args: {
    title: 'Tasks',
    homeHref: '#home',
    userName: 'Jane Smith',
    userDetail: 'Admin',
    onLogout: () => {},
    apps: [
      { subdomain: 'tasks', name: 'Task assignment', url: '#tasks' },
      { subdomain: 'crm', name: 'Customer records', url: '#crm' },
      { subdomain: 'documents', name: 'Document store', url: '#documents' },
      { subdomain: 'automations', name: 'Workflow automations', url: '#automations' },
      { subdomain: 'forms', name: 'Form builder', url: '#forms' },
      { subdomain: 'users', name: 'User directory', url: '#users' },
    ],
  },
}
