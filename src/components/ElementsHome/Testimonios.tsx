// src/components/TestimonialsScroll.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Instructor2 from '../../img/Instructor2.png'

// Datos de ejemplo para los testimonios
const testimonialsData = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    nombre: 'Autor 1',
    author: Instructor2,
  },
  
];

const TestimonialsScroll: React.FC = () => {
  // Duplicamos los datos para crear el efecto de scroll infinito
  const testimonialsToRender = [...testimonialsData];

  return (
    <div className=" text-white">
      <div className="p-4 md:p-8">
        
        {/* Título de la sección */}
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">Testimonios</h1>

        {/* Contenedor del scroll */}
        <div className="relative overflow-hidden">
          <div className="flex flex-row justify-center items-center space-x-6 animate-scroll-left">
            {testimonialsToRender.map((testimonial, index) => (
              <Card 
                key={`${testimonial.id}-${index}`} 
                className="flex-shrink-0 w-[80%] h-64 bg-transparent border-r-0.5 border-l-8 border-t-4 border-b-4 border-white rounded-xl text-white"
              >
                <CardContent className="flex flex-col p-6 h-full justify-between">
                  <p className="text-base sm:text-lg italic flex-grow">{testimonial.text}</p>
                  <div className="flex justify-end items-center mt-4">
                    <span className="text-sm font-semibold mr-2">{testimonial.nombre}</span>
                    <div className="w-15 h-15">
                      <img className='rounded-full' src={testimonial.author} alt="" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsScroll;