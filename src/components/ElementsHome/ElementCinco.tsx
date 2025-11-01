// src/components/HorizontalScroll.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import fondo2 from '../../assets/img/fondo1.avif';
import fondo3 from '../../assets/img/fondo8.avif';
import fondo4 from '../../assets/img/fondo9.avif';
import fondo5 from '../../assets/img/fondo11.avif';
import RotatingText from '../../hooks/gsap/RotatingText';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useIsMobile } from '../../hooks/use-mobile';

// Datos de ejemplo para las tarjetas
const cardData = [
  { id: 1, title: 'Comunidad juvenil', image: fondo2, description: 'Fomentamos la camaradería y el trabajo en equipo.' },
  { id: 2, title: 'Ambiente selvático', image: fondo3, description: 'Aprende a adaptarte y superar desafíos en la naturaleza.' },
  { id: 3, title: 'Amoldamiento', image: fondo4, description: 'Desarrolla tu carácter y disciplina con nuestro entrenamiento.' },
  { id: 4, title: 'Supervivencia', image: fondo5, description: 'Adquiere habilidades prácticas para cualquier situación.' },
];

const DotButton: React.FC<{ selected: boolean; onClick: () => void }> = ({ selected, onClick }) => (
  <button
    className={`w-3 h-3 rounded-full mx-1 ${selected ? 'bg-white' : 'bg-gray-500'}`}
    onClick={onClick}
    type="button"
  />
);

const HorizontalScroll: React.FC = () => {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, active: isMobile }, [
    Autoplay({ stopOnInteraction: false, delay: 4000 })
  ]);
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleCardClick = (cardId: number) => {
    if (isMobile) {
      setClickedCard(clickedCard === cardId ? null : cardId);
    }
  };

  return (
    <div className="text-white mb-10">
      <div className="p-4 md:p-14">
        {/* Título de la sección */}
        <div className='flex flex-row justify-start mb-10'>
          <div className="flex items-center justify-center pb-0.5 sm:pb-1 md:pb-1 mr-2 ">
            <span className="text-3xl md:text-4xl font-bold">Por que somos</span>
          </div>
          <RotatingText
            texts={['Cadetes', 'Aventureros', 'Valientes', 'Unidad!']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-[#46412d] text-black text-xl md:text-4xl font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 "
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </div>
        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className={isMobile ? "flex" : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"}>
            {cardData.map((card) => (
              <div key={card.id} className={isMobile ? "flex-[0_0_100%] min-w-0" : ""}>
                <Card 
                  data-state={clickedCard === card.id ? 'clicked' : 'unclicked'}
                  onClick={() => handleCardClick(card.id)}
                  className="h-70 bg-transparent border-l-0.1 border-t-4 border-b-4 border-r-8 border-[#46412d] rounded-xl group cursor-pointer"
                >
                  <CardContent className="flex flex-col items-center justify-center h-full group"> 
                    <div className="relative w-full flex items-center justify-center mb-4 overflow-hidden rounded-md">
                        <img 
                            src={card.image} 
                            alt={card.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-data-[state=clicked]:scale-105" 
                        />
                        
                        {/* LÁMINA NEGRA Y DESCRIPCIÓN */}
                        <div 
                            className="
                                absolute inset-0 
                                bg-black 
                                transform translate-y-full 
                                group-hover:translate-y-0 
                                group-data-[state=clicked]:translate-y-0
                                transition-transform 
                                duration-500 
                                ease-in-out
                                flex items-center justify-center p-4
                            "
                        >
                            <p 
                                className="
                                    text-white 
                                    opacity-0 
                                    group-hover:opacity-100 
                                    group-data-[state=clicked]:opacity-100
                                    transition-opacity 
                                    duration-300 
                                    delay-200 
                                    text-center
                                "
                            >
                                {card.description}
                            </p>
                        </div>
                        
                    </div>
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        {isMobile && (
          <div className="flex justify-center mt-4">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                selected={index === activeIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalScroll;