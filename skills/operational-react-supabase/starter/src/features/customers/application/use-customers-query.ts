import { useQuery } from '@tanstack/react-query'

import { listCustomers } from '../infrastructure/list-customers'
import type { CustomerSearch } from './customer-search'

export function useCustomersQuery(search: CustomerSearch) {
  return useQuery({
    queryKey: ['customers', search],
    queryFn: () => listCustomers(search),
  })
}