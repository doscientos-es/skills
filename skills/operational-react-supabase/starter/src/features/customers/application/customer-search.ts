import { z } from 'zod'

import { customerStatuses, type CustomerStatusFilter } from './customer'

export type CustomerSearch = {
  q: string
  status: CustomerStatusFilter
}

export const defaultCustomerSearch: CustomerSearch = { q: '', status: 'all' }

const customerSearchSchema = z.object({
  q: z.string().catch(defaultCustomerSearch.q),
  status: z.union([z.literal('all'), z.enum(customerStatuses)]).catch(defaultCustomerSearch.status),
})

/** Keeps URL state safe even when users paste malformed query parameters. */
export function parseCustomerSearch(input: Record<string, unknown>): CustomerSearch {
  const search = customerSearchSchema.parse(input)

  return { q: search.q.trim(), status: search.status }
}
