import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageContent } from '../components/PageContent'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { DataPanel } from '../components/DataPanel'

const meta: Meta<typeof PageContent> = {
  title: 'Layout/PageContent',
  component: PageContent,
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof PageContent>

export const TitleOnly: Story = {
  args: {
    title: 'Employees',
    children: <p style={{ color: 'var(--arb-text-secondary)', fontSize: 14 }}>Page body goes here.</p>,
  },
}

export const TitleWithActions: Story = {
  args: {
    title: 'Employees',
    actions: (
      <>
        <Badge variant="primary">24 total</Badge>
        <Button variant="primary" size="sm">Add employee</Button>
      </>
    ),
    children: <p style={{ color: 'var(--arb-text-secondary)', fontSize: 14 }}>Page body goes here.</p>,
  },
}

export const WithDataPanel: Story = {
  args: {
    title: 'Employees',
    actions: <Button variant="primary" size="sm">Add employee</Button>,
    children: (
      <DataPanel
        toolbar={<span style={{ fontSize: 14, fontWeight: 500 }}>All employees</span>}
      >
        <p style={{ padding: 16, color: 'var(--arb-text-secondary)', fontSize: 14 }}>
          DataPanel inside PageContent.
        </p>
      </DataPanel>
    ),
  },
}

export const NoHeader: Story = {
  args: {
    children: <p style={{ color: 'var(--arb-text-secondary)', fontSize: 14 }}>Content with no title or actions.</p>,
  },
}
