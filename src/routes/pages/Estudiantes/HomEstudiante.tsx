import { AppSidebar } from "./components/app-sidebar"
import { NavActions } from "./components/nav-actions"
import { type NavMainItem } from "./components/nav-main"
import { type NavWorkspaceItem } from "./components/nav-workspaces"

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
import React from "react"

// Importar los componentes de las páginas
import Perfil from "./components/PerfilEstudiante"
import Tareas from "./components/TareasEstudiante"
import InstructorsPage from "./components/Instructores"
import BlogsComponents from "@/components/Blogs/BlogsComponent"
import TarjetasEstudio from "./components/TarjetasEstudio"
import NotasActividades from "./components/NotasActividades"
import Calendario from "./components/Calendario"
import FinanzasPersonales from "./components/FinanzasPersonales"
import CantosGuerra from "./components/CantosGuerra"


export default function HomEstudiante() {
    const [activeItemTitle, setActiveItemTitle] = React.useState<string>("Home");
    const [activeWorkspaceTitle, setActiveWorkspaceTitle] = React.useState<string>("");

    const handleMainNavItemClick = (item: NavMainItem) => {
      setActiveItemTitle(item.title);
      setActiveWorkspaceTitle("");
    }
     const handleNavWorkspacesItemClick = (item: NavWorkspaceItem) => {
      setActiveWorkspaceTitle(item.title);
      setActiveItemTitle("");
    }
    const handleFavoriteItemClick = (item: { name: string }) => {
      setActiveWorkspaceTitle(item.name);
      setActiveItemTitle("");
    }

    const activePage = activeItemTitle || activeWorkspaceTitle;

    // Diccionario de componentes
    const pages = {
        Home: <Perfil />,
        Tareas: <Tareas />,
        Instructores: <InstructorsPage />,
        Blog:<BlogsComponents/>,
        'Tarjetas de estudio':<TarjetasEstudio/>,
        'Notas y actividades':<NotasActividades/>,
        Calendario:<Calendario/>,
        'Mis finanzas personales': <FinanzasPersonales />,
        'Cantos de guerra': <CantosGuerra />,
        // Páginas específicas de tarjetas de estudio
        'Daily Journal & Reflection': <TarjetasEstudio selectedSetId="daily-journal" />,
        'Health & Wellness Tracker': <TarjetasEstudio selectedSetId="health-wellness" />,
        'Personal Growth & Learning Goals': <TarjetasEstudio selectedSetId="personal-growth" />,
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
              onNavWorkspacesItemClick={handleNavWorkspacesItemClick}
              activeWorkspaceTitle={activeWorkspaceTitle}
              onFavoriteItemClick={handleFavoriteItemClick}
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