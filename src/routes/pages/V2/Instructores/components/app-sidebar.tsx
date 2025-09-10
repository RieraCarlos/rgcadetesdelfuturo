"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { type NavMainItem, NavMain } from "./nav-main"
import { type NavProjectItem, NavProjects } from "./nav-projects"
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
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
        title: "Home",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
            title: "History",
            url: "#",
            },
            {
            title: "Starred",
            url: "#",
            },
            {
            title: "Settings",
            url: "#",
            },
        ],
        },
        {
        title: "Crear tareas",
        url: "#",
        icon: Bot,
        items: [
            {
            title: "Calificar tareas",
            url: "#",
            },
            {
            title: "Explorer",
            url: "#",
            },
            {
            title: "Quantum",
            url: "#",
            },
        ],
        },
        {
        title: "Crear insignias",
        url: "#",
        icon: BookOpen,
        items: [
            {
            title: "Introduction",
            url: "#",
            },
            {
            title: "Get Started",
            url: "#",
            },
            {
            title: "Tutorials",
            url: "#",
            },
            {
            title: "Changelog",
            url: "#",
            },
        ],
        },
    ],
    projects: [
        {
        title: "Asistencia",
        url: "#",
        icon: Frame,
        },
        {
        title: "Calificar insignias",
        url: "#",
        icon: PieChart,
        },
    ],
}

export function AppSidebar({ 
  onMainNavItemClick,
  activeItemTitle,
  onNavProjectClick,
  activeItemTitleProject,
  ...props 
}: React.ComponentProps<typeof Sidebar> & {
  onMainNavItemClick?: (item: NavMainItem) => void,
  activeItemTitle?: string,
  onNavProjectClick?: (item: NavProjectItem) => void,
  activeItemTitleProject?: string,
}) {
  const navMainItems = React.useMemo(
    () => 
      data.navMain.map((item) => ({
        ...item,
        isActive: item.title === activeItemTitle,
      })),
    [activeItemTitle],
  )
  const navProjectItems = React.useMemo(
    () => 
      data.projects.map((item) => ({
        ...item,
        isActive: item.title === activeItemTitleProject,
      })),
      [activeItemTitleProject],
  ) 
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {/*z<Command className="size-4" />*/}
                  <p>rg</p>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">rg technology</span>
                  <span className="truncate text-xs">Cadetes del futuro</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} onItemClick={onMainNavItemClick} />
        <NavProjects items={navProjectItems} onItemClick={onNavProjectClick}/>
        {/*<NavSecondary items={data.navSecondary} className="mt-auto" />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
