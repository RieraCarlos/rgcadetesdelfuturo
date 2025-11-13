// src/pages/AuthBetaPage.tsx
import React, { useState, useEffect } from 'react';
import AuthForm from './BetaFormF';
import FinanceDashboard from './BetaFinanzas'; // Tu componente de dashboard
import { Button } from '@/components/ui/button';

interface UserSession {
  name: string;
  avatar: string;
}

const STORAGE_KEY = 'userBetaSession';

const AuthBetaPage: React.FC = () => {
  const [session, setSession] = useState<UserSession | null>(null);

  // 1. Cargar sesión desde localStorage al montar el componente
  useEffect(() => {
    const storedSession = localStorage.getItem(STORAGE_KEY);
    if (storedSession) {
      try {
        setSession(JSON.parse(storedSession));
      } catch (e) {
        // Manejar datos corruptos
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // 2. Función de éxito de autenticación
  const handleAuthSuccess = (user: UserSession) => {
    setSession(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user)); // Persistir la sesión
  };

  // 3. Función de cierre de sesión
  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem(STORAGE_KEY); // Limpiar la sesión
  };

  // Renderizado Condicional: Muestra Login o Dashboard
  if (!session) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  // Contenido Principal (Main Content)
  return (
    <div className="relative w-full">
      {/* Botón de Cierre de Sesión */}
        <div className="absolute top-4 right-0 z-20 flex items-center space-x-3 w-full px-8 py-4">
            <div className=' w-full flex justify-center'>
                <span className="text-2xl md:text-4xl font-extrabold text-white"> {session.avatar} Hola, <span className='text-[#8d8159]'>{session.name}</span>  estas son tus finanzas...</span>
            </div>
            <Button 
            onClick={handleLogout} 
            className="bg-red-600 hover:bg-red-700 text-white"
            >
            Cerrar Sesión
            </Button>
        </div>
      
      {/* Pasar la info del usuario al dashboard */}
      <FinanceDashboard user={session}/>
    </div>
  );
};

export default AuthBetaPage;