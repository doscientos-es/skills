import type { Customer } from '@/features/customers/application/customer'

/** Synthetic data only. Do not replace this with production exports or credentials. */
export const customers: Customer[] = [
  {
    id: 'customer-alba',
    name: 'Alba Gestión',
    contactName: 'Alba Ruiz',
    email: 'alba@example.test',
    status: 'active',
    monthlyValue: 490,
  },
  {
    id: 'customer-norte',
    name: 'Norte Logística',
    contactName: 'Martín Vidal',
    email: 'martin@example.test',
    status: 'trial',
    monthlyValue: 0,
  },
]