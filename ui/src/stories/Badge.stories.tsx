import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../components/Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Badge' },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Neutral: Story = { args: { variant: 'neutral' } }
export const Primary: Story = { args: { variant: 'primary' } }
export const Success: Story = { args: { variant: 'success' } }
export const Warning: Story = { args: { variant: 'warning' } }
export const Danger: Story = { args: { variant: 'danger' } }
export const Info: Story = { args: { variant: 'info' } }
