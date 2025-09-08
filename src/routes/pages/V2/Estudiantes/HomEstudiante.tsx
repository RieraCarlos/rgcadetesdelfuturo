import { AppSidebar } from "./components/app-sidebar"
import { NavActions } from "./components/nav-actions"
import { type NavMainItem } from "./components/nav-main"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
// Importar los componentes de las páginas
import Perfil from "./components/PerfilEstudiante"
import Tareas from "./components/TareasEstudiante"
import InstructorsPage from "./components/Instructores"
import BlogsComponents from "@/components/Blogs/BlogsComponent"
import React from "react"


export default function HomEstudiante() {
    const [activeItemTitle, setActiveItemTitle] = React.useState<string>("Home");

    const handleMainNavItemClick = (item: NavMainItem) => {
      setActiveItemTitle(item.title);
    }
      const activePage = activeItemTitle;

    // Diccionario de componentes
    const pages = {
        Home: <Perfil />,
        Tareas: <Tareas />,
        Instructores: <InstructorsPage />,
        Blog:<BlogsComponents/>
    };
    type PagesType = {
        [key: string]: React.ReactNode;
    };
    const typedPages = pages as PagesType;

    return (
        <SidebarProvider>
          <AppSidebar 
              onMainNavItemClick={handleMainNavItemClick}
              activeItemTitle={activeItemTitle}
          />
          <SidebarInset>
              <header className="flex h-14 shrink-0 items-center gap-2">
              <div className="flex flex-1 items-center gap-2 px-3">
                  <SidebarTrigger />
                  <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                  <BreadcrumbList>
                      <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">
                          <span><strong>Curso</strong> cadetes del futuro🪖</span>
                      </BreadcrumbPage>
                      </BreadcrumbItem>
                  </BreadcrumbList>
                  </Breadcrumb>
              </div>
              <div className="ml-auto px-3">
                  <NavActions />
              </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                {activePage && typedPages[activePage] && React.isValidElement(typedPages[activePage]) ? React.cloneElement(typedPages[activePage], { key: activePage }) : null}
              </div>
          </SidebarInset>
        </SidebarProvider>
    )
}
