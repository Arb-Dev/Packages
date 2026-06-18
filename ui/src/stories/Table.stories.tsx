import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table, Thead, Tbody, Tr, Th, Td, CellStack } from '../components/Table'
import { Badge } from '../components/Badge'
import { DataPanel } from '../components/DataPanel'
import { Button } from '../components/Button'
import { EmptyState } from '../components/Spinner'

const meta: Meta = {
  title: 'Components/Table',
  parameters: { layout: 'padded' },
}

export default meta

// ── Basic ────────────────────────────────────────────────────────────────────

export const Basic: StoryObj = {
  render: () => (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Department</Th>
          <Th>Status</Th>
          <Th>Joined</Th>
        </Tr>
      </Thead>
      <Tbody>
        {[
          { name: 'Alice Chen', dept: 'Engineering', status: 'success', date: '2023-03-14' },
          { name: 'Bob Marsh', dept: 'Operations', status: 'warning', date: '2022-09-01' },
          { name: 'Carol Day', dept: 'HR', status: 'neutral', date: '2024-01-20' },
        ].map(row => (
          <Tr key={row.name}>
            <Td style={{ fontWeight: 500 }}>{row.name}</Td>
            <Td dim>{row.dept}</Td>
            <Td><Badge variant={row.status as any}>{row.status}</Badge></Td>
            <Td mono>{row.date}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ),
}

// ── Inside DataPanel ─────────────────────────────────────────────────────────

export const InDataPanel: StoryObj = {
  name: 'Inside DataPanel',
  render: () => (
    <DataPanel
      toolbar={
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Employees</span>
          <Badge variant="primary">3</Badge>
          <div style={{ marginLeft: 'auto' }}>
            <Button size="sm" variant="primary">Add</Button>
          </div>
        </div>
      }
    >
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[
            { name: 'Alice Chen', role: 'Senior Engineer', status: 'success' as const },
            { name: 'Bob Marsh', role: 'Manager', status: 'warning' as const },
            { name: 'Carol Day', role: 'Analyst', status: 'neutral' as const },
          ].map(row => (
            <Tr key={row.name}>
              <Td style={{ fontWeight: 500 }}>{row.name}</Td>
              <Td dim>{row.role}</Td>
              <Td><Badge variant={row.status}>{row.status}</Badge></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </DataPanel>
  ),
}

// ── Clickable rows ───────────────────────────────────────────────────────────

export const ClickableRows: StoryObj = {
  render: () => (
    <Table>
      <Thead>
        <Tr>
          <Th>Type</Th>
          <Th>Name</Th>
          <Th>Details</Th>
        </Tr>
      </Thead>
      <Tbody>
        {[
          { type: 'Contact', name: 'Alice Chen', detail: 'Engineering' },
          { type: 'Company', name: 'Acme Corp', detail: 'Technology' },
          { type: 'Contact', name: 'Bob Marsh', detail: 'Operations' },
        ].map(row => (
          <Tr key={row.name} onClick={() => alert(`Selected: ${row.name}`)}>
            <Td><Badge variant="neutral">{row.type}</Badge></Td>
            <Td style={{ fontWeight: 500 }}>{row.name}</Td>
            <Td dim>{row.detail}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ),
}

// ── CellStack ────────────────────────────────────────────────────────────────

export const WithCellStack: StoryObj = {
  name: 'CellStack cells',
  render: () => (
    <Table>
      <Thead>
        <Tr>
          <Th>Task</Th>
          <Th>Assignee</Th>
          <Th>Due</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {[
          { title: 'Onboarding checklist', desc: 'Complete IT provisioning steps', assignee: 'alice@example.com', due: '2024-07-01', status: 'warning' as const, label: 'In progress' },
          { title: 'Benefits enrollment', desc: 'Submit forms to HR portal', assignee: 'bob@example.com', due: '2024-07-15', status: 'neutral' as const, label: 'Open' },
          { title: 'Equipment setup', desc: 'Laptop and peripherals configured', assignee: 'carol@example.com', due: '2024-06-28', status: 'success' as const, label: 'Done' },
        ].map(row => (
          <Tr key={row.title}>
            <Td><CellStack title={row.title} subtitle={row.desc} /></Td>
            <Td dim>{row.assignee}</Td>
            <Td mono>{row.due}</Td>
            <Td><Badge variant={row.status}>{row.label}</Badge></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  ),
}

// ── Empty state ──────────────────────────────────────────────────────────────

export const Empty: StoryObj = {
  render: () => (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Status</Th>
          <Th>Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td colSpan={3} style={{ padding: 0, border: 'none' }}>
            <EmptyState title="No records found" description="Try adjusting your filters." />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  ),
}
