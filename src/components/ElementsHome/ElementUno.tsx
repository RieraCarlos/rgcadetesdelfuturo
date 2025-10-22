// src/components/HeroSection.tsx
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Fondo1 from '../../img/Fondo1.jpg';
import Fondo2 from '../../img/fondo2.jpg';
import Fondo3 from '../../img/fondo3.jpg';
import Fondo4 from '../../img/fondo4.jpg';
import Fondo5 from '../../img/fondo5.jpg';
import Fondo6 from '../../img/fondo6.jpg';
import Fondo7 from '../../img/fondo7.jpg';

import Autoplay from "embla-carousel-autoplay"

const HeroSection: React.FC = () => {
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
              <div className='h-[95vh] bg-amber-200'>
                <img src={image} alt={`Slide ${index + 1}`} className='w-full object-cover' />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-x-0 bottom-0 h-[95%] bg-gradient-to-t from-black to-transparent"></div>
      </Carousel>
      <div className='relative flex flex-col  w-[85%] justify-between mt-8'>
        {/* NAV */}
        <div className='bg-black rounded-full px-6 h-15 flex w-full items-center'>
          <div className='flex justify-between w-full text-white'>
            <div className='flex items-center'>
              <span className='text-xl font-extrabold text-[#8d8159] opacity-30 hover:opacity-100'>rg technology</span>
            </div>  
            <div className='space-x-4 font-bold text-white text-base'>
              <a href="" className='hover:text-[#8d8159]'>Productos</a>
              <a href="" className='hover:text-[#8d8159]'>Nosotros</a>
              <a href="" className='hover:text-[#8d8159]'>Contactanos</a>
              <Button className='bg-transparent text-[#8d8159] font-bold text-lg hover:bg-[#8d8159] hover:text-black'>
                <a href="" className=' '>Login</a>
              </Button>
            </div>
          </div>
        </div>
        {/* TEXT */}
        <div className='text-right h-[30%] flex flex-col text-white items-end'>
          <p className='text-6xl font-extrabold'>Curso de <span className='text-[#8d8159]'>Cadetes del futuro</span></p>
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
                  className="w-full"
            >
                <CarouselContent>
                    {textItems.map((text, index) => (
                        <CarouselItem key={index} className="text-right">
                            <p className='w-[65%] text-xl ml-auto'>{text.line2}</p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
          {/*<p className='w-[65%] text-xl'>Para niños de 8 años hasta jóvenes de 17 años, preparándolos para afrontar desafíos con carácter, compromiso e innovación</p>*/}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;