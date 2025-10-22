// src/components/CenteredContent.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import EscudoEcuador from '@/img/Escudo_de_Ecuador.png'
import TrueFocus from '../../hooks/gsap/TrueFocus';

const CenteredContent: React.FC = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center text-white">

      {/* Título <h1 className="text-xl md:text-2xl font-bold mb-8">Título</h1>*/}
      <div className='text-xl md:text-2xl font-bold mb-8'>
        <TrueFocus 
          sentence="Nuestro enfoque"
          manualMode={false}
          blurAmount={5}
          borderColor="#46412d"
          animationDuration={1.5}
          pauseBetweenAnimations={1}
        />
      </div>
      
      {/* Contenedor de la Imagen */}
      <Card className="w-full max-w-sm md:max-w-auto bg-transparent mb-14 h-100 border-none">
        <img className='h-full w-auto' src={EscudoEcuador} alt="" />
      </Card>
      
      {/* Contenedor de los textos */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 text-center w-full justify-evenly">
        <span className="text-lg md:text-2xl font-extrabold">Disciplina Integral y Salud Mental</span>
        <span className="text-lg md:text-2xl font-extrabold">Liderazgo y Competencia Social</span>
        <span className="text-lg md:text-2xl font-extrabold">Futuro Digital y Financiero</span>
      </div>

    </div>
  );
};

export default CenteredContent;