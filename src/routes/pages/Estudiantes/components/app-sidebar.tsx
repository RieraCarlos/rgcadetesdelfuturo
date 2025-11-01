"use client"

import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react"

import { NavFavorites } from "./nav-favorites"
import { type NavMainItem, NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { type NavWorkspaceItem, NavWorkspaces } from "./nav-workspaces"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "StartGood",
      logo: Command,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Tareas",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
    {
      title: "Instructores",
      url: "#",
      icon: Search,
    },
    {
      title: "Blog",
      url: "#",
      icon: Sparkles,
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  favorites: [
    {
      name: "Mis finanzas personales",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Investigación",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Cantos de guerra",
      url: "#",
      emoji: "💪",
    },
  ],
  workspaces: [
    {
      title: "Tarjetas de estudio",
      emoji: "🎯",
      pages: [], // Array vacío = sin submenú desplegable
    },
    {
      title: "Notas y actividades",
      emoji: "💼",
      pages: [],
    },
    {
      title: "Calendario",
      emoji: "🎨",
      pages: [],
    },
  ],
}

export function AppSidebar({
  onMainNavItemClick,
  activeItemTitle,
  onNavWorkspacesItemClick,
  activeWorkspaceTitle,
  ...props 
}: React.ComponentProps<typeof Sidebar> & {
  onMainNavItemClick?: (item: NavMainItem) => void,
  activeItemTitle?: string,
  onNavWorkspacesItemClick?: (item: NavWorkspaceItem) => void,
  activeWorkspaceTitle?: string,
}) {
  const navMainItems = React.useMemo(
    () =>
      data.navMain.map((item) => ({
        ...item,
        isActive: item.title === activeItemTitle,
      })),
    [activeItemTitle],
  )
  const navWorkspaceItems = React.useMemo(
    () =>
      data.workspaces.map((item) => ({
        ...item,
          isActive: item.title === activeWorkspaceTitle,
      })),
    [activeWorkspaceTitle],
  )

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={navMainItems} onItemClick={onMainNavItemClick} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces items={navWorkspaceItems} onItemClick={onNavWorkspacesItemClick} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}