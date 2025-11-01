import HeroSection from "@/components/ElementsHome/ElementUno"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"
import ElementProductos from "@/components/ElementsHome/ElementProductos";
import Footer from "@/components/ElementsHome/Footer";
import Testimonios from "@/components/ElementsHome/Testimonios";
import ScrollVelocity from '../hooks/gsap/ScrollVelocity';
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
//Imagenes
import Fondo11 from "../assets/img/fondo11.avif"
import Fondo8 from "../assets/img/fondo8.avif"
import Fondo4 from "../assets/img/fondo4.avif"
import Fondo13 from "../assets/img/fondo13.avif"
import PT from "../assets/img/P-T.avif"
import PC from "../assets/img/P-C.avif"
import PF from "../assets/img/P-F.avif"
import PSB from "../assets/img/P-SB.avif"
import Abrigo1 from "../assets/img/Abrigo1.avif"
import Abrigo2 from "../assets/img/Abrigo2.avif"
import Camisa1 from "../assets/img/Camisa1.avif"
import Camisa2 from "../assets/img/Camisa2.avif"
import Tasa1 from "../assets/img/Tasa1.avif"
import Tasa2 from "../assets/img/Tasa2.avif"
import Tasa3 from "../assets/img/Tasa3.avif"
import Tomatodo1 from "../assets/img/TomaTodo1.avif"
import Tomatodo2 from "../assets/img/TomaTodo2.avif"
import Tomatodo3 from "../assets/img/TomaTodo3.avif"

const carouselItems = [
  {
    image: Fondo11,
    text: "Programa de supervivencia",
  },
  {
    image: Fondo8,
    text: "Salidas de campo a la naturaleza",
  },
  {
    image: Fondo4,
    text: "Campamento",
  },
  {
    image: Fondo13,
    text: "Cabo comamdo y actividades al aire libre",
  },
];

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

const merchandiseProducts = [
  {
    id: 1,
    title: "Camiseta 'Blanca'",
    description: "Hecha con algodón premium, resistente y cómoda para cualquier misión.",
    image: Camisa1, 
    whatsappUrl: "https://wa.me/593995875130?text=Hola, estoy interesado en la Camiseta Táctica 'Valor'."
  },
  {
    id: 2,
    title: "Taza Coleccionable 'Fuerza'",
    description: "Empieza tu día con la taza oficial. Cerámica de alta calidad.",
    image: Tasa3, 
    whatsappUrl: "https://wa.me/593995875130?text=Hola, estoy interesado en la Taza Coleccionable 'Fuerza'."
  },
  {
    id: 3,
    title: "Botella deportiva 'Blanca'",
    description: "Protección y estilo en el campo.",
    image: Tomatodo1, 
    whatsappUrl: "https://wa.me/593995875130?text=Hola, estoy interesado en la Gorra de Operador 'Sigilo'."
  },
  {
    id: 4,
    title: "Abrido 'Negro'",
    description: "Muestra tu lealtad con este abrigo de alta calidad.",
    image: Abrigo1, 
    whatsappUrl: "https://wa.me/593995875130?text=Hola, estoy interesado en el Parche Moral 'Honor'."
  },
  {
    id: 5,
    title: "Botella deportiva 'Verde'",
    description: "Mantente hidratado. Acero inoxidable, con aislamiento térmico.",
    image: Tomatodo2, 
    whatsappUrl: "https://wa.me/593995875130?text=Hola, estoy interesado en la Botella de Agua 'Hidra'."
  },
  {
    id: 6,
    title: "Camiseta 'Verde'",
    description: "Hecha con algodón premium, resistente y cómoda para cualquier misión",
    image: Camisa2, 
    whatsappUrl: "https://wa.me/593995875130?text=Hola, estoy interesado en la Botella de Agua 'Hidra'."
  },
  {
    id: 7,
    title: "Taza Coleccionable",
    description: "Empieza tu día con la taza oficial. Cerámica de alta calidad.",
    image: Tasa1, 
    whatsappUrl: "https://wa.me/593995875130?text=Hola, estoy interesado en la Taza Coleccionable 'Fuerza'."
  },
  {
    id: 8,
    title: "Abrido 'Blanco'",
    description: "Muestra tu lealtad con este abrigo de alta calidad.",
    image: Abrigo2, 
    whatsappUrl: "https://wa.me/593995875130?text=Hola, estoy interesado en el Parche Moral 'Honor'."
  },
  {
    id: 9,
    title: "Taza Coleccionable",
    description: "Empieza tu día con la taza oficial. Cerámica de alta calidad.",
    image: Tasa2, 
    whatsappUrl: "https://wa.me/593995875130?text=Hola, estoy interesado en la Taza Coleccionable 'Fuerza'."
  },
  {
    id: 10,
    title: "Botella deportiva 'Negra'",
    description: "Mantente hidratado. Acero inoxidable, con aislamiento térmico.",
    image: Tomatodo2, 
    whatsappUrl: "https://wa.me/593995875130?text=Hola, estoy interesado en la Botella de Agua 'Hidra'."
  }
  
];

export default function Productos(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(productNames[0]);
    const [api, setApi] = useState<CarouselApi>()
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        if (selectedIndex === index) {
            setSelectedIndex(null);
            api?.plugins().autoplay.play();
        } else {
            setSelectedIndex(index);
            api?.plugins().autoplay.stop();
        }
    };

    useEffect(() => {
        if (!api) return;
    
        const onDrag = () => {
            if (selectedIndex !== null) {
                setSelectedIndex(null);
                api.plugins().autoplay.play();
            }
        };
    
        api.on("dragStart", onDrag);
    
        return () => {
            api.off("dragStart", onDrag);
        };
    }, [api, selectedIndex]);

    return (
        <div className="">
            {/*Seccion de nav*/}
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
                                <Link to="/productos" className='text-[#8d8159] border-b-1'>Productos</Link>
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
            {/*Seccion de Imagenes carrusel*/}
            <div className="w-full flex justify-center mt-35 mb-20 px-4">
                <Carousel
                    className="w-full max-w-3xl"
                    plugins={[
                        Autoplay({
                            delay: 4000,
                            stopOnInteraction: false,
                        }),
                    ]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {carouselItems.map((item, index) => (
                            <CarouselItem key={index} className="basis-full">
                                <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
                                    <img 
                                        src={item.image} 
                                        alt={item.text} 
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40" />
                                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                                        <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                                            {item.text}
                                        </h2>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            {/*Seccion de Descripcion de productos*/}
            <div className="px-4 md:px-10">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center mb-20">
                    {/*Texto*/}
                    <div className="bg-[#171717] text-white rounded-lg p-6 order-2 md:order-1">
                        <h2 className="text-lg md:text-xl font-extrabold mb-4 text-[#8d8159]">{productInfo[selectedProduct].titulo}</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li className="text-sm md:text-base">{productInfo[selectedProduct].item1}</li>
                            <li className="text-sm md:text-base">{productInfo[selectedProduct].item2}</li>
                        </ul>
                        <p className="text-sm md:text-base">{productInfo[selectedProduct].description}</p>
                    </div>
                    {/*Imagenes*/}
                    <div className="h-100 rounded-lg overflow-hidden order-1 md:order-2">
                        <img src={productInfo[selectedProduct].image} alt={`Imagen de ${selectedProduct}`} className="w-full h-full object-contain"/>
                    </div>
                </div>
            </div>
            
            {/*Seccion de Carrusel de productos */}
            <div className="relative text-white px-4 md:px-10 mb-20">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold">Patrocina nuestro proyecto</h2>
                    <p className="text-sm md:text-base max-w-2xl mx-auto mt-2">Por la compra de cada producto tendrás grandes beneficios en todo rg technology</p>
                </div>
                <Carousel
                    setApi={setApi}
                    className="w-full"
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnInteraction: true,
                        }),
                    ]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-4">
                        {merchandiseProducts.map((product, index) => (
                            <CarouselItem key={product.id} className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div 
                                    className="cursor-pointer"
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div className={`transform transition-all duration-300 ease-in-out ${selectedIndex === index ? 'scale-105 z-50 relative' : 'scale-100'}`}>
                                        <Card className={`w-full bg-[#171717] border-neutral-800 text-white overflow-hidden transition-opacity duration-300 ${selectedIndex !== null && selectedIndex !== index ? 'opacity-30' : 'opacity-100'}`}>
                                            <CardContent className="p-0">
                                                <img src={product.image} alt={product.title} className="w-full h-48 object-cover"/>
                                                <div className="p-4">
                                                    <h3 className="text-lg font-bold text-[#8d8159]">{product.title}</h3>
                                                    <p className="text-sm text-neutral-300 mt-1 h-10">{product.description}</p>
                                                    <Button asChild className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold">
                                                        <a href={product.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                                            Contactar por WhatsApp
                                                        </a>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            {/*Seccion de marcas*/}
            <div className="flex flex-col">
                <span className="text-[#8d8159] text-5xl font-extrabold text-center mb-8">Marcas que nos apoyan</span>
                <ScrollVelocity
                    texts={['rg technology', 'ssedee']} 
                    velocity={100} 
                    className="custom-scroll-text text-white opacity-15 "
                />
            </div>
            {/*Seccion de Testimonios*/}
            <Testimonios/>
            {/*Seccion de Footer */}
            <Footer/>
        </div>
    )
}