import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppLauncher } from '../components/AppLauncher'

const meta: Meta<typeof AppLauncher> = {
  title: 'Layout/AppLauncher',
  component: AppLauncher,
  parameters: {
    // Render on the dark navbar background, where the trigger actually lives.
    backgrounds: { default: 'navbar', values: [{ name: 'navbar', value: '#002b68' }] },
  },
  args: {
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

export default meta
type Story = StoryObj<typeof AppLauncher>

export const Default: Story = {}

export const Empty: Story = {
  args: { apps: [] },
}
