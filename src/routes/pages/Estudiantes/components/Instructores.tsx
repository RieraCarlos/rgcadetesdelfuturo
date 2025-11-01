// pages/InstructorsPage.js
import React, { useEffect, useState } from 'react';
import { instructors } from './componentsInstructores/InstructoresData';
import InstructorsList from './componentsInstructores/InstructoresList';
import InstructorProfile from './componentsInstructores/InstructoresPerfil';

const InstructorsPage = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  // Lógica para manejar la navegación entre la lista y el perfil en móviles
  const isMobile = window.innerWidth < 768;
  const showList = !isMobile || !selectedInstructor;
  const showProfile = !isMobile || selectedInstructor;

  console.log('InstructorsPage render - selectedInstructor:', selectedInstructor);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Vista de lista (siempre en escritorio, en móvil solo si no hay selección) */}
        {showList && (
          <div className="w-full md:w-1/3">
            <InstructorsList
              onSelectInstructor={setSelectedInstructor}
              selectedInstructorId={selectedInstructor?.id}
            />
          </div>
        )}

        {/* Vista de perfil (siempre en escritorio, en móvil solo si hay una selección) */}
        {showProfile && (
          <div className="w-full md:w-2/3">
            <InstructorProfile instructor={selectedInstructor} />
          </div>
        )}
      </div>
    </div>
    
  );
};

export default InstructorsPage;