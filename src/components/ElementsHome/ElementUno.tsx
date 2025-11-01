// src/components/HeroSection.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Fondo1 from '../../assets/img/fondo1.avif';
import Fondo2 from '../../assets/img/fondo2.avif';
import Fondo3 from '../../assets/img/fondo3.avif';
import Fondo4 from '../../assets/img/fondo4.avif';
import Fondo5 from '../../assets/img/fondo5.avif';
import Fondo6 from '../../assets/img/fondo6.avif';
import Fondo7 from '../../assets/img/fondo7.avif';

import Autoplay from "embla-carousel-autoplay"
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const images = [Fondo1, Fondo2, Fondo3, Fondo4, Fondo5, Fondo6, Fondo7];
  const textItems = [
    {
      line2: "Transformación Integral: Forje Liderazgo, Disciplina y Resiliencia para el Siglo XXI.",
    },
    {
      line2: " El programa innovador que combina la disciplina con las competencias digitales esenciales para jóvenes de 8 a 17 años.",
    },
    {
      line2: "Desarrolla habilidades físicas y mentales que te servirán toda la vida. ¡Inscríbete ya!",
    },
    {
      line2: "¡Transforme la Indecisión en Liderazgo: Disciplina y Tecnología de Vanguardia para el Futuro de su Hijo!",
    },
    {
      line2: "¡Asegure Su Cupo! Inicie la Formación Ahora.",
    }
  ];
  return (
    <div className="relative flex justify-center h-[95vh]">
      <Carousel 
        className="h-full w-full absolute"
        plugins={[
          Autoplay({
            delay: 4500,
          }),
        ]}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} >
              <div className='h-[95vh]'>
                <img src={image} alt={`Slide ${index + 1}`} className='w-full h-full object-cover' />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-x-0 bottom-0 h-[95%] bg-gradient-to-t from-black to-transparent"></div>
      </Carousel>
      <div className='relative flex flex-col w-full max-w-6xl px-4 justify-between mt-8'>
        {/* NAV RESPONSIVO */}
        <div className='relative bg-black/80 backdrop-blur-sm rounded-full px-6 h-14 flex w-full items-center justify-between text-white z-50'>
          <div className='flex items-center'>
            <span className='text-xl font-extrabold text-[#8d8159] opacity-80 hover:opacity-100 transition-opacity'>rg technology</span>
          </div>
          
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
                <Link to="/productos" className='hover:text-[#8d8159] transition-colors'>Productos</Link>
                <Link to="/nosotros" className='hover:text-[#8d8159] transition-colors'>Nosotros</Link>
                <Link to="/contactanos" className='hover:text-[#8d8159] transition-colors'>Contactanos</Link>
                <Button className='bg-transparent border border-[#8d8159] text-[#8d8159] font-bold text-lg hover:bg-[#8d8159] hover:text-black transition-all duration-300 w-3/4'>
                  <Link to="/seccion/login">Login</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* TEXT */}
        <div className='text-right h-[35%] flex flex-col text-white items-end'>
          <p className='text-5xl md:text-6xl font-extrabold'>Curso de <span className='text-[#8d8159]'>Cadetes del futuro</span></p>
          <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                      delay: 4500,
                    }),
                  ]}
                  className="w-full mt-4"
            >
                <CarouselContent>
                    {textItems.map((text, index) => (
                        <CarouselItem key={index} className="text-right">
                            <p className='w-full md:w-[65%] text-lg md:text-xl ml-auto'>{text.line2}</p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
