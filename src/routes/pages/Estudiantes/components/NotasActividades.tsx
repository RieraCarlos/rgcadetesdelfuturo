"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, Edit3, Trash2, Save, X, Calendar, Pencil, Check, Trash } from "lucide-react";
import  supabase  from "@/supabase/supabaseClient";

// ===== Tipos =====
interface ActivityCard {
  id: string;
  tema: string;
  descripcion: string;     // ↔ DB: actividad
  fechaInicio: string;     // 'YYYY-MM-DD' ↔ DB: fecha_inicio (date)
  fechaCierre: string;     // 'YYYY-MM-DD' ↔ DB: fecha_fin (date)
  estado: "pendiente" | "en_proceso" | "realizado"; // DB: estado (text)
}

interface CalendarDay {
  date: Date;
  activities: ActivityCard[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

// Notas locales (localStorage)
interface LocalNote {
  id: string;         // uuid simple
  titulo: string;
  contenido: string;
  fecha: string;      // ISO date
}

// Paleta: amarillo, negro, blanco
// Paleta de colores para los estados
const estadoColors = {
  pendiente: "bg-red-100 text-red-700 border border-red-300",
  en_proceso: "bg-gray-200 text-gray-800 border border-gray-300",
  realizado: "bg-green-100 text-green-700 border border-green-300",
};

const estadoLabels: Record<ActivityCard["estado"], string> = {
  pendiente: "Pendiente",
  en_proceso: "En Proceso",
  realizado: "Completada",
};


const estadoOptions: { value: ActivityCard["estado"]; label: string }[] = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en_proceso", label: "En Proceso" },
  { value: "realizado", label: "Completada" },
];

export default function NotasActividades() {
  const [activities, setActivities] = useState<ActivityCard[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityCard | null>(null);
  const [loading, setLoading] = useState(false);

  // Form actividades
  const [formData, setFormData] = useState({
    tema: "",
    descripcion: "",
    fechaInicio: "",
    fechaCierre: "",
    estado: "pendiente" as "pendiente" | "en_proceso" | "realizado",
  });

  // ===== Notas (localStorage) =====
  const LOCAL_KEY = "notas_personales_v1";
  const [localNotes, setLocalNotes] = useState<LocalNote[]>([]);
  const [noteDraft, setNoteDraft] = useState<{ titulo: string; contenido: string }>({ titulo: "", contenido: "" });
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const loadLocalNotes = () => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) setLocalNotes(JSON.parse(raw));
    } catch (e) {
      console.error("No se pudieron cargar notas locales:", e);
    }
  };
  const persistLocalNotes = (next: LocalNote[]) => {
    setLocalNotes(next);
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("No se pudieron guardar notas locales:", e);
    }
  };

  // ===== Helpers de fecha =====
  const startOfDay = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  // ====== Carga inicial =====
  const fetchFromDB = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tareas")
        .select("id, tema, actividad, fecha_inicio, fecha_fin, estado")
        .order("fecha_inicio", { ascending: true, nullsFirst: true })
        .order("created_at", { ascending: false });

    if (error) throw error;

      const mapped: ActivityCard[] =
        (data || []).map((row: any) => ({
          id: row.id,
          tema: row.tema ?? "",
          descripcion: row.actividad ?? "",
          fechaInicio: row.fecha_inicio ?? "",
          fechaCierre: row.fecha_fin ?? "",
          estado: (row.estado as ActivityCard["estado"]) ?? "pendiente",
        })) || [];

      setActivities(mapped);
    } catch (e) {
      console.error("Error cargando tareas:", e);
      alert("No se pudieron cargar las actividades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFromDB();
    loadLocalNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ====== Generar calendario (42 celdas)
  const generateCalendar = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // domingo

    const calendar: CalendarDay[] = [];
    const today = startOfDay(new Date());

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dayActivities = activities.filter((activity) => {
        if (!activity.fechaInicio || !activity.fechaCierre) return false;
        const start = startOfDay(new Date(activity.fechaInicio + "T00:00:00"));
        const end = startOfDay(new Date(activity.fechaCierre + "T00:00:00"));
        const cur = startOfDay(currentDate);
        return cur >= start && cur <= end;
      });

      calendar.push({
        date: new Date(currentDate),
        activities: dayActivities,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: startOfDay(currentDate).getTime() === today.getTime(),
      });
    }
    return calendar;
  };

  const calendarDays = useMemo(() => generateCalendar(currentDate), [currentDate, activities]);

  const monthNames = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
  ];

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  // ====== Crear actividad
  const handleCreateActivity = async () => {
    if (!formData.tema.trim() || !formData.fechaInicio || !formData.fechaCierre) return;

    try {
      const payload = {
        tema: formData.tema,
        actividad: formData.descripcion,
        fecha_inicio: formData.fechaInicio,
        fecha_fin: formData.fechaCierre,
        estado: formData.estado,
        recursos: null as any,
      };

      const { data, error } = await supabase.from("tareas").insert(payload).select().single();
      if (error) throw error;

      const inserted = data as any;
      const newActivity: ActivityCard = {
        id: inserted.id,
        tema: inserted.tema ?? "",
        descripcion: inserted.actividad ?? "",
        fechaInicio: inserted.fecha_inicio ?? "",
        fechaCierre: inserted.fecha_fin ?? "",
        estado: (inserted.estado as ActivityCard["estado"]) ?? "pendiente",
      };

      setActivities((prev) => [...prev, newActivity]);
      resetForm();
    } catch (e) {
      console.error("Error al crear:", e);
      alert("No se pudo crear la actividad.");
    }
  };

  // ====== Actualizar actividad completa (desde el formulario)
  const handleUpdateActivity = async () => {
    if (!editingActivity || !formData.tema.trim()) return;

    try {
      const payload = {
        tema: formData.tema,
        actividad: formData.descripcion,
        fecha_inicio: formData.fechaInicio || null,
        fecha_fin: formData.fechaCierre || null,
        estado: formData.estado,
      };

      const { error } = await supabase.from("tareas").update(payload).eq("id", editingActivity.id);
      if (error) throw error;

      setActivities((prev) =>
        prev.map((a) =>
          a.id === editingActivity.id
            ? { ...a, ...{ tema: formData.tema, descripcion: formData.descripcion, fechaInicio: formData.fechaInicio, fechaCierre: formData.fechaCierre, estado: formData.estado } }
            : a
        )
      );
      resetForm();
    } catch (e) {
      console.error("Error al actualizar:", e);
      alert("No se pudo actualizar la actividad.");
    }
  };

  // ====== Cambiar solo el ESTADO (selector inline en la lista)
  const handleChangeEstado = async (id: string, nextEstado: ActivityCard["estado"]) => {
    setActivities((prev) => prev.map((a) => (a.id === id ? { ...a, estado: nextEstado } : a)));
    try {
      const { error } = await supabase.from("tareas").update({ estado: nextEstado }).eq("id", id);
      if (error) throw error;
    } catch (e) {
      console.error("No se pudo cambiar el estado:", e);
      alert("No se pudo cambiar el estado. Se revertirá el cambio.");
      fetchFromDB(); // rollback con recarga
    }
  };

  // ====== Eliminar
  const handleDeleteActivity = async (id: string) => {
    if (!confirm("¿Eliminar esta actividad?")) return;
    try {
      const { error } = await supabase.from("tareas").delete().eq("id", id);
      if (error) throw error;
      setActivities((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error("Error al eliminar:", e);
      alert("No se pudo eliminar la actividad.");
    }
  };

  // ====== Editar (carga en el form)
  const handleEditActivity = (activity: ActivityCard) => {
    setEditingActivity(activity);
    setFormData({
      tema: activity.tema,
      descripcion: activity.descripcion,
      fechaInicio: activity.fechaInicio,
      fechaCierre: activity.fechaCierre,
      estado: activity.estado,
    });
    setIsCreating(true);
  };

  // ====== Reset form
  const resetForm = () => {
    setFormData({ tema: "", descripcion: "", fechaInicio: "", fechaCierre: "", estado: "pendiente" });
    setIsCreating(false);
    setEditingActivity(null);
  };

  // ====== CRUD Notas (localStorage) =====
  const addLocalNote = () => {
    if (!noteDraft.titulo.trim() && !noteDraft.contenido.trim()) return;
    const now = new Date().toISOString();
    const newNote: LocalNote = {
      id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
      titulo: noteDraft.titulo.trim() || "Sin título",
      contenido: noteDraft.contenido.trim(),
      fecha: now,
    };
    const next = [newNote, ...localNotes];
    persistLocalNotes(next);
    setNoteDraft({ titulo: "", contenido: "" });
  };

  const startEditNote = (n: LocalNote) => {
    setEditingNoteId(n.id);
    setNoteDraft({ titulo: n.titulo, contenido: n.contenido });
  };

  const saveEditNote = () => {
    if (!editingNoteId) return;
    const next = localNotes.map((n) =>
      n.id === editingNoteId ? { ...n, titulo: noteDraft.titulo, contenido: noteDraft.contenido, fecha: new Date().toISOString() } : n
    );
    persistLocalNotes(next);
    setEditingNoteId(null);
    setNoteDraft({ titulo: "", contenido: "" });
  };

  const deleteNote = (id: string) => {
    if (!confirm("¿Eliminar esta nota?")) return;
    persistLocalNotes(localNotes.filter((n) => n.id !== id));
    if (editingNoteId === id) {
      setEditingNoteId(null);
      setNoteDraft({ titulo: "", contenido: "" });
    }
  };

  // ====== UI ======
  return (
    <div className="min-h-screen bg-white p-4"> {/* fondo general blanco */}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">Notas de Actividades</h1>
            <p className="mt-1 text-black/70">Crea y visualiza tus actividades en el calendario</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg border border-black hover:bg-yellow-400"
          >
            <Plus className="w-4 h-4" />
            Nueva Actividad
          </button>
        </div>

        {/* Formulario */}
        {isCreating && (
          <div className="bg-white rounded-lg border border-black/20 p-6">
            <h3 className="text-lg font-semibold mb-4 text-black">
              {editingActivity ? "Editar Actividad" : "Nueva Actividad"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Tema</label>
                <input
                  type="text"
                  value={formData.tema}
                  onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                  className="w-full border border-black/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Tema de la actividad..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full border border-black/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  rows={3}
                  placeholder="Descripción de la actividad..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-black">Fecha de Inicio</label>
                  <input
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                    className="w-full border border-black/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-black">Fecha de Cierre</label>
                  <input
                    type="date"
                    value={formData.fechaCierre}
                    onChange={(e) => setFormData({ ...formData, fechaCierre: e.target.value })}
                    className="w-full border border-black/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black">Estado</label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value as ActivityCard["estado"] })}
                  className="w-full border border-black/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {estadoOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={editingActivity ? handleUpdateActivity : handleCreateActivity}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90"
                >
                  <Save className="w-4 h-4" />
                  {editingActivity ? "Actualizar" : "Crear"}
                </button>
                <button
                  onClick={resetForm}
                  className="border border-black text-black px-4 py-2 rounded-lg hover:bg-yellow-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Calendario */}
        <div className="bg-white rounded-lg border border-black/20">
          <div className="flex items-center justify-between p-4 border-b border-black/10">
            <button onClick={previousMonth} className="p-2 rounded hover:bg-yellow-50">
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <h2 className="text-xl font-semibold text-black">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded hover:bg-yellow-50">
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-black py-2 bg-yellow-50 rounded">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-20 p-2 border rounded-lg cursor-pointer transition-colors ${
                    !day.isCurrentMonth
                      ? "bg-white text-black/40 border-black/10"
                      : day.isToday
                      ? "bg-yellow-50 border-yellow-300"
                      : "bg-white hover:bg-yellow-50 border-black/10"
                  }`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <div className="text-sm font-medium mb-1 text-black">{day.date.getDate()}</div>
                  <div className="space-y-1">
                    {day.activities.slice(0, 2).map((activity) => (
                      <div
                        key={activity.id}
                        className={`text-xs p-1 rounded truncate ${estadoColors[activity.estado]}`}
                      >
                        {activity.tema}
                      </div>
                    ))}
                    {day.activities.length > 2 && (
                      <div className="text-xs text-black/60">+{day.activities.length - 2} más</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de actividades + selector de estado inline */}
        <div className="bg-white rounded-lg border border-black/20">
          <div className="p-4 border-b border-black/10 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-black">Actividades ({activities.length})</h3>
            <button
              onClick={fetchFromDB}
              className="px-3 py-1.5 rounded-lg border border-black text-black hover:bg-yellow-50 text-sm"
              disabled={loading}
            >
              {loading ? "Actualizando..." : "Recargar"}
            </button>
          </div>
          <div className="divide-y divide-black/10">
            {activities.length === 0 ? (
              <div className="p-8 text-center text-black/60">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-black/20" />
                <p>No hay actividades creadas</p>
                <p className="text-sm">Crea tu primera actividad para verla en el calendario</p>
              </div>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-yellow-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h4 className="font-semibold text-black">{activity.tema}</h4>

                        {/* Estado como chip + selector */}
                        <span className={`px-2 py-1 rounded-full text-xs ${estadoColors[activity.estado]}`}>
                          {estadoLabels[activity.estado]}
                        </span>

                        <select
                          value={activity.estado}
                          onChange={(e) =>
                            handleChangeEstado(activity.id, e.target.value as ActivityCard["estado"])
                          }
                          className="text-xs border border-black/30 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          title="Cambiar estado"
                        >
                          {estadoOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>

                      <p className="text-black/80 text-sm mb-2">{activity.descripcion}</p>
                      <div className="text-sm text-black/60">
                        {activity.fechaInicio ? new Date(activity.fechaInicio).toLocaleDateString() : "—"}{" "}
                        -{" "}
                        {activity.fechaCierre ? new Date(activity.fechaCierre).toLocaleDateString() : "—"}
                      </div>
                    </div>

                    <div className="flex gap-1 ml-4">
                      <button
                        onClick={() => handleEditActivity(activity)}
                        className="p-2 text-black hover:bg-yellow-50 rounded border border-black/20"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="p-2 text-black hover:bg-black hover:text-white rounded border border-black"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notas personales (localStorage) */}
        <div className="bg-white rounded-lg border border-black/20">
          <div className="p-4 border-b border-black/10">
            <h3 className="text-lg font-semibold text-black">Notas personales (solo en este dispositivo)</h3>
            <p className="text-sm text-black/70">Se guardan en el navegador con localStorage.</p>
          </div>

          {/* Editor / Creador */}
          <div className="p-4 grid gap-3">
            <input
              type="text"
              placeholder="Título de la nota..."
              value={noteDraft.titulo}
              onChange={(e) => setNoteDraft((s) => ({ ...s, titulo: e.target.value }))}
              className="border border-black/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <textarea
              placeholder="Contenido..."
              rows={3}
              value={noteDraft.contenido}
              onChange={(e) => setNoteDraft((s) => ({ ...s, contenido: e.target.value }))}
              className="border border-black/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div className="flex gap-2">
              {editingNoteId ? (
                <>
                  <button
                    onClick={saveEditNote}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90"
                  >
                    <Check className="w-4 h-4" /> Guardar cambios
                  </button>
                  <button
                    onClick={() => { setEditingNoteId(null); setNoteDraft({ titulo: "", contenido: "" }); }}
                    className="border border-black text-black px-4 py-2 rounded-lg hover:bg-yellow-50"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={addLocalNote}
                  className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg border border-black hover:bg-yellow-400"
                >
                  <Plus className="w-4 h-4" /> Añadir nota
                </button>
              )}
            </div>
          </div>

          {/* Lista de notas */}
          {localNotes.length === 0 ? (
            <div className="p-6 text-center text-black/60">No hay notas aún.</div>
          ) : (
            <div className="divide-y divide-black/10">
              {localNotes.map((n) => (
                <div key={n.id} className="p-4 flex items-start justify-between gap-3 hover:bg-yellow-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-black">{n.titulo}</h4>
                      <span className="text-xs text-black/60">
                        {new Date(n.fecha).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-black mt-1 whitespace-pre-wrap">{n.contenido}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEditNote(n)}
                      className="p-2 text-black hover:bg-yellow-50 rounded border border-black/20"
                      title="Editar nota"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(n.id)}
                      className="p-2 text-black hover:bg-black hover:text-white rounded border border-black"
                      title="Eliminar nota"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de día seleccionado */}
        {selectedDate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full border border-black/20">
              <div className="flex items-center justify-between p-4 border-b border-black/10">
                <h3 className="text-lg font-semibold text-black">
                  {selectedDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <button onClick={() => setSelectedDate(null)} className="p-1 hover:bg-yellow-50 rounded">
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>
              <div className="p-4">
                {calendarDays.find((d) => d.date.getTime() === selectedDate.getTime())?.activities.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-black/70 mb-4">No hay actividades este día</p>
                    <button
                      onClick={() => {
                        const ymd = selectedDate.toISOString().split("T")[0];
                        setFormData({ ...formData, fechaInicio: ymd, fechaCierre: ymd });
                        setIsCreating(true);
                        setSelectedDate(null);
                      }}
                      className="bg-yellow-500 text-black px-4 py-2 rounded-lg border border-black hover:bg-yellow-400"
                    >
                      Crear Actividad
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {calendarDays
                      .find((d) => d.date.getTime() === selectedDate.getTime())
                      ?.activities.map((activity) => (
                        <div key={activity.id} className="border border-black/20 rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-black">{activity.tema}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${estadoColors[activity.estado]}`}>
                                {estadoLabels[activity.estado]}
                              </span>
                              {/* selector de estado también en el modal */}
                              <select
                                value={activity.estado}
                                onChange={(e) =>
                                  handleChangeEstado(activity.id, e.target.value as ActivityCard["estado"])
                                }
                                className="text-xs border border-black/30 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                title="Cambiar estado"
                              >
                                {estadoOptions.map((opt) => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <p className="text-black/80 text-sm">{activity.descripcion}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
