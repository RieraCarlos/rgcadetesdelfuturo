import { ChevronRight, MoreHorizontal, Plus } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

// Tipos actualizados para manejar IDs
export type NavWorkspacePageItem = {
  title: string,
  url: string,
  emoji: React.ReactNode,
  id?: string, // Agregamos ID para identificar páginas específicas
}

export type NavWorkspaceItem = {
  title: string,
  url: string,
  emoji: React.ReactNode,
  isActive?: boolean,
  badge?: string,
  pages: NavWorkspacePageItem[],
  id?: string, // ID del workspace si es necesario
}

export function NavWorkspaces({
  items,
  onItemClick,
  onPageClick, // Nueva prop para manejar clicks en páginas
}: {
  items: NavWorkspaceItem[],
  onItemClick?: (item: NavWorkspaceItem) => void,
  onPageClick?: (page: NavWorkspacePageItem, workspace: NavWorkspaceItem) => void, // Nueva prop
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Herramientas de estudio</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={item.isActive} onClick={() => onItemClick?.(item)}>
                  <Link to="#">
                    <span>{item.emoji}</span>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="bg-sidebar-accent text-sidebar-accent-foreground left-2 data-[state=open]:rotate-90"
                    showOnHover
                  >
                    <ChevronRight />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <SidebarMenuAction showOnHover>
                  <Plus />
                </SidebarMenuAction>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.pages.map((page) => (
                      <SidebarMenuSubItem key={page.title}>
                        <SidebarMenuSubButton asChild>
                          <a 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              onPageClick?.(page, item); // Llamamos al handler de página
                            }}
                          >
                            <span>{page.emoji}</span>
                            <span>{page.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}