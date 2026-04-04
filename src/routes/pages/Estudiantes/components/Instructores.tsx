// pages/InstructorsPage.js
import React, { useEffect, useState } from 'react';
import { instructors } from './componentsInstructores/InstructoresData';
import InstructorsList from './componentsInstructores/InstructoresList';
import InstructorProfile from './componentsInstructores/InstructoresPerfil';

const InstructorsPage = () => {
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);

  useEffect(() => {
    if (!selectedInstructor && instructors.length > 0) {
      setSelectedInstructor(instructors[0]);
    }
  }, [selectedInstructor]);

  // Lógica para manejar la navegación entre la lista y el perfil en móviles
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <div className='flex flex-col min-h-screen w-full'>
      {/* Barra horizontal solo en móvil */}
      {isMobile && (
        <InstructorsList
          variant="horizontal"
          onSelectInstructor={setSelectedInstructor}
          selectedInstructorId={selectedInstructor?.id}
        />
      )}

      <div className="flex flex-col md:flex-row flex-1">
        {/* Vista de lista (solo en escritorio) */}
        {!isMobile && (
          <div className="w-full md:w-1/3 border-r border-black/10">
            <InstructorsList
              onSelectInstructor={setSelectedInstructor}
              selectedInstructorId={selectedInstructor?.id}
            />
          </div>
        )}

        {/* Vista de perfil (siempre visible) */}
        <div className="w-full md:w-2/3">
          <InstructorProfile instructor={selectedInstructor} />
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;