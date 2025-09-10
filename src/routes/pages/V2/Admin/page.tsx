import { AppSidebar } from "./components/app-sidebar"
import { ChartAreaInteractive } from "./components/chart-area-interactive"
import { SectionCards } from "./components/section-cards"
import { SiteHeader } from "./components/site-header"
import { type NavMainItem } from "./components/nav-main"
import { type NavDocumentItem } from "./components/nav-documents"
import DashboardPanel from "./components/dashboard"
import DataTable from "./components/DataBaseNa"
import RegistroEstudiante from "./components/RegistroEstudiante"
import SeguimientoPagosEstudiante from "./components/SeguimientoPagos"
import SeguimientoEstudiantes from "./components/SeguimientoEstudiante"
import { AsistenteIA } from "@/components/asistente-ia/AsistenteIA" // <-- Importa tu chat
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import React from "react"

export default function Dashboard() {
  const [activeItemTitle, setActiveItemTitle] = React.useState<string>("Dashboard")
  const [activeItemTitleDocument, setActiveItemTitleDocument] = React.useState<string>("")

  const handleMainNavItemClick = (item: NavMainItem) => {
    setActiveItemTitle(item.title)
    setActiveItemTitleDocument("")
  }
  const handleNavDocumentItemClick = (item: NavDocumentItem) => {
    setActiveItemTitleDocument(item.title)
    setActiveItemTitle("")
  }

  const activePage = activeItemTitle || activeItemTitleDocument

  // Diccionario de componentes
  const pages = {
    Dashboard: <DashboardPanel />,
    "Base de datos nacional": <DataTable />,
    "Registro de matriculas": <RegistroEstudiante />,
    "Seguimiento de pagos": <SeguimientoPagosEstudiante />,
    "Seguimiento de estudiantes": <SeguimientoEstudiantes />,
    "Asistente IA": <AsistenteIA />, // <-- Agregado
  }
  type PagesType = {
    [key: string]: React.ReactNode
  }

  const typedPages = pages as PagesType

  console.log("Active Page:", activePage)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        onMainNavItemClick={handleMainNavItemClick}
        activeItemTitle={activeItemTitle}
        onNavDocumentItemClick={handleNavDocumentItemClick}
        activeItemTitleDocument={activeItemTitleDocument}
        variant="inset"
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {activePage && typedPages[activePage] && React.isValidElement(typedPages[activePage])
              ? React.cloneElement(typedPages[activePage], { key: activePage })
              : null}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
