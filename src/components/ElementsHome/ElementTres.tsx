// src/components/CourseView.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// Datos de ejemplo para el contenido de los módulos
const modulesContent = [
  {id:'Módulo 1',title:'Cadete aspirante', content:'Es la primera etapa en el proceso de formación. En este nivel, el cadete se enfoca en recibir una "Instrucción formal", lo que implica el aprendizaje de los fundamentos, las reglas y los conocimientos básicos necesarios para avanzar en su carrera. '},
  {id:'Módulo 3', title: 'Cadete en formación', content:'Se pone un énfasis especial en el Desarrollo personal y proyección, con un enfoque clave en la comunicación efectiva y oratoria. Esto significa que el entrenamiento no solo se limita a lo técnico, sino que también incluye el aprendizaje de habilidades para expresarse con claridad, hablar en público y liderar con confianza, preparando al cadete para roles de mayor responsabilidad.'},
  {id:'Módulo 2', title:'Cadete especialista', content:'se amplía para incluir temas modernos y esenciales para la vida profesional. Se forma a los cadetes en Finanzas personales, enseñándoles a manejar su dinero y a ahorrar. Además, se les capacita en Ética digital y reputación online para una conducta responsable en el mundo digital, y se les introduce en la programación para desarrollar habilidades técnicas relevantes.'},
];

const CourseView: React.FC = () => {

  return (
    <div className="min-h-screen text-white mb-25">
      {/* Título de la sección o página */}
      <p className="text-[121px] font-black text-[#242424]">DESCRIPCIÓN DEL CURSO</p>

      {/* Contenedor Principal con diseño responsive */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Lado Izquierdo: Imagen de portada y Módulos */}
        <div className="w-full flex flex-col space-y-6">
          <div className="p-4 md:p-6 flex flex-col items-center justify-center">
            <span className="text-xl md:text-2xl font-bold text-center w-[80%] mb-5">
              En un mundo en constante cambio, donde los desafíos no solo están en la selva, sino también en el entorno digital, económico y social, nace un nuevo tipo de héroe
            </span>
            <span className='text-5xl font-extrabold opacity-25 text-[#ffcc01]'>¡EL CADETE DEL FUTURO!</span>
          </div>

          <div className="flex flex-row space-x-8 px-30 mb-12">
            {modulesContent.map((card, index) => (
              <Card
                key={`${card.id}-${index}`}
                className={`w-full py-6 md:py-8 text-lg md:text-xl bg-transparent font-semibold border-l-8 border-t-4 border-b-4 border-[#ffcc01]`}
              >
                <CardContent className="flex flex-col items-center justify-center h-60">
                  <div className="w-full flex flex-col items-center justify-center mb-4 overflow-hidden rounded-md">
                    <span className='text-white text-3xl font-extrabold mb-2'>{card.title}</span>
                    <span className='text-white text-sm'>{card.content}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className='flex items-center justify-center'>
            <Button className='p-4 bg-white text-black w-xs'>Ver más</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;