// CarnetCadetes.tsx
'use client';

import React, { useState, useRef } from 'react';
import Soldado1 from "../../img/Soldado1.png";


// Colores definidos:
const COLOR_OSCURO = '#1f2513'; // Fondo/Texto oscuro
const COLOR_MEDIO = '#46412d'; // Cuerda
const COLOR_CLARO = '#8d8159'; // Detalles/Acentos

const CarnetCadetes: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isBouncing, setIsBouncing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parámetros de la Dinámica
  const MAX_ROTATION = 12;
  const SENSITIVITY = 30;
  
  // --- Lógica de Interacción ---

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { offsetWidth: width, offsetHeight: height } = cardRef.current;
    const { clientX, clientY } = e;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) / SENSITIVITY;
    const y = (clientY - centerY) / SENSITIVITY;
    const newY = Math.min(MAX_ROTATION, Math.max(-MAX_ROTATION, x));
    const newX = Math.min(MAX_ROTATION, Math.max(-MAX_ROTATION, y));
    setRotation({ x: -newX, y: newY }); 
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsBouncing(false); // Asegurar que el rebote termina al salir
  };
  
  const handleMouseDown = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 200); 
  };

  const handleMouseUp = () => {
    setIsBouncing(false);
  };
  
  // --- Estilos Dinámicos ---

  const lanyardStyle: React.CSSProperties = {
    // Rotación de Flote
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    transition: 'transform 0.4s ease-out, scale 0.1s ease-out',
    transformStyle: 'preserve-3d', 
    cursor: 'pointer', // Indicamos interactividad
  };
  
  const bandStyle: React.CSSProperties = {
      transform: `rotateX(${rotation.x * 0.15}deg) rotateY(${rotation.y * 0.15}deg)`,
      transition: 'transform 0.4s ease-out',
      transformOrigin: 'top center',
  };
  
  // Clase Tailwind condicional para el rebote
  const bounceClass = isBouncing ? 'scale-[0.98] -translate-y-1' : '';

  return (
    <div className="flex justify-center items-center h-auto mb-20" >
      <div
        ref={cardRef}
        className="w-full h-full max-w-lg max-h-[500px] flex flex-col items-center justify-center perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          style={lanyardStyle} 
          className={`flex flex-col items-center ${bounceClass}`} 
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} // Re-usamos para asegurar el fin del rebote y flote
        >
          {/* Cuerda del Carnet */}
          <div 
            style={{ ...bandStyle, backgroundColor: COLOR_MEDIO }} 
            className="w-8 h-16 rounded-t-2xl shadow-lg transition-transform duration-400 ease-out" 
          />
          
          {/* Tarjeta de Identificación */}
          <div 
            className="w-64 h-96 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 flex flex-col justify-between" 
            style={{ backgroundColor: 'white', borderTop: `10px solid ${COLOR_CLARO}` }}
          >
            {/* --- CABECERA --- */}
            <div className="text-center">
              <h1 className="text-2xl font-black" style={{ color: COLOR_OSCURO }}>
                CADETES DEL FUTURO
              </h1>
              <p className="text-sm font-semibold" style={{ color: COLOR_MEDIO }}>
                Producto de rg technology
              </p>
              <div className="w-10 h-1 mt-2 mx-auto" style={{ backgroundColor: COLOR_CLARO }} />
            </div>

            {/* --- CUERPO (DATOS DEL ESTUDIANTE) --- */}
            <div className="flex flex-col items-center my-4">
                {/* 4) Imagen del perfil de la estudiante (Placeholder) */}
                <div className="w-30 h-30 rounded-full border-4 flex items-center justify-center text-4xl font-bold mb-4" 
                     style={{ borderColor: COLOR_CLARO, backgroundColor: '#eee', color: COLOR_MEDIO }}>
                    <img src={Soldado1} alt="" className='rounded-full w-30 h-30'/>
                </div>
                
                {/* 3) Nombre del estudiante */}
                <h3 className="text-lg font-extrabold uppercase mt-2" style={{ color: COLOR_OSCURO }}>
                    ANTHONELLA TOCTO
                </h3>
                <p className="text-sm" style={{ color: COLOR_MEDIO }}>
                    Estudiante Activa
                </p>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarnetCadetes;