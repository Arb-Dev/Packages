import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface FieldProps {
  label?: string
  children: ReactNode
  className?: string
}

/** Wraps a label + control with consistent spacing */
export function Field({ label, children, className = '' }: FieldProps) {
  return (
    <div className={`arb-field ${className}`}>
      {label && <label className="arb-label">{label}</label>}
      {children}
    </div>
  )
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: InputSize
}

export function Input({ inputSize = 'md', className = '', ...props }: InputProps) {
  const cls = ['arb-input', inputSize !== 'md' ? `arb-input-${inputSize}` : '', className]
    .filter(Boolean).join(' ')
  return <input className={cls} {...props} />
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  inputSize?: InputSize
}

export function Select({ inputSize = 'md', className = '', children, ...props }: SelectProps) {
  const cls = ['arb-input', 'arb-select', inputSize !== 'md' ? `arb-input-${inputSize}` : '', className]
    .filter(Boolean).join(' ')
  return <select className={cls} {...props}>{children}</select>
}
