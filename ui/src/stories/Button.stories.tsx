import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Outline: Story = { args: { variant: 'outline' } }
export const Danger: Story = { args: { variant: 'danger' } }

export const Small: Story = { args: { variant: 'primary', size: 'sm' } }
export const Medium: Story = { args: { variant: 'primary', size: 'md' } }
export const Large: Story = { args: { variant: 'primary', size: 'lg' } }

export const Disabled: Story = { args: { variant: 'primary', disabled: true } }

export const IconOnly: Story = {
  args: { variant: 'secondary', iconOnly: true, children: '✕', 'aria-label': 'Close' },
}
