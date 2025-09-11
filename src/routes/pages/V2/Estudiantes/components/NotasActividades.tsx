import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit3, Trash2, Save, X, Calendar } from 'lucide-react';

// Interfaces
interface ActivityCard {
  id: string;
  tema: string;
  descripcion: string;
  fechaInicio: string;
  fechaCierre: string;
  estado: 'pendiente' | 'en_proceso' | 'realizado';
}

interface CalendarDay {
  date: Date;
  activities: ActivityCard[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

const estadoColors = {
  pendiente: 'bg-gray-100 text-gray-700',
  en_proceso: 'bg-blue-100 text-blue-700',
  realizado: 'bg-green-100 text-green-700'
};

const estadoLabels = {
  pendiente: 'Pendiente',
  en_proceso: 'En Proceso', 
  realizado: 'Realizado'
};

export default function NotasActividades() {
  const [activities, setActivities] = useState<ActivityCard[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityCard | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    tema: '',
    descripcion: '',
    fechaInicio: '',
    fechaCierre: '',
    estado: 'pendiente' as 'pendiente' | 'en_proceso' | 'realizado'
  });

  // Cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('notas-actividades-simple');
    if (saved) {
      try {
        setActivities(JSON.parse(saved));
      } catch (error) {
        console.error('Error al cargar:', error);
      }
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('notas-actividades-simple', JSON.stringify(activities));
  }, [activities]);

  // Generar calendario
  const generateCalendar = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const calendar: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dayActivities = activities.filter(activity => {
        const start = new Date(activity.fechaInicio);
        const end = new Date(activity.fechaCierre);
        return currentDate >= start && currentDate <= end;
      });

      calendar.push({
        date: new Date(currentDate),
        activities: dayActivities,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.getTime() === today.getTime()
      });
    }

    return calendar;
  };

  const handleCreateActivity = () => {
    if (!formData.tema.trim() || !formData.fechaInicio || !formData.fechaCierre) return;

    const newActivity: ActivityCard = {
      id: Date.now().toString(),
      tema: formData.tema,
      descripcion: formData.descripcion,
      fechaInicio: formData.fechaInicio,
      fechaCierre: formData.fechaCierre,
      estado: formData.estado
    };

    setActivities([...activities, newActivity]);
    resetForm();
  };

  const handleUpdateActivity = () => {
    if (!editingActivity || !formData.tema.trim()) return;

    setActivities(activities.map(activity =>
      activity.id === editingActivity.id
        ? {
            ...activity,
            tema: formData.tema,
            descripcion: formData.descripcion,
            fechaInicio: formData.fechaInicio,
            fechaCierre: formData.fechaCierre,
            estado: formData.estado
          }
        : activity
    ));
    resetForm();
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm('¿Eliminar esta actividad?')) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };

  const handleEditActivity = (activity: ActivityCard) => {
    setEditingActivity(activity);
    setFormData({
      tema: activity.tema,
      descripcion: activity.descripcion,
      fechaInicio: activity.fechaInicio,
      fechaCierre: activity.fechaCierre,
      estado: activity.estado
    });
    setIsCreating(true);
  };

  const resetForm = () => {
    setFormData({
      tema: '',
      descripcion: '',
      fechaInicio: '',
      fechaCierre: '',
      estado: 'pendiente'
    });
    setIsCreating(false);
    setEditingActivity(null);
  };

  const calendarDays = generateCalendar(currentDate);
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notas de Actividades</h1>
            <p className="text-gray-600 mt-1">
              Crea y visualiza tus actividades en el calendario
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            Nueva Actividad
          </button>
        </div>

        {/* Formulario */}
        {isCreating && (
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingActivity ? 'Editar Actividad' : 'Nueva Actividad'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tema</label>
                <input
                  type="text"
                  value={formData.tema}
                  onChange={(e) => setFormData({...formData, tema: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tema de la actividad..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Descripción de la actividad..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fecha de Inicio</label>
                  <input
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Fecha de Cierre</label>
                  <input
                    type="date"
                    value={formData.fechaCierre}
                    onChange={(e) => setFormData({...formData, fechaCierre: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Estado</label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value as any})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="realizado">Realizado</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={editingActivity ? handleUpdateActivity : handleCreateActivity}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  <Save className="w-4 h-4" />
                  {editingActivity ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  onClick={resetForm}
                  className="border px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Calendario */}
        <div className="bg-white rounded-lg border">
          {/* Header del calendario */}
          <div className="flex items-center justify-between p-4 border-b">
            <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Grid del calendario */}
          <div className="p-4">
            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-20 p-2 border rounded-lg cursor-pointer transition-colors ${
                    !day.isCurrentMonth 
                      ? 'bg-gray-50 text-gray-400' 
                      : day.isToday 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <div className="text-sm font-medium mb-1">
                    {day.date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {day.activities.slice(0, 2).map(activity => (
                      <div
                        key={activity.id}
                        className={`text-xs p-1 rounded truncate ${estadoColors[activity.estado]}`}
                      >
                        {activity.tema}
                      </div>
                    ))}
                    {day.activities.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{day.activities.length - 2} más
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de actividades */}
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Actividades ({activities.length})</h3>
          </div>
          <div className="divide-y">
            {activities.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No hay actividades creadas</p>
                <p className="text-sm">Crea tu primera actividad para verla en el calendario</p>
              </div>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{activity.tema}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${estadoColors[activity.estado]}`}>
                          {estadoLabels[activity.estado]}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{activity.descripcion}</p>
                      <div className="text-sm text-gray-500">
                        {new Date(activity.fechaInicio).toLocaleDateString()} - {new Date(activity.fechaCierre).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <button
                        onClick={() => handleEditActivity(activity)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
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

        {/* Modal de día seleccionado */}
        {selectedDate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">
                  {selectedDate.toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                {calendarDays.find(day => day.date.getTime() === selectedDate.getTime())?.activities.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 mb-4">No hay actividades este día</p>
                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          fechaInicio: selectedDate.toISOString().split('T')[0],
                          fechaCierre: selectedDate.toISOString().split('T')[0]
                        });
                        setIsCreating(true);
                        setSelectedDate(null);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Crear Actividad
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {calendarDays.find(day => day.date.getTime() === selectedDate.getTime())?.activities.map((activity) => (
                      <div key={activity.id} className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{activity.tema}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${estadoColors[activity.estado]}`}>
                            {estadoLabels[activity.estado]}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{activity.descripcion}</p>
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