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
