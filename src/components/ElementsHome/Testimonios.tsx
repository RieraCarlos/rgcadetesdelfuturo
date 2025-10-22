import { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Usaré una variedad de avatares para un look más dinámico
import AsesorImg from '../../img/Asesor.png';
import AsesoraImg from '../../img/Asesora.png';
import Instructor1Img from '../../img/Instructor1.png';
import Instructor2Img from '../../img/Instructor2.png';

// Definimos un tipo más completo para los testimonios
type Testimonio = {
  id: number;
  texto: string;
  nombre: string;
  rol: string;
  avatar: string;
};

const testimoniosData: Testimonio[] = [
    {
        id: 1,
        texto: '¡Estoy en el puesto 5 del Ranking de los 10 mejores! La gamificación realmente me motiva a avanzar y a seguir mejorando mi disciplina. Siempre estoy revisando la Red social interna para ver quién más está cerca de mi puntaje.',
        nombre: 'Carlos G.',
        rol: 'Aspirante a Cadete',
        avatar: Instructor1Img,
    },
    {
        id: 2,
        texto: 'Gracias a la plataforma, mi vida es mucho más organizada. Las herramientas de aprendizaje con IA son increíbles. Uso las tarjetas de estudio personalizadas y el calendario dinámico para no olvidar nunca una tarea.',
        nombre: 'Jennifer M.',
        rol: 'Estudiante Destacada',
        avatar: AsesoraImg,
    },
    {
        id: 3,
        texto: 'Las actividades son la parte más valiosa. Al principio, las posiciones básicas del cadete parecían difíciles, pero ahora siento que desarrollo nuevas fortalezas en disciplina y resiliencia. El módulo de Desarrollo personal me ha ayudado mucho.',
        nombre: 'Edder J.',
        rol: 'Cadete en Formación',
        avatar: Instructor2Img,
    },
    {
        id: 4,
        texto: 'Mi principal meta era que mi hijo desarrollara un carácter fuerte. Me da mucha satisfacción ver cómo el programa combina la instrucción académica con la disciplina. Los instructores realmente le están enseñando liderazgo y trabajo en equipo.',
        nombre: 'Maria T.',
        rol: 'Madre de Familia',
        avatar: AsesoraImg,
    },
];

const Testimonios: FC = () => {
  const [indiceActual, setIndiceActual] = useState(0);

  const irAlSiguiente = useCallback(() => {
    setIndiceActual((prev) => (prev + 1) % testimoniosData.length);
  }, []);

  const irAlAnterior = () => {
    setIndiceActual((prev) => (prev - 1 + testimoniosData.length) % testimoniosData.length);
  };

  useEffect(() => {
    const timer = setInterval(irAlSiguiente, 7000); // Auto-play cada 7 segundos
    return () => clearInterval(timer); // Limpieza al desmontar
  }, [irAlSiguiente]);

  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Testimonios de Nuestra Comunidad</h2>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Contenedor del carrusel con overflow hidden */}
          <div className="overflow-hidden relative h-80 md:h-64">
            {testimoniosData.map((testimonio, index) => (
              <div 
                key={testimonio.id}
                className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out"
                style={{ opacity: index === indiceActual ? 1 : 0, zIndex: index === indiceActual ? 10 : 1 }}
              >
                <Card className="bg-transparent border-none h-full text-white">
                  <CardContent className="flex flex-col items-center justify-center text-center p-6 h-full">
                    <p className="text-base md:text-lg italic mb-6">"{testimonio.texto}"</p>
                    <div className="flex items-center">
                      <img className='w-12 h-12 rounded-full mr-4' src={testimonio.avatar} alt={testimonio.nombre} />
                      <div>
                        <p className="font-bold text-lg" style={{color: '#8d8159'}}>{testimonio.nombre}</p>
                        <p className="text-sm text-gray-400">{testimonio.rol}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Botones de Navegación */}
          <button onClick={irAlAnterior} className="absolute top-1/2 left-0 md:-left-16 transform -translate-y-1/2 bg-[#46412d] p-2 rounded-full hover:bg-[#8d8159] transition-colors duration-300 z-20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button onClick={irAlSiguiente} className="absolute top-1/2 right-0 md:-right-16 transform -translate-y-1/2 bg-[#46412d] p-2 rounded-full hover:bg-[#8d8159] transition-colors duration-300 z-20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>

          {/* Indicadores de Puntos */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimoniosData.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setIndiceActual(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${indiceActual === index ? 'bg-[#8d8159]' : 'bg-[#46412d]'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
