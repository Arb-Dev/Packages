import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner, EmptyState } from '../components/Spinner'
import { Button } from '../components/Button'

const meta: Meta = {
  title: 'Components/Spinner',
}

export default meta

export const Small: StoryObj<typeof Spinner> = {
  render: () => <Spinner size="sm" />,
}

export const Medium: StoryObj<typeof Spinner> = {
  render: () => <Spinner size="md" />,
}

export const Large: StoryObj<typeof Spinner> = {
  render: () => <Spinner size="lg" />,
}

export const EmptyStateBasic: StoryObj<typeof EmptyState> = {
  name: 'EmptyState — basic',
  render: () => <EmptyState title="No results" description="Try adjusting your filters." />,
}

export const EmptyStateWithAction: StoryObj<typeof EmptyState> = {
  name: 'EmptyState — with action',
  render: () => (
    <EmptyState
      title="Nothing here yet"
      description="Add an item to get started."
      action={<Button variant="primary">Add item</Button>}
    />
  ),
}
