import { describe, expect, it } from 'vitest'

import { defaultCustomerSearch, parseCustomerSearch } from './customer-search'

describe('parseCustomerSearch', () => {
  it('normalizes valid filters from the URL', () => {
    expect(parseCustomerSearch({ q: '  Alba  ', status: 'active' })).toEqual({
      q: 'Alba',
      status: 'active',
    })
  })

  it('uses safe defaults for malformed URL values', () => {
    expect(parseCustomerSearch({ q: ['not-a-string'], status: 'unknown' })).toEqual(
      defaultCustomerSearch,
    )
  })
})