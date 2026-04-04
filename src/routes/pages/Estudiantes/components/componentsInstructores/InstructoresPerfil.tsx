// components/InstructorProfile.js
import React from 'react';
import Instructor1 from '../../../../../assets/img/Instructor1.avif';

interface InstructorProfileProps {
  instructor: any;
}

const InstructorProfile: React.FC<InstructorProfileProps> = ({ instructor }) => {
  if (!instructor) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-12 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
          <span className="text-4xl text-gray-300">👤</span>
        </div>
        <p className="text-xl font-medium">Selecciona un instructor para ver su perfil detallado.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-12 animate-in slide-in-from-right-4 duration-500 pt-8 md:pt-12">
      
      {/* Encabezado del perfil */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-12">
        <div className="relative mb-6">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,1,1)] overflow-hidden bg-white">
            <img 
              src={Instructor1} 
              alt={instructor.name} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#ffcc01] border-2 border-black p-2 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-xl">⭐</span>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter mb-2">
          {instructor.name}
        </h2>
        <span className="px-4 py-1 bg-black text-[#ffcc01] text-sm font-bold rounded-full uppercase tracking-widest">
          {instructor.role}
        </span>
      </div>

      {/* Contenedor de la cuadrícula de información */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Biografía */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-black text-xl text-black dark:text-[#ffcc01] mb-3 uppercase tracking-tight">
            📜 Biografía
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            {instructor.bio}
          </p>
        </div>

        {/* Estudios */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-black text-xl text-black dark:text-[#ffcc01] mb-3 uppercase tracking-tight">
            🎓 Estudios
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            {instructor.studies}
          </p>
        </div>

        {/* Experiencia */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-black text-xl text-black dark:text-[#ffcc01] mb-3 uppercase tracking-tight">
            💼 Experiencia
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            {instructor.experience}
          </p>
        </div>
        
        {/* Habilidades */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-black text-xl text-black dark:text-[#ffcc01] mb-3 uppercase tracking-tight">
            ⚡ Habilidades
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            {instructor.skills}
          </p>
        </div>
        
        {/* Contactos */}
        <div className="bg-[#ffcc01] p-6 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:col-span-2">
          <h3 className="font-black text-xl text-black mb-3 uppercase tracking-tight">
            📞 Canales de Contacto
          </h3>
          <p className="text-black font-bold text-lg">
            {instructor.contact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;