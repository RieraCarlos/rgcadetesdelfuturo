// src/components/CourseView.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaFileDownload } from "react-icons/fa";
// Datos de ejemplo para el contenido de los módulos
const modulesContent = [
  {id:'Módulo 1',title:'Primer Nivel', subtitle: 'Cadete aspirante',content:'Es la primera etapa en el proceso de formación. En este nivel, el cadete se enfoca en recibir una "Instrucción formal", lo que implica el aprendizaje de los fundamentos, las reglas y los conocimientos básicos necesarios para avanzar en su carrera. '},
  {id:'Módulo 3', title: 'Segundo Nivel', subtitle:'Cadete en formación',content:'Se pone un énfasis especial en el Desarrollo personal y proyección, con un enfoque clave en la comunicación efectiva y oratoria. Esto significa que el entrenamiento no solo se limita a lo técnico, sino que también incluye el aprendizaje de habilidades para expresarse con claridad, hablar en público y liderar con confianza, preparando al cadete para roles de mayor responsabilidad.'},
  {id:'Módulo 2', title:'Tercer Nivel',subtitle:'Cadete especialista', content:'Se amplía para incluir temas modernos y esenciales para la vida profesional. Se forma a los cadetes en Finanzas personales, enseñándoles a manejar su dinero y a ahorrar. Además, se les capacita en Ética digital y reputación online para una conducta responsable en el mundo digital, y se les introduce en la programación para desarrollar habilidades técnicas relevantes.'},
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
            <span className='text-5xl font-extrabold text-[#46412d]'>¡EL CADETE DEL FUTURO!</span>
          </div>

          <div className="flex flex-row space-x-8 px-30 mb-12">
            {modulesContent.map((card, index) => (
              <Card
                key={`${card.id}-${index}`}
                className={`w-full h-70 py-6 md:py-8 text-lg md:text-xl bg-transparent font-semibold border-l-0.1 border-t-4 border-b-4 border-r-8 border-[#46412d]`}
              >
                <CardContent className="flex flex-col items-center justify-center h-full group">
                  <div className="relative w-full flex flex-col items-center justify-center mb-4 overflow-hidden rounded-md h-full">
                    <div className='w-full transition-transform duration-500 group-hover:scale-105'>
                      <span className='text-white text-3xl font-extrabold mb-2'>{card.title}</span>
                    </div>
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
                          flex
                          flex-col 
                          items-center 
                          justify-center
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
                            text-xl
                            font-bold
                        "
                      >
                        {card.subtitle}
                      </p>
                      <span className='
                        text-white
                        opacity-0 
                        group-hover:opacity-100 
                        transition-opacity 
                        duration-300 
                        delay-200
                        text-center
                        text-xs'
                      >
                        {card.content}
                      </span>

                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <Button className="bg-[#46412d] text-white text-xl flex items-center gap-2 p-6 font-bold cursor-pointer hover:bg-transparent hover:text-[#46412d] hover:border-l-0.1 hover:border-t-1 hover:border-b-1 hover:border-r-2 hover:border-white transition-colors duration-300">
              <FaFileDownload className="text-2xl" />
              Descarga el temario
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;