import {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
} from '@doscientos/ui'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <AppShell className="flex min-h-svh">
      <AppShellSidebar className="hidden p-4 md:block">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          Operaciones
        </Link>
        <nav aria-label="Principal" className="mt-8">
          <Link
            to="/"
            activeProps={{ className: 'bg-muted text-foreground' }}
            className="text-muted-foreground hover:bg-muted block rounded-md px-3 py-2 text-sm"
          >
            Clientes
          </Link>
        </nav>
      </AppShellSidebar>
      <AppShellMain className="min-w-0 flex-1">
        <AppShellHeader className="flex h-14 items-center justify-between">
          <span className="text-sm font-medium">__APP_TITLE__</span>
          <span className="text-muted-foreground text-xs">Datos de demostración</span>
        </AppShellHeader>
        <AppShellContent className="mx-auto max-w-6xl p-4 sm:p-6">{children}</AppShellContent>
      </AppShellMain>
    </AppShell>
  )
}
