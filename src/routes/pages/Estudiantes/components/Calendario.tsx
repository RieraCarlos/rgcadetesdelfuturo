import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, BookOpen, Clock } from 'lucide-react';

// Interfaces
interface ActivityCard {
  id: string;
  tema: string;
  descripcion: string;
  fechaInicio: string; // 'YYYY-MM-DD' o ISO
  fechaCierre: string; // 'YYYY-MM-DD' o ISO
  estado: 'pendiente' | 'en_proceso' | 'realizado';
}

interface CalendarDay {
  date: Date;
  activities: ActivityCard[];
  hasCurso: boolean;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSaturday: boolean;
}

// Estados (paleta amarillo / negro / blanco)
const estadoColors = {
  pendiente: 'bg-yellow-200 text-black border border-yellow-400',
  en_proceso: 'bg-black text-white border border-black',
  realizado: 'bg-white text-black border border-black'
};

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activities, setActivities] = useState<ActivityCard[]>([]);

  // helper: normalizar fecha a 00:00:00
  const startOfDay = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  // Cargar actividades desde localStorage
  useEffect(() => {
    const loadActivities = () => {
      try {
        if (typeof window === 'undefined') return;
        const saved = localStorage.getItem('notas-actividades-simple');
        if (!saved) return;

        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Asegurar forma básica
          const sanitized: ActivityCard[] = parsed.map((a: any) => ({
            id: String(a.id ?? crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)),
            tema: String(a.tema ?? ''),
            descripcion: String(a.descripcion ?? ''),
            fechaInicio: String(a.fechaInicio ?? a.fecha_inicio ?? ''), // por si vienen con snake_case
            fechaCierre: String(a.fechaCierre ?? a.fecha_fin ?? ''),
            estado: (a.estado === 'en_proceso' || a.estado === 'realizado') ? a.estado : 'pendiente'
          }));
          setActivities(sanitized);
        }
      } catch (error) {
        console.error('Error al cargar actividades:', error);
      }
    };

    // Carga inicial
    loadActivities();

    // Escuchar cambios en localStorage (otras pestañas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'notas-actividades-simple') {
        loadActivities();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Polling para detectar cambios en la MISMA pestaña si otras partes del app escriben
    const interval = setInterval(loadActivities, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Verificar si un día es sábado
  const isSaturday = (date: Date) => date.getDay() === 6; // 6 = sábado

  // Generar calendario
  const generateCalendar = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // inicia en domingo

    const calendar: CalendarDay[] = [];
    const today = startOfDay(new Date());

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      // Filtrar actividades para este día (incluye extremos)
      const cur = startOfDay(currentDate);
      const dayActivities = activities.filter(activity => {
        if (!activity.fechaInicio || !activity.fechaCierre) return false;
        // Permitir 'YYYY-MM-DD' o ISO
        const start = startOfDay(new Date(activity.fechaInicio + (activity.fechaInicio.length === 10 ? 'T00:00:00' : '')));
        const end = startOfDay(new Date(activity.fechaCierre + (activity.fechaCierre.length === 10 ? 'T00:00:00' : '')));
        return cur >= start && cur <= end;
      });

      calendar.push({
        date: new Date(currentDate),
        activities: dayActivities,
        hasCurso: isSaturday(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: startOfDay(currentDate).getTime() === today.getTime(),
        isSaturday: isSaturday(currentDate)
      });
    }

    return calendar;
  };

  const calendarDays = useMemo(() => generateCalendar(currentDate), [currentDate, activities]);

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

  // Filtrar solo actividades pendientes para el resumen
  const pendingActivities = activities.filter(activity => activity.estado === 'pendiente');

  return (
    <div className="min-h-screen bg-neutral-900 p-4 rounded-2xl">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
              <Calendar className="w-8 h-8" />
              Calendario de Actividades
            </h1>
            <p className="text-white mt-1">
              Visualiza tus cursos de los sábados y actividades pendientes
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-white">Actividades pendientes</div>
            <div className="text-2xl font-bold text-black bg-yellow-200 inline-block px-3 py-0.5 rounded border border-yellow-400">
              {pendingActivities.length}
            </div>
          </div>
        </div>

        {/* Calendario Principal */}
        <div className="bg-white rounded-lg border border-black/10 shadow-sm">
          {/* Header del calendario */}
          <div className="flex items-center justify-between p-6 border-b border-black/10">
            <button 
              onClick={previousMonth} 
              className="p-2 hover:bg-yellow-50 rounded-lg transition-colors border border-black/10"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <h2 className="text-2xl font-semibold text-black">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button 
              onClick={nextMonth} 
              className="p-2 hover:bg-yellow-50 rounded-lg transition-colors border border-black/10"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Grid del calendario */}
          <div className="p-6">
            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-3 mb-4">
              {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day, index) => (
                <div 
                  key={day} 
                  className={`text-center text-sm font-semibold py-3 rounded-lg ${
                    index === 6 ? 'text-black bg-yellow-100 border border-yellow-300' : 'text-black bg-white border border-black/10'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-3">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-32 p-3 border rounded-lg transition-all hover:shadow-sm ${
                    !day.isCurrentMonth 
                      ? 'bg-white text-black/40 border-black/10' 
                      : day.isToday 
                        ? 'bg-yellow-50 border-yellow-300 shadow-sm' 
                        : day.isSaturday
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-white border-black/10 hover:bg-yellow-50'
                  }`}
                >
                  {/* Número del día */}
                  <div className={`text-sm font-semibold mb-2 ${
                    day.isToday ? 'text-black' : 
                    day.isSaturday && day.isCurrentMonth ? 'text-black' : 
                    day.isCurrentMonth ? 'text-black' : 'text-black/40'
                  }`}>
                    {day.date.getDate()}
                  </div>

                  {/* Curso de sábado */}
                  {day.hasCurso && day.isCurrentMonth && (
                    <div className="bg-yellow-200 border border-yellow-400 text-black text-xs p-2 rounded-md mb-2 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span className="font-medium">Ir al curso</span>
                    </div>
                  )}

                  {/* Actividades del día */}
                  <div className="space-y-1">
                    {day.activities.slice(0, 2).map(activity => (
                      <div
                        key={activity.id}
                        className={`text-xs p-2 rounded-md ${estadoColors[activity.estado]} flex items-center gap-1`}
                      >
                        <Clock className="w-3 h-3" />
                        <span className="truncate font-medium">{activity.tema}</span>
                      </div>
                    ))}
                    {day.activities.length > 2 && (
                      <div className="text-xs text-black/60 text-center py-1">
                        +{day.activities.length - 2} más
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen de Actividades Pendientes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Próximos Sábados */}
          <div className="bg-white rounded-lg border border-black/10 shadow-sm">
            <div className="p-4 border-b border-black/10">
              <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-black" />
                Próximos Sábados de Curso
              </h3>
            </div>
            <div className="p-4">
              {(() => {
                const nextSaturdays: Date[] = [];
                const today = startOfDay(new Date());

                // Encontrar los próximos 4 sábados
                for (let i = 0; nextSaturdays.length < 4; i++) {
                  const checkDate = new Date(today);
                  checkDate.setDate(today.getDate() + i);
                  if (isSaturday(checkDate)) {
                    nextSaturdays.push(startOfDay(checkDate));
                  }
                }

                return nextSaturdays.map((saturday, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0 border-black/10">
                    <div>
                      <div className="font-medium text-black">Ir al curso</div>
                      <div className="text-sm text-black/60">
                        {saturday.toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </div>
                    </div>
                    <div className="bg-yellow-200 text-black border border-yellow-400 text-xs px-2 py-1 rounded-full">
                      Curso
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Actividades Pendientes */}
          <div className="bg-white rounded-lg border border-black/10 shadow-sm">
            <div className="p-4 border-b border-black/10">
              <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                <Clock className="w-5 h-5 text-black" />
                Actividades Pendientes ({pendingActivities.length})
              </h3>
            </div>
            <div className="p-4">
              {pendingActivities.length === 0 ? (
                <div className="text-center py-8 text-black/60">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-black/20" />
                  <p>No hay actividades pendientes</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {pendingActivities.map((activity) => (
                    <div key={activity.id} className="border border-black/10 rounded-lg p-3">
                      <div className="font-medium text-black mb-1">{activity.tema}</div>
                      <div className="text-sm text-black/80 mb-2">{activity.descripcion}</div>
                      <div className="flex items-center justify-between text-xs text-black/60">
                        <span>
                          {new Date(activity.fechaInicio).toLocaleDateString('es-ES')} - 
                          {new Date(activity.fechaCierre).toLocaleDateString('es-ES')}
                        </span>
                        <span className="bg-yellow-200 text-black px-2 py-1 rounded-full border border-yellow-400">
                          Pendiente
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leyenda (se mantiene con los mismos colores que tenías) */}
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Leyenda</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span>Curso (Sábados)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span>Actividad Pendiente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span>Actividad En Proceso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span>Actividad Realizada</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
