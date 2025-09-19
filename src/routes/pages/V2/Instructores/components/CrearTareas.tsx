"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/supabase/supabaseClient"; // 👈 tu cliente

// ==== Tipos ====
interface IFormInput {
  tema: string;
  actividad: string;
  recursos: string;              // se transforma a string[] antes de insertar
  estado: string;                // "pendiente" | "en_proceso" | "completada" (texto libre)
  fecha_inicio?: string | null;  // input[type="date"] => 'YYYY-MM-DD' | undefined
  fecha_fin?: string | null;     // input[type="date"]
}

type TareaRow = {
  id: string;
  tema: string | null;
  actividad: string | null;
  recursos: string[] | null;
  fecha_inicio: string | null;   // date (ISO corto)
  fecha_fin: string | null;      // date (ISO corto)
  created_at: string;            // timestamptz
  estado: string | null;
};

// ==== Utilidades ====
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Convierte string a arreglo de tokens (URLs u otros recursos) para text[]
const normalizeRecursos = (input: string): string[] => {
  if (!input) return [];
  return input
    .split(/[\s,;\n\r]+/)
    .map((s) => s.trim())
    .filter(Boolean);
};

// ==== Componente ====
const CrearTareas: React.FC = () => {
  const [videoPreviewId, setVideoPreviewId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para listado de tareas
  const [showTasks, setShowTasks] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [tasks, setTasks] = useState<TareaRow[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      estado: "pendiente",
      fecha_inicio: null,
      fecha_fin: null,
    },
  });

  const resourcesUrl = watch("recursos");

  // Previsualización automática de YouTube (primera URL)
  useEffect(() => {
    if (!resourcesUrl) return setVideoPreviewId(null);
    const id = getYouTubeId(resourcesUrl);
    setVideoPreviewId(id);
  }, [resourcesUrl]);

  // Cargar tareas desde la tabla public.tareas
  const fetchTasks = useCallback(async () => {
    setLoadingTasks(true);
    try {
      const { data, error } = await supabase
        .from("tareas")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setTasks((data as TareaRow[]) || []);
      setShowTasks(true);
    } catch (e) {
      console.error(e);
      alert("No se pudieron cargar las tareas.");
    } finally {
      setLoadingTasks(false);
    }
  }, []);

  // Eliminar tarea (DB + estado local)
  const handleDelete = async (id: string) => {
    const ok = confirm("¿Eliminar esta tarea definitivamente?");
    if (!ok) return;
    try {
      const { error } = await supabase.from("tareas").delete().eq("id", id);
      if (error) throw error;
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar la tarea.");
    }
  };

  // Ver/recargar la lista
  const handleViewTasks = async () => {
    await fetchTasks();
  };

  // Insertar en public.tareas
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    try {
      const recursosArray = normalizeRecursos(data.recursos);

      // Normaliza fechas: '' -> null
      const fecha_inicio = data.fecha_inicio && data.fecha_inicio.trim() !== "" ? data.fecha_inicio : null;
      const fecha_fin = data.fecha_fin && data.fecha_fin.trim() !== "" ? data.fecha_fin : null;

      const payload = {
        tema: data.tema,
        actividad: data.actividad,
        recursos: recursosArray,    // text[]
        estado: data.estado || null,
        fecha_inicio,               // date (YYYY-MM-DD) o null
        fecha_fin,                  // date (YYYY-MM-DD) o null
        // id y created_at los maneja la DB
      };

      const { data: inserted, error } = await supabase
        .from("tareas")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      alert("¡Tarea creada exitosamente!");
      reset({
        tema: "",
        actividad: "",
        recursos: "",
        estado: "pendiente",
        fecha_inicio: null,
        fecha_fin: null,
      });
      setVideoPreviewId(null);

      // Si el panel está abierto, agrega la nueva al inicio
      if (showTasks && inserted) {
        setTasks((prev) => [inserted as TareaRow, ...prev]);
      }
    } catch (err) {
      console.error("Error al crear la tarea:", err);
      alert("Hubo un error al crear la tarea.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8">
      <div className="rounded-3xl border-4 border-black bg-yellow-400 p-4 md:p-8">
        <Card className="!bg-yellow-300 !border-2 !border-black rounded-xl">
          <CardContent className="p-4 md:p-8">
            <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
              Crear tarea
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              {/* Tema */}
              <div>
                <label htmlFor="tema" className="block text-lg font-semibold mb-2">
                  Tema
                </label>
                <Input
                  id="tema"
                  type="text"
                  {...register("tema", { required: "El tema es requerido" })}
                  className="w-full !bg-white !border-2 !border-black !text-black placeholder:!text-gray-600"
                  placeholder="Ingresa el tema"
                />
                {errors.tema && (
                  <span className="text-red-700 text-sm mt-1">{errors.tema.message}</span>
                )}
              </div>

              {/* Actividad */}
              <div>
                <label htmlFor="actividad" className="block text-lg font-semibold mb-2">
                  Actividad
                </label>
                <Input
                  id="actividad"
                  type="text"
                  {...register("actividad", { required: "La actividad es requerida" })}
                  className="w-full !bg-white !border-2 !border-black !text-black placeholder:!text-gray-600"
                  placeholder="Ingresa la actividad"
                />
                {errors.actividad && (
                  <span className="text-red-700 text-sm mt-1">
                    {errors.actividad.message}
                  </span>
                )}
              </div>

              {/* Recursos */}
              <div>
                <label htmlFor="recursos" className="block text-lg font-semibold mb-2">
                  Recursos
                </label>
                <Input
                  id="recursos"
                  type="url"
                  {...register("recursos", { required: "El recurso es requerido" })}
                  className="w-full !bg-white !border-2 !border-black !text-black placeholder:!text-gray-600"
                  placeholder="Una o varias URLs (separadas por coma o salto de línea)"
                />
                {errors.recursos && (
                  <span className="text-red-700 text-sm mt-1">
                    {errors.recursos.message}
                  </span>
                )}
              </div>

              {/* Estado */}
              <div>
                <label htmlFor="estado" className="block text-lg font-semibold mb-2">
                  Estado
                </label>
                <select
                  id="estado"
                  {...register("estado")}
                  className="w-full rounded-md px-3 py-2 !bg-white !border-2 !border-black !text-black"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="completada">Completada</option>
                </select>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fecha_inicio" className="block text-lg font-semibold mb-2">
                    Fecha de inicio (opcional)
                  </label>
                  <Input
                    id="fecha_inicio"
                    type="date"
                    {...register("fecha_inicio")}
                    className="w-full !bg-white !border-2 !border-black !text-black"
                  />
                </div>

                <div>
                  <label htmlFor="fecha_fin" className="block text-lg font-semibold mb-2">
                    Fecha de fin (opcional)
                  </label>
                  <Input
                    id="fecha_fin"
                    type="date"
                    {...register("fecha_fin")}
                    className="w-full !bg-white !border-2 !border-black !text-black"
                  />
                </div>
              </div>

              {/* Previsualización de YouTube (automática) */}
              {videoPreviewId && (
                <div className="w-full aspect-video !border-2 !border-black rounded-xl overflow-hidden mt-2">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoPreviewId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Botones */}
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  onClick={handleViewTasks}
                  className="!bg-black !text-yellow-300 !border-2 !border-black hover:!bg-yellow-500 hover:!text-black transition-colors"
                >
                  {loadingTasks ? "Cargando..." : "Ver tareas"}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="!bg-black !text-yellow-300 !border-2 !border-black hover:!bg-yellow-500 hover:!text-black transition-colors"
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </form>

            {/* Panel de tareas */}
            {showTasks && (
              <div className="mt-8">
                <h2 className="text-lg md:text-xl font-bold mb-3">Tareas creadas</h2>

                {tasks.length === 0 && !loadingTasks && (
                  <p className="text-sm">No hay tareas registradas.</p>
                )}

                <div className="grid gap-3">
                  {tasks.map((t) => (
                    <div
                      key={t.id}
                      className="rounded-xl border-2 border-black bg-white p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                    >
                      <div className="text-sm">
                        <div>
                          <span className="font-semibold">Tema:</span> {t.tema ?? "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Actividad:</span>{" "}
                          {t.actividad ?? "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Estado:</span>{" "}
                          {t.estado ?? "—"}
                        </div>
                        <div className="truncate">
                          <span className="font-semibold">Recursos:</span>{" "}
                          {t.recursos && t.recursos.length > 0
                            ? t.recursos.join(", ")
                            : "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Fecha inicio:</span>{" "}
                          {t.fecha_inicio ?? "—"}
                        </div>
                        <div>
                          <span className="font-semibold">Fecha fin:</span>{" "}
                          {t.fecha_fin ?? "—"}
                        </div>
                        <div className="text-xs text-gray-600">
                          Creada: {new Date(t.created_at).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={() => handleDelete(t.id)}
                          className="!bg-red-700 !text-white !border-2 !border-black hover:!bg-red-600"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrearTareas;
