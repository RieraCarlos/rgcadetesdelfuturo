import { AppSidebar } from "./components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"
import { type NavMainItem } from "./components/nav-main"
import { type NavProjectItem } from "./components/nav-projects"

// Importar los componentes de las paginas
import Profile from "./components/Profile"
import Asistencia from "./components/Asistencia"
import CalificarInsignias from "./components/CalificarInsignias"
import CrearInsignias from "./components/CrearInsignias"
import CrearTareas from "./components/CrearTareas"

export default function HomeInstructores() {
  const [activeItemTitle, setActiveItemTitle] = React.useState("Home")
  const [activeItemTitleProject, setActiveItemTitleProject] = React.useState("")
  //nav main
  const handleMainNavItemClick = (item: NavMainItem) => {
    setActiveItemTitle(item.title);
    setActiveItemTitleProject('');    
  }
  // nav project
  const handleProjectNavItemClick = (item: NavProjectItem) => {
    setActiveItemTitleProject(item.title);
    setActiveItemTitle('');

  }
  const activePage = activeItemTitle || activeItemTitleProject;
  // Diccionario de componentes
  const pages = {
    Home: <Profile />,
    'Crear tareas': <CrearTareas />,
    'Crear insignias': <CrearInsignias />,
    'Calificar insignias': <CalificarInsignias />,
    Asistencia: <Asistencia />
  }
  type PagesType = {
    [key: string]: React.ReactNode
  }
  const typedPages = pages as PagesType

  return (
    <SidebarProvider>
      <AppSidebar 
        onMainNavItemClick={handleMainNavItemClick}
        activeItemTitle={activeItemTitle}
        onNavProjectClick={handleProjectNavItemClick}
        activeItemTitleProject={activeItemTitleProject}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Panel
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Instructor</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-0">
          {activePage && typedPages[activePage] && React.isValidElement(typedPages[activePage]) ? React.cloneElement(typedPages[activePage], { key: activePage }) : null}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
