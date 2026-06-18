import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataPanel } from '../components/DataPanel'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'

const meta: Meta<typeof DataPanel> = {
  title: 'Components/DataPanel',
  component: DataPanel,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof DataPanel>

export const Basic: Story = {
  args: {
    children: (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--arb-border)' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Alice Chen', status: 'success', role: 'Engineer' },
            { name: 'Bob Marsh', status: 'warning', role: 'Manager' },
            { name: 'Carol Day', status: 'neutral', role: 'Analyst' },
          ].map(row => (
            <tr key={row.name} style={{ borderBottom: '1px solid var(--arb-border-light)' }}>
              <td style={{ padding: '8px 12px' }}>{row.name}</td>
              <td style={{ padding: '8px 12px' }}>
                <Badge variant={row.status as any}>{row.status}</Badge>
              </td>
              <td style={{ padding: '8px 12px', color: 'var(--arb-text-secondary)' }}>{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
}

export const WithToolbar: Story = {
  args: {
    toolbar: (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Employees</span>
        <Badge variant="primary">3</Badge>
        <div style={{ marginLeft: 'auto' }}>
          <Button size="sm" variant="primary">Add</Button>
        </div>
      </div>
    ),
    children: (
      <p style={{ padding: '16px', color: 'var(--arb-text-secondary)', fontSize: 14 }}>
        Panel content goes here.
      </p>
    ),
  },
}
