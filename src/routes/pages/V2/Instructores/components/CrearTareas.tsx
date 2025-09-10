// src/components/TaskForm.tsx
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '@/supabase/supabaseClient';
// importando endpoint
import { subirTarea } from '@/services/subirTarea';

interface IFormInput {
  tema: string;
  actividad: string;
  recursos: string;
}

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const CrearTareas: React.FC = () => {
  const [videoPreviewId, setVideoPreviewId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFormInput>();

  const resourcesUrl = watch('recursos');

  const handlePreview = () => {
    if (resourcesUrl) {
      const videoId = getYouTubeId(resourcesUrl);
      setVideoPreviewId(videoId);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await subirTarea(data);
      if (error) {
        throw error;
      }
      alert('¡Tarea creada exitosamente!');
      reset();
      setVideoPreviewId(null);
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      alert('Hubo un error al crear la tarea.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 md:p-8 text-white">
      <Card className="border-2 border-white rounded-xl p-4 md:p-8 bg-gray-800">
        <CardContent className="p-0">
          <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Crear tarea</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

            {/* Tema */}
            <div>
              <label htmlFor="tema" className="block text-lg font-semibold mb-2">Tema</label>
              <Input
                id="tema"
                type="text"
                {...register('tema', { required: 'El tema es requerido' })}
                className="w-full bg-transparent border-2 border-white text-white"
                placeholder="Ingresa el tema"
              />
              {errors.tema && <span className="text-red-500 text-sm mt-1">{errors.tema.message}</span>}
            </div>

            {/* Actividad */}
            <div>
              <label htmlFor="actividad" className="block text-lg font-semibold mb-2">Actividad</label>
              <Input
                id="actividad"
                type="text"
                {...register('actividad', { required: 'La actividad es requerida' })}
                className="w-full bg-transparent border-2 border-white text-white"
                placeholder="Ingresa la actividad"
              />
              {errors.actividad && <span className="text-red-500 text-sm mt-1">{errors.actividad.message}</span>}
            </div>

            {/* Recursos (URL de YouTube) */}
            <div>
              <label htmlFor="recursos" className="block text-lg font-semibold mb-2">Recursos</label>
              <Input
                id="recursos"
                type="url"
                {...register('recursos', { required: 'El recurso es requerido' })}
                className="w-full bg-transparent border-2 border-white text-white"
                placeholder="Ingresa url de video de youtube"
              />
              {errors.recursos && <span className="text-red-500 text-sm mt-1">{errors.recursos.message}</span>}
            </div>
            
            {/* Contenedor de Previsualización */}
            {videoPreviewId && (
              <div className="w-full aspect-video border-2 border-white rounded-xl overflow-hidden mt-4">
                <iframe
                  src={`https://www.youtube.com/embed/${videoPreviewId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}

            {/* Botones */}
            <div className="flex justify-end gap-4 mt-6">
              <Button 
                type="button" 
                onClick={handlePreview}
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 transition-colors"
              >
                Previsualizacion
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-white text-gray-900 border-2 border-white hover:bg-gray-200 transition-colors"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrearTareas;