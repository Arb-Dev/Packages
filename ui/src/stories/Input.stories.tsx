import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field, Input, Select } from '../components/Input'

const meta: Meta = {
  title: 'Components/Input',
}

export default meta

export const TextInput: StoryObj = {
  name: 'Input — default',
  render: () => (
    <Field label="Full name">
      <Input placeholder="Jane Smith" />
    </Field>
  ),
}

export const InputSizes: StoryObj = {
  name: 'Input — sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
      <Field label="Small">
        <Input inputSize="sm" placeholder="Small" />
      </Field>
      <Field label="Medium">
        <Input inputSize="md" placeholder="Medium" />
      </Field>
      <Field label="Large">
        <Input inputSize="lg" placeholder="Large" />
      </Field>
    </div>
  ),
}

export const InputDisabled: StoryObj = {
  name: 'Input — disabled',
  render: () => (
    <Field label="Email">
      <Input value="user@example.com" disabled readOnly />
    </Field>
  ),
}

export const SelectInput: StoryObj = {
  name: 'Select — default',
  render: () => (
    <Field label="Department">
      <Select>
        <option value="">Select…</option>
        <option value="eng">Engineering</option>
        <option value="ops">Operations</option>
        <option value="hr">HR</option>
      </Select>
    </Field>
  ),
}

export const SelectSizes: StoryObj = {
  name: 'Select — sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
      <Field label="Small">
        <Select inputSize="sm"><option>Option</option></Select>
      </Field>
      <Field label="Medium">
        <Select inputSize="md"><option>Option</option></Select>
      </Field>
      <Field label="Large">
        <Select inputSize="lg"><option>Option</option></Select>
      </Field>
    </div>
  ),
}
