import { customers } from '@/demos/customers'

import type { Customer } from '../application/customer'
import type { CustomerSearch } from '../application/customer-search'

/**
 * Demo adapter. Replace this implementation with Supabase after RLS policies,
 * tenant scope and the data model have been approved.
 */
export async function listCustomers(search: CustomerSearch): Promise<Customer[]> {
  const query = search.q.toLocaleLowerCase('es')

  return customers.filter((customer) => {
    const matchesStatus = search.status === 'all' || customer.status === search.status
    const searchableText = `${customer.name} ${customer.contactName} ${customer.email}`
    const matchesQuery = !query || searchableText.toLocaleLowerCase('es').includes(query)

    return matchesStatus && matchesQuery
  })
}