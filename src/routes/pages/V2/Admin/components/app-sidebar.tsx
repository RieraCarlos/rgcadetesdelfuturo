"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconUserBolt,
} from "@tabler/icons-react"

import { type NavDocumentItem, NavDocuments } from "./nav-documents"
import { type NavMainItem, NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Milton Moreira",
    email: "milton_m@startgood.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "#", icon: IconDashboard, isActive: true },
    { title: "Registro de matriculas", url: "#", icon: IconListDetails },
    { title: "Seguimiento de pagos", url: "#", icon: IconChartBar },
    { title: "Seguimiento de estudiantes", url: "#", icon: IconUsers },
    { title: "Registro de instructores", url: "#", icon: IconUserBolt },
  ],
  navSecondary: [
    { title: "Configuraciones", url: "#", icon: IconSettings },
    { title: "Ayuda", url: "#", icon: IconHelp },
  ],
  documents: [
    { title: "Base de datos nacional", url: "#", icon: IconDatabase },
    { title: "Reportes", url: "#", icon: IconReport },
    { title: "Asistente IA", url: "#", icon: IconFileWord },
  ],
}

export function AppSidebar({ 
  onMainNavItemClick,
  activeItemTitle,
  onNavDocumentItemClick,
  activeItemTitleDocument,
  ...props 
}: React.ComponentProps<typeof Sidebar> & {
  onMainNavItemClick?: (item: NavMainItem) => void
  activeItemTitle?: string
  onNavDocumentItemClick?: (item: NavDocumentItem) => void
  activeItemTitleDocument?: string
}) {
  const navMainItems = React.useMemo(
    () =>
      data.navMain.map((item) => ({
        ...item,
        isActive: item.title === activeItemTitle,
      })),
    [activeItemTitle],
  )

  const navDocumentItems = React.useMemo(
    () =>
      data.documents.map((item) => ({
        ...item,
        isActive: item.title === activeItemTitleDocument,
      })),
    [activeItemTitleDocument],
  )

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">rg technology</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMainItems} onItemClick={onMainNavItemClick} />
        <NavDocuments items={navDocumentItems} onItemClick={onNavDocumentItemClick} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
