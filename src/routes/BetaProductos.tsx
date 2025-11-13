import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
//Imagenes
import PT from "../assets/img/P-T.avif"
import PC from "../assets/img/P-C.avif"
import PF from "../assets/img/P-F.avif"
import PSB from "../assets/img/P-SB.avif"
//Componentes
import BetaCalendario from "@/components/ElementsHome/BetaCalendario";
import BetaFinanzas from "@/components/ElementsHome/BetaFinanzas";
import BetaTarjetasEstudio from "@/components/ElementsHome/BetaTarjetasEstudio";
import BetaSuperBen from "@/components/ElementsHome/BetaSupenBen";
import AuthBetaPage from "@/components/ElementsHome/AuthBetaPage";
//
const productInfo = {
    "Tarjetas de estudio": {
        titulo: "El objetivo principal de las tarjetas de estudio se enmarca en el propósito general de las herramientas tecnológicas de la plataforma:",
        item1:"Organización Académica y Seguimiento del Progreso",
        item2:"Gestión de Actividades",
        description: "Son tarjetas de estudio clasificadas como herramientas de aprendizaje con IA, su característica distintiva es que son personalizadas. Esto sugiere que la IA adapta el contenido o el formato de las tarjetas a las necesidades específicas de aprendizaje de cada cadete.",
        image: PT,
    },
    "Calendario dinamico": {
        titulo:"El objetivo central de estas herramientas es doble:",
        item1:"Organización Académica",
        item2:"Seguimiento del Progreso",
        description: "Es un calendario dinámico, específicamente, es un calendario conectado con actividades. Esto sugiere que automáticamente integra o enlaza las actividades del curso con la programación del cadete. Como parte de las herramientas gamificadas con IA, el calendario dinámico apoya la gestión de notas y actividades.",
        image: PC,
    },
    "Finanzas personales": {
        titulo:"La Herramienta de finanzas personales es un componente crucial de la plataforma educativa gamificada, utilizando tecnología avanzada para apoyar el desarrollo integral de los cadetes con:",
        item1:"Clasificación Tecnológica",
        item2:"Propósito de la IA",
        description: "Aunque la herramienta apoya la organización en general, está directamente relacionada con una de las habilidades clave que el programa busca desarrollar, la Herramienta sirve como un recurso digital avanzado que ayuda a los cadetes a practicar la disciplina y la responsabilidad mediante la gestión de sus actividades y la aplicación práctica de los conocimientos de administración y ahorro adquiridos en el curso.",
        image: PF,
    },
    "SuperBen": {
      description: "SuperBen es su asistente personal inteligente. Desde la gestión de tareas hasta la automatización de recordatorios, SuperBen está diseñado para aumentar su productividad y simplificar su vida diaria.",
      image: PSB,
    }
  };

const productNames = Object.keys(productInfo);

export default function BetaProductos(){
    const [api, setApi] = useState<CarouselApi>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(productNames[1]);

    useEffect(() => {
        if (!api) {
          return
        }
        const selectedIndex = productNames.indexOf(selectedProduct);
        api.scrollTo(selectedIndex);
    }, [api, selectedProduct])

    useEffect(() => {
        if (!api) {
          return
        }

        const onSelect = () => {
          const selectedIndex = api.selectedScrollSnap();
          setSelectedProduct(productNames[selectedIndex]);
        }

        api.on("select", onSelect)

        return () => {
          api.off("select", onSelect)
        }
    }, [api])

    return (
        <div>
            <div className="w-full relative flex justify-center">
                {/*Nav*/}
                <div className="w-full absolute top-0 left-0 z-50 flex justify-center">
                    <div className='relative flex flex-col w-full max-w-7xl px-4 mt-8'>
                        <div className='relative bg-white/10 backdrop-blur-sm rounded-full px-6 h-14 flex w-full items-center justify-between'>
                            <Link to={"/"} className='flex items-center'>
                                <span className='text-xl font-extrabold text-[#8d8159] opacity-80 hover:opacity-100 transition-opacity'>rg technology</span>
                            </Link>
                            
                            {/* Menú de Escritorio */}
                            <div className='hidden md:flex items-center space-x-4 font-bold text-white text-base'>
                                <Link to="/productos" className='hover:text-[#8d8159] transition-colors'>Productos</Link>
                                <Link to="/nosotros" className='hover:text-[#8d8159] transition-colors'>Nosotros</Link>
                                <Link to="/contactanos" className='hover:text-[#8d8159] transition-colors'>Contactanos</Link>
                                <Button className='bg-transparent text-[#8d8159] font-bold text-lg hover:bg-[#8d8159] hover:text-black transition-all duration-300'>
                                    <Link to="/seccion/login">Login</Link>
                                </Button>
                            </div>

                            {/* Botón de Hamburguesa */}
                            <div className="md:hidden">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                                </button>
                            </div>

                            {/* Menú Móvil Desplegable */}
                            {isMenuOpen && (
                                <div className="md:hidden absolute top-16 left-0 w-full bg-black/90 rounded-lg shadow-lg py-4">
                                <div className="flex flex-col items-center space-y-4">
                                    <Link to="/productos" className='text-[#8d8159]'>Productos</Link>
                                    <Link to="/nosotros" className='hover:text-[#8d8159] transition-colors'>Nosotros</Link>
                                    <Link to="/contactanos" className='hover:text-[#8d8159] transition-colors'>Contactanos</Link>
                                    <Button className='bg-transparent border border-[#8d8159] text-[#8d8159] font-bold text-lg hover:bg-[#8d8159] hover:text-black transition-all duration-300 w-3/4'>
                                    <Link to="/seccion/login">Login</Link>
                                    </Button>
                                </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <h2>Productos</h2>
            {/*Seccion de Descripcion de productos*/}
            <div className="px-4 md:px-10 mt-35">
                {/*Barra de productos*/}
                <div className="bg-[#171717] w-full md:w-[70%] lg:w-[50%] text-white rounded-lg h-auto md:h-12 mb-10 mx-auto">
                    <ul className="flex flex-col md:flex-row justify-around p-4 items-center h-full space-y-2 md:space-y-0 md:space-x-4">
                        {productNames.map(name => (
                            <li 
                                key={name} 
                                onClick={() => setSelectedProduct(name)}
                                className={`cursor-pointer transition-colors duration-300 ${selectedProduct === name ? 'text-[#8d8159] border-b-2 border-[#8d8159]' : 'hover:text-[#8d8159]'}`}>
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
                {/*Contenidos de productos*/}
                <div className="flex justify-center items-center mb-20">
                    <Carousel setApi={setApi} className="w-full max-w-xs">
                        <CarouselContent>
                            {productNames.map((name) => (
                                <CarouselItem key={name}>
                                    <div className="p-1">
                                        <div className="h-100 rounded-lg overflow-hidden">
                                            <img src={productInfo[name].image} alt={`Imagen de ${name}`} className="w-full h-full object-contain"/>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <div className="">
                    {selectedProduct === "Tarjetas de estudio" ? <BetaTarjetasEstudio/> : selectedProduct === "Calendario dinamico" ? <BetaCalendario/> : selectedProduct === "Finanzas personales" ? <AuthBetaPage/> : selectedProduct === "SuperBen" ? <BetaSuperBen/> : null}
                </div>
            </div>
        </div>
    )
}
