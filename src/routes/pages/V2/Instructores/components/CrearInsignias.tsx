// src/components/InsigniaForm.tsx
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IFormInput {
  name: string;
  image: FileList;
  studentGroup: string;
}

const InsigniaForm: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFormInput>();

  const handlePreview = () => {
    const imageFile = watch('image');
    if (imageFile && imageFile.length > 0) {
      const fileUrl = URL.createObjectURL(imageFile[0]);
      setImageUrl(fileUrl);
      setIsDialogOpen(true);
    } else {
      alert('Por favor, sube una imagen para previsualizar.');
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    {/*
    // Subir la imagen a Supabase Storage
    const imageFile = data.image[0];
    const filePath = `insignias/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('insignia-images') // Asegúrate de crear este bucket en tu proyecto de Supabase
      .upload(filePath, imageFile);
      
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      setIsSubmitting(false);
      return;
    }

    // Obtener la URL pública de la imagen
    const { data: publicUrlData } = supabase.storage
      .from('insignia-images')
      .getPublicUrl(filePath);
      
    const publicImageUrl = publicUrlData?.publicUrl;

    // Insertar los datos en la tabla de 'insignias'
    const { error: insertError } = await supabase
      .from('insignias')
      .insert([
        {
          name: data.name,
          image_url: publicImageUrl,
          student_group: data.studentGroup,
        },
      ]);

    if (insertError) {
      console.error('Error creating insignia:', insertError);
      setIsSubmitting(false);
    } else {
      alert('¡Insignia creada exitosamente!');
      reset();
      setImageUrl(null);
      setIsSubmitting(false);
      setIsDialogOpen(false);
    }
      */}
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 md:p-8 text-white flex justify-center items-center">
      <Card className="border-2 border-white rounded-xl p-4 md:p-8 bg-gray-800 w-full max-w-2xl">
        <CardContent className="p-0">
          
          {/* Seccion de Insignias Creadas */}
          <div className="mb-8">
            <h1 className="text-xl font-semibold mb-2">Insignias creadas</h1>
            <p className="text-gray-400">ninguna insignia generada</p>
          </div>
          
          {/* Formulario de Creacion de Insignia */}
          <h1 className="text-xl font-semibold mb-4">Crear insignia</h1>
          <form className="flex flex-col gap-6">

            {/* Nombre de la insignia */}
            <div>
              <label htmlFor="name" className="block text-lg font-semibold mb-2">Nombre de la insignia</label>
              <Input
                id="name"
                type="text"
                {...register('name', { required: 'El nombre es requerido' })}
                className="w-full bg-transparent border-2 border-white text-white"
              />
              {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
            </div>

            {/* Subir la Imagen */}
            <div>
              <label htmlFor="image" className="block text-lg font-semibold mb-2">Sube la Imagen</label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...register('image', { required: 'La imagen es requerida' })}
                className="w-full bg-transparent border-2 border-white text-white file:text-white file:border-0"
              />
              {errors.image && <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>}
            </div>

            {/* Grupo de estudiantes */}
            <div>
              <label htmlFor="studentGroup" className="block text-lg font-semibold mb-2">Grupo de estudiantes</label>
              <Input
                id="studentGroup"
                type="text"
                {...register('studentGroup', { required: 'El grupo es requerido' })}
                className="w-full bg-transparent border-2 border-white text-white"
              />
              {errors.studentGroup && <span className="text-red-500 text-sm mt-1">{errors.studentGroup.message}</span>}
            </div>
            
            {/* Boton de previsualización */}
            <div className="flex justify-end mt-4">
              <Button 
                type="button" 
                onClick={handlePreview}
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 transition-colors"
              >
                previsualizacion
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Dialog de Previsualización */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border-2 border-white rounded-xl text-white">
          <DialogHeader>
            <DialogTitle>Previsualización de la insignia</DialogTitle>
            <DialogDescription>
              Revisa la insignia antes de enviarla.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col items-center justify-center gap-4">
            {imageUrl && (
              <img src={imageUrl} alt="Insignia Preview" className="w-32 h-32 object-contain border-2 border-orange-500 rounded-lg" />
            )}
            <span className="text-xl font-bold">{watch('name')}</span>
            <span className="text-gray-400">Grupo: {watch('studentGroup')}</span>
          </div>

          <div className="flex justify-end mt-6">
            <Button 
              type="submit"
              onClick={handleSubmit(onSubmit)} 
              disabled={isSubmitting}
              className="bg-white text-gray-900 border-2 border-white hover:bg-gray-200 transition-colors"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsigniaForm;