// src/components/Attendance.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react'; // Necesitas instalar lucide-react

type AttendanceType = 'entrada' | 'salida';

const Asistencia: React.FC = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [attendanceType, setAttendanceType] = useState<AttendanceType>('entrada');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Al limpiar el componente, detén el stream de la cámara si está activo
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        console.log("Camara");

      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      alert("No se pudo acceder a la cámara. Por favor, revisa los permisos.");
    }
  };

  const handleCaptureClick = () => {
    if (!cameraActive) {
      startCamera();
      console.log("Click en camara")
    }
  };
  
  const handleAttendance = () => {
    // Lógica para capturar la imagen y enviar la asistencia
    // Aquí puedes usar videoRef.current para tomar una captura del video.
    // Por ejemplo, dibujando el video en un canvas y luego obteniendo los datos de la imagen.
    alert(`Asistencia de ${attendanceType} registrada.`);
    // Opcional: Detener la cámara después de la captura
    // if (videoRef.current && videoRef.current.srcObject) {
    //   (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    //   setCameraActive(false);
    // }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-start p-4 md:p-8 text-white">
      <Card className="bg-gray-800 border-2 border-white rounded-xl w-full max-w-md p-4 md:p-6 mb-8">
        <CardContent className="p-0 flex justify-around">
          <Button
            onClick={() => setAttendanceType('entrada')}
            variant="ghost"
            className={`w-1/2 rounded-full font-bold transition-all duration-300
              ${attendanceType === 'entrada' ? 'bg-orange-500 text-black' : 'text-gray-400'}`}
          >
            Entrada
          </Button>
          <Button
            onClick={() => setAttendanceType('salida')}
            variant="ghost"
            className={`w-1/2 rounded-full font-bold transition-all duration-300
              ${attendanceType === 'salida' ? 'bg-orange-500 text-black' : 'text-gray-400'}`}
          >
            Salida
          </Button>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800 border-2 border-white rounded-xl w-full max-w-md h-96 p-4 md:p-6 flex items-center justify-center relative overflow-hidden">
        {/* Ícono de la cámara */}
        <div
          onClick={handleCaptureClick}
          className={`flex items-center justify-center absolute transition-opacity duration-500 cursor-pointer
            ${cameraActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <Camera className="w-24 h-24 text-gray-400 cursor-pointer" />
        </div>

        {/* Contenedor del video de la cámara */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`w-full h-full object-cover rounded-xl transition-opacity duration-500
            ${cameraActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        ></video>
        
        {/* Botón de captura (opcional) */}
        {cameraActive && (
          <div className="absolute bottom-6">
            <Button
              onClick={handleAttendance}
              className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center p-0"
            >
              <div className="w-12 h-12 border-4 border-black rounded-full"></div>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Asistencia;