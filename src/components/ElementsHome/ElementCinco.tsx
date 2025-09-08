// src/components/HorizontalScroll.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import fondo2 from '../../img/fondo2.jpg';
import fondo3 from '../../img/fondo7.jpg';
import fondo4 from '../../img/fondo5.jpg';
import fondo5 from '../../img/fondo8.jpg';
import RotatingText from '../../hooks/gsap/RotatingText'


// Datos de ejemplo para las tarjetas
const cardData = [
  { id: 1, title: 'Comunidad juvelin', image: fondo2 },
  { id: 2, title: 'Ambiente selvático', image: fondo3 }, // TODO: Asegúrate de importar o usar una URL pública para las demás imágenes
  { id: 3, title: 'Amoldamiento', image: fondo4 },
  { id: 4, title: 'Supervivencia', image: fondo5 },
];

const HorizontalScroll: React.FC = () => {
  return (
    <div className="text-white mb-5">
      <div className="p-4 md:p-14">
        {/* Título de la sección */}
        <div className='flex flex-row justify-start mb-10'>
          <div className="flex items-center justify-center pb-0.5 sm:pb-1 md:pb-1 mr-2 ">
            <span className="text-xl md:text-4xl font-bold">Por que somos</span>
          </div>
          <RotatingText
            texts={['Cadetes', 'Aventureros', 'Valientes', 'Unidad!']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-[#ffcc01] text-black text-xl md:text-4xl font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 "
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
        {/* Contenedor del scroll */}
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cardData.map((card, index) => (
              <Card 
                key={`${card.id}-${index}`} 
                className="h-70 bg-transparent border-l-8 border-t-4 border-b-4 border-r-0.1 border-[#ffcc01] rounded-xl"
              >
                <CardContent className="flex flex-col items-center justify-center h-full">
                  <div className="w-full flex items-center justify-center mb-4 overflow-hidden rounded-md">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;