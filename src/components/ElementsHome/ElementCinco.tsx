// src/components/HorizontalScroll.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import fondo2 from '../../img/Fondo1.jpg';
import fondo3 from '../../img/fondo8.jpg';
import fondo4 from '../../img/fondo9.jpg';
import fondo5 from '../../img/fondo11.jpg';
import RotatingText from '../../hooks/gsap/RotatingText'


// Datos de ejemplo para las tarjetas
const cardData = [
  { id: 1, title: 'Comunidad juvelin', image: fondo2, description: 'Fomentamos la camaradería y el trabajo en equipo.' },
  { id: 2, title: 'Ambiente selvático', image: fondo3, description: 'Aprende a adaptarte y superar desafíos en la naturaleza.' }, // TODO: Asegúrate de importar o usar una URL pública para las demás imágenes
  { id: 3, title: 'Amoldamiento', image: fondo4, description: 'Desarrolla tu carácter y disciplina con nuestro entrenamiento.' },
  { id: 4, title: 'Supervivencia', image: fondo5, description: 'Adquiere habilidades prácticas para cualquier situación.' },
];

const HorizontalScroll: React.FC = () => {
  return (
    <div className="text-white">
      <div className="p-4 md:p-14">
        {/* Título de la sección */}
        <div className='flex flex-row justify-start mb-10'>
          <div className="flex items-center justify-center pb-0.5 sm:pb-1 md:pb-1 mr-2 ">
            <span className="text-xl md:text-4xl font-bold">Por que somos</span>
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
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cardData.map((card, index) => (
              <Card 
                key={`${card.id}-${index}`} 
                className="h-70 bg-transparent border-l-0.1 border-t-4 border-b-4 border-r-8 border-[#46412d] rounded-xl group"
              >
                <CardContent className="flex flex-col items-center justify-center h-full group"> 
                  <div className="relative w-full flex items-center justify-center mb-4 overflow-hidden rounded-md">
                      <img 
                          src={card.image} 
                          alt={card.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      
                      {/* LÁMINA NEGRA Y DESCRIPCIÓN */}
                      <div 
                          className="
                              absolute inset-0 
                              bg-black 
                              transform translate-y-full 
                              group-hover:translate-y-0 
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;