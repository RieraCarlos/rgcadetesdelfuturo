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
  Wallet,
  Shield,
  LucideIcon,
  LogOut,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import supabase from "@/supabase/supabaseClient"

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
      name: "rg|technology",
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
  ],
  favorites: [
    {
      name: "Mis finanzas personales",
      url: "#",
      icon: Wallet,
    },
    {
      name: "Cantos de guerra",
      url: "#",
      icon: Shield,
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
  onFavoriteItemClick,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onMainNavItemClick?: (item: NavMainItem) => void,
  activeItemTitle?: string,
  onNavWorkspacesItemClick?: (item: NavWorkspaceItem) => void,
  activeWorkspaceTitle?: string,
  onFavoriteItemClick?: (item: { name: string; url: string; icon: LucideIcon }) => void,
}) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const confirm = window.confirm("¿Estás seguro que deseas cerrar la sesión?")
    if (confirm) {
      await supabase.auth.signOut()
      localStorage.removeItem('student_profile')
      navigate('/')
    }
  }

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

  const secondaryNavigation = [
    {
      title: "Cerrar Sesión",
      url: "#",
      icon: LogOut,
      onClick: handleLogout,
    },
  ]

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={navMainItems} onItemClick={onMainNavItemClick} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} onItemClick={onFavoriteItemClick} />
        <NavWorkspaces items={navWorkspaceItems} onItemClick={onNavWorkspacesItemClick} />
        <NavSecondary items={secondaryNavigation} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}