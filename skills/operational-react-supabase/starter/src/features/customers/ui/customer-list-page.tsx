import {
  ActiveFilters,
  Button,
  DataViewState,
  DataViewStateActions,
  DataViewStateDescription,
  DataViewStateTitle,
  FilterBar,
  FilterChip,
  FilterGroup,
  Input,
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@doscientos/ui'
import type { ChangeEvent } from 'react'

import type { Customer } from '../application/customer'
import { defaultCustomerSearch, type CustomerSearch } from '../application/customer-search'
import { useCustomersQuery } from '../application/use-customers-query'
import { CustomerDetailDrawer } from './customer-detail-drawer'

export function CustomerListPage({
  search,
  onSearchChange,
}: {
  search: CustomerSearch
  onSearchChange: (update: Partial<CustomerSearch>) => void
}) {
  const customersQuery = useCustomersQuery(search)

  function updateSearch(update: Partial<CustomerSearch>) {
    onSearchChange(update)
  }

  function updateQuery(event: ChangeEvent<HTMLInputElement>) {
    updateSearch({ q: event.target.value })
  }

  return (
    <div className="space-y-6">
      <PageHeader>
        <PageHeaderHeading>
          <PageHeaderTitle>Clientes</PageHeaderTitle>
          <PageHeaderDescription>
            Primer vertical del starter con datos sintéticos.
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions>
          <Button onPress={() => updateSearch(defaultCustomerSearch)}>Restablecer filtros</Button>
        </PageHeaderActions>
      </PageHeader>

      <FilterBar aria-label="Filtros de clientes">
        <FilterGroup>
          <Input value={search.q} onChange={updateQuery} placeholder="Buscar clientes" />
          <select
            aria-label="Filtrar por estado"
            value={search.status}
            className="border-border bg-background h-8 rounded-lg border px-2.5 text-sm"
            onChange={(event) =>
              updateSearch({ status: event.target.value as CustomerSearch['status'] })
            }
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="trial">Prueba</option>
          </select>
        </FilterGroup>
        <ActiveFilters>
          {search.q ? (
            <FilterChip onRemove={() => updateSearch({ q: '' })}>Búsqueda: {search.q}</FilterChip>
          ) : null}
          {search.status !== 'all' ? (
            <FilterChip onRemove={() => updateSearch({ status: 'all' })}>
              Estado: {search.status}
            </FilterChip>
          ) : null}
        </ActiveFilters>
      </FilterBar>

      {customersQuery.isLoading ? <LoadingState /> : null}
      {customersQuery.isError ? <ErrorState onRetry={() => void customersQuery.refetch()} /> : null}
      {customersQuery.data?.length === 0 ? <EmptyState /> : null}
      {customersQuery.data?.length ? <CustomerTable customers={customersQuery.data} /> : null}
    </div>
  )
}

function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>
            <span className="sr-only">Acciones</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">{customer.name}</TableCell>
            <TableCell>{customer.contactName}</TableCell>
            <TableCell>{customer.status}</TableCell>
            <TableCell>
              <CustomerDetailDrawer customer={customer} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function LoadingState() {
  return (
    <DataViewState aria-busy="true">
      <DataViewStateTitle>Cargando clientes</DataViewStateTitle>
      <DataViewStateDescription>Recuperando el listado solicitado.</DataViewStateDescription>
    </DataViewState>
  )
}

function EmptyState() {
  return (
    <DataViewState>
      <DataViewStateTitle>No hay clientes con esos filtros</DataViewStateTitle>
      <DataViewStateDescription>
        Modifica o restablece los filtros para continuar.
      </DataViewStateDescription>
    </DataViewState>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <DataViewState aria-live="polite">
      <DataViewStateTitle>No se han podido cargar los clientes</DataViewStateTitle>
      <DataViewStateDescription>
        El error es recuperable y no expone detalles internos.
      </DataViewStateDescription>
      <DataViewStateActions>
        <Button onPress={onRetry}>Reintentar</Button>
      </DataViewStateActions>
    </DataViewState>
  )
}
