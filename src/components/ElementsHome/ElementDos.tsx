// src/components/ContentSection.tsx
import React from 'react';
//import { Card, CardContent } from '@/components/ui/card';
import CardSwap, {Card} from '../../hooks/gsap/CardSwap'
import SplitText from "../../hooks/gsap/SplitText";


const ContentSection: React.FC = () => {
  return (
    <div className=" min-h-screen p-4 sm:p-6 md:p-12 text-white overflow-hidden">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 items-stretch">
        {/* Contenido 1 */}
        <div className="flex-1s bg-transparent text-white border-none max-w-1/2">
          <div className="flex items-center justify-center p-8 h-full">
            <SplitText
              text="“El 65% de los jóvenes pasa más de 6 horas al día frente a pantallas, pero menos del 10% utiliza ese tiempo para aprender habilidades”."
              className="text-2xl font-semibold text-center"
              delay={10}
              duration={2.5}
              ease="elastic.out(1,0.3)"
              splitType="words, chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
          </div>
        </div>
        <div className="flex-1 rounded-xl w-auto">
            <div className='flex h-[600px] relative '>
                <CardSwap
                    cardDistance={60}
                    verticalDistance={70}
                    delay={5000}
                    pauseOnHover={false}
                >
                    <Card>
                        <h3>⚪ sobreexposición a <span className='font-bold text-[#ffcc01]'>pantallas</span></h3>
                        <div className='h-full flex items-center justify-center'>
                            <img src="https://noticias.udec.cl/wp-content/uploads/2025/08/Freepik-ninos-sentados-con-dispositivos-1024x683.jpg" alt="Niños/as en pantallas" />
                        </div>
                    </Card>
                    <Card>
                        <h3>⚪ comportamiento <span className='font-bold text-[#ffcc01]'>desafiante</span></h3>
                        <div className='h-full flex items-center justify-center'>
                          <img src="https://www.amalgama7.com/wp-content/uploads/2025/07/TND-2048x1363-1.jpg" alt="" />
                        </div>
                    </Card>
                    <Card>
                        <h3>⚪ <span className='font-bold text-[#ffcc01]'>dificultades</span> en el aprendizaje</h3>
                        <div className='h-full flex items-center justify-center'>
                          <img src="https://www.altamed.org/sites/default/files/2023-07/homework.jpg" alt="" />
                        </div>
                    </Card>
                </CardSwap>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default ContentSection;