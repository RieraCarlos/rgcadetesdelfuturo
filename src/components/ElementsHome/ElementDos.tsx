// src/components/ContentSection.tsx
import React from 'react';
//import { Card, CardContent } from '@/components/ui/card';
import CardSwap, {Card} from '../../hooks/gsap/CardSwap'
import SplitText from "../../hooks/gsap/SplitText";


const ContentSection: React.FC = () => {
  return (
    <div className=" min-h-screen p-0 lg:p-12 text-white overflow-hidden">
      <div className="flex flex-col space-y-10 min-[1300px]:flex-row lg:space-x-6 lg:space-y-0 items-stretch">
        {/* Contenido 1 */}
        <div className="flex-1 bg-transparent text-white border-none w-full">
          <div className="flex items-start justify-center p-8 h-full flex-col">
            <SplitText
              text="¿Sabías que..."
              className="text-4xl lg:text-5xl font-bold text-center text-[#8d8159]"
              delay={10}
              duration={2.5}
              ease="elastic.out(1,0.3)"
              splitType="words, chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: -7 }}
              threshold={0.1}
              rootMargin="0"
              textAlign="left"
            />
            <SplitText
              text="más del 70% de los jóvenes llegan a la adultez sin la disciplina personal ni las competencias digitales que demanda el mundo actual?"
              className="text-lg lg:text-xl font-semibold text-center"
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
        {/*Contenido Dos*/}
        <div className="flex-1 rounded-xl w-auto ">
          <div className='flex h-[300px] min-[600px]:h-[600px] relative'>
            <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={false}
            >
                <Card >
                    <h3 className="text-lg lg:text-xl">⚪ Niños y jóvenes que carecen de <span className='font-bold text-[#8d8159]'>rutinas efectivas</span> y <span className='font-bold text-[#8d8159]'>resiliencia</span></h3>
                    <div className='h-full flex items-center justify-center'>
                        <img src="https://i.blogs.es/c46bf3/chico-triste-siendo-intimidado-tiro-medio/840_560.jpeg" alt="Niños/as en pantallas" className='w-full h-full object-cover rounded-xl'/>
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg lg:text-xl">⚪ Falta de conocimientos en <span className='font-bold text-[#8d8159]'>ética digital</span> y <span className='font-bold text-[#8d8159]'>finanzas personales</span></h3>
                    <div className='h-full flex items-center justify-center'>
                      <img src="https://www.caixabank.com/docs/contentmedia/52026/De-criptomonedas-a-influencers-finanzas-digitales-para-ninos.png" className='w-full h-full object-cover rounded-xl' alt="" />
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg lg:text-xl">⚪ Limitaciones en su <span className='font-bold text-[#8d8159]'>desarrollo académico</span></h3>
                    <div className='h-full flex items-center justify-center'>
                      <img src="https://www.altamed.org/sites/default/files/2023-07/homework.jpg" alt="" className='w-full h-full object-cover rounded-xl'/>
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