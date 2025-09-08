// src/components/HeroSection.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Fondo from '../../img/fondo13.jpg';

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Navigation Bar */}
      <nav className="p-4 border-2 border-white rounded-xl mx-4 my-2 sm:mx-6 sm:my-4 md:mx-12 md:my-6 flex justify-center items-center">
        <span className="text-xl md:text-2xl font-bold">Nav</span>
      </nav>

      {/* Main Content Area */}
      <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Background Image with Overlay:absolute inset-0 bg-cover bg-center bg-[url( '../../img/fondo13.jpg') ] rounded-xl */}
        <div className="backtoNav">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Text and Button Card */}
        <Card className="z-10 bg-gray-800 bg-opacity-80 p-6 md:p-8 rounded-xl border-2 border-white max-w-sm sm:max-w-md md:max-w-lg">
          <CardContent className="flex flex-col items-center justify-center space-y-6">
            <span className="text-3xl sm:text-4xl font-extrabold text-center">Text</span>
            <Button className="bg-orange-600 hover:bg-orange-700 font-semibold text-lg">
              Boton
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;