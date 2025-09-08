// components/InstructorProfile.js
import React from 'react';
import Instructor1 from '../../../../../../img/Instructor1.png'

const InstructorProfile = ({ instructor }) => {
  if (!instructor) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Selecciona un instructor para ver su perfil.
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-12 rounded-3xl md:border-l-4 md:border-t-4 md:border-b-4 md:border-[#ffcc01]">
      
      {/* Encabezado del perfil */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-400 flex items-center justify-center mb-4">
          <img src={Instructor1} alt="" className="w-xl md:w-auto h-2xl md:h-[100px] rounded-full" />
        </div>
        <h2 className="text-xl md:text-3xl font-semibold">{instructor.name}</h2>
        <p className="text-sm md:text-base text-gray-400">{instructor.role}</p>
      </div>

      {/* Contenedor de la cuadrícula de información */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Biografía */}
        <div className="bg-[#030403] p-4 rounded-lg">
          <h3 className="font-bold text-lg md:text-xl text-[#ffcc01] mb-2">Pequeña Biografía</h3>
          <p className="text-sm text-gray-300">{instructor.bio}</p>
        </div>

        {/* Estudios */}
        <div className="bg-[#030403] p-4 rounded-lg border-2 border-gray-600">
          <h3 className="font-bold text-lg md:text-xl text-[#ffcc01] mb-2">Estudios</h3>
          <p className="text-sm text-gray-300">{instructor.studies}</p>
        </div>

        {/* Experiencia */}
        <div className="bg-[#030403] p-4 rounded-lg border-2 border-gray-600">
          <h3 className="font-bold text-lg md:text-xl text-[#ffcc01] mb-2">Experiencia</h3>
          <p className="text-sm text-gray-300">{instructor.experience}</p>
        </div>
        
        {/* Habilidades */}
        <div className="bg-[#030403] p-4 rounded-lg border-2 border-gray-600">
          <h3 className="font-bold text-lg md:text-xl text-[#ffcc01] mb-2">Habilidades</h3>
          <p className="text-sm text-gray-300">{instructor.skills}</p>
        </div>
        
        {/* Contactos */}
        <div className="bg-[#030403] p-4 rounded-lg border-2 border-gray-600 md:col-span-2">
          <h3 className="font-bold text-lg md:text-xl text-[#ffcc01] mb-2">Contactos</h3>
          <p className="text-sm text-gray-300">{instructor.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;