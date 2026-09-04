import {
  Button,
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
  DetailDrawer,
  DetailDrawerBody,
  DetailDrawerFooter,
  DetailDrawerHeader,
  DrawerClose,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@doscientos/ui'

import type { Customer } from '../application/customer'

export function CustomerDetailDrawer({ customer }: { customer: Customer }) {
  return (
    <DrawerTrigger>
      <Button variant="outline" size="sm">
        Ver ficha
      </Button>
      <DetailDrawer dialogProps={{ 'aria-label': `Ficha de ${customer.name}` }}>
        <DetailDrawerHeader>
          <DrawerTitle>{customer.name}</DrawerTitle>
          <DrawerDescription>Datos de demostración; no corresponden a un cliente real.</DrawerDescription>
        </DetailDrawerHeader>
        <DetailDrawerBody>
          <DescriptionList>
            <DescriptionItem>
              <DescriptionTerm>Contacto</DescriptionTerm>
              <DescriptionDetails>{customer.contactName}</DescriptionDetails>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionTerm>Email</DescriptionTerm>
              <DescriptionDetails>{customer.email}</DescriptionDetails>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionTerm>Estado</DescriptionTerm>
              <DescriptionDetails>{customer.status}</DescriptionDetails>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionTerm>Valor mensual</DescriptionTerm>
              <DescriptionDetails>{formatCurrency(customer.monthlyValue)}</DescriptionDetails>
            </DescriptionItem>
          </DescriptionList>
        </DetailDrawerBody>
        <DetailDrawerFooter>
          <DrawerClose variant="outline">Cerrar</DrawerClose>
        </DetailDrawerFooter>
      </DetailDrawer>
    </DrawerTrigger>
  )
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
}