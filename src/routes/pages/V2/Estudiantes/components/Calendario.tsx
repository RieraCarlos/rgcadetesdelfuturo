import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, BookOpen, Clock } from 'lucide-react';

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
  hasCurso: boolean;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSaturday: boolean;
}

const estadoColors = {
  pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  en_proceso: 'bg-blue-100 text-blue-800 border-blue-200',
  realizado: 'bg-green-100 text-green-800 border-green-200'
};

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activities, setActivities] = useState<ActivityCard[]>([]);

  // Cargar actividades desde localStorage
  useEffect(() => {
    const loadActivities = () => {
      const saved = localStorage.getItem('notas-actividades-simple');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setActividades(parsed);
        } catch (error) {
          console.error('Error al cargar actividades:', error);
        }
      }
    };

    // Cargar inicial
    loadActivities();

    // Escuchar cambios en localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'notas-actividades-simple') {
        loadActivities();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Polling para detectar cambios en la misma pestaña
    const interval = setInterval(loadActivities, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const setActividades = setActivities;

  // Verificar si un día es sábado
  const isSaturday = (date: Date) => {
    return date.getDay() === 6; // 6 = sábado
  };

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
      
      // Filtrar actividades para este día
      const dayActivities = activities.filter(activity => {
        const start = new Date(activity.fechaInicio);
        const end = new Date(activity.fechaCierre);
        return currentDate >= start && currentDate <= end;
      });

      calendar.push({
        date: new Date(currentDate),
        activities: dayActivities,
        hasCurso: isSaturday(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.getTime() === today.getTime(),
        isSaturday: isSaturday(currentDate)
      });
    }

    return calendar;
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

  // Filtrar solo actividades pendientes para el resumen
  const pendingActivities = activities.filter(activity => activity.estado === 'pendiente');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              Calendario de Actividades
            </h1>
            <p className="text-gray-600 mt-1">
              Visualiza tus cursos de los sábados y actividades pendientes
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Actividades pendientes</div>
            <div className="text-2xl font-bold text-blue-600">{pendingActivities.length}</div>
          </div>
        </div>

        {/* Calendario Principal */}
        <div className="bg-white rounded-lg border shadow-sm">
          {/* Header del calendario */}
          <div className="flex items-center justify-between p-6 border-b">
            <button 
              onClick={previousMonth} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button 
              onClick={nextMonth} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Grid del calendario */}
          <div className="p-6">
            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-3 mb-4">
              {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day, index) => (
                <div 
                  key={day} 
                  className={`text-center text-sm font-semibold py-3 ${
                    index === 6 ? 'text-blue-600 bg-blue-50 rounded-lg' : 'text-gray-600'
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
                      ? 'bg-gray-50 text-gray-400 border-gray-200' 
                      : day.isToday 
                        ? 'bg-blue-50 border-blue-300 shadow-sm' 
                        : day.isSaturday
                          ? 'bg-blue-25 border-blue-200'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {/* Número del día */}
                  <div className={`text-sm font-semibold mb-2 ${
                    day.isToday ? 'text-blue-600' : 
                    day.isSaturday && day.isCurrentMonth ? 'text-blue-600' : 
                    day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {day.date.getDate()}
                  </div>

                  {/* Curso de sábado */}
                  {day.hasCurso && day.isCurrentMonth && (
                    <div className="bg-blue-100 border border-blue-200 text-blue-800 text-xs p-2 rounded-md mb-2 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span className="font-medium">Ir al curso</span>
                    </div>
                  )}

                  {/* Actividades del día */}
                  <div className="space-y-1">
                    {day.activities.slice(0, 2).map(activity => (
                      <div
                        key={activity.id}
                        className={`text-xs p-2 rounded-md border ${estadoColors[activity.estado]} flex items-center gap-1`}
                      >
                        <Clock className="w-3 h-3" />
                        <span className="truncate font-medium">{activity.tema}</span>
                      </div>
                    ))}
                    {day.activities.length > 2 && (
                      <div className="text-xs text-gray-500 text-center py-1">
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
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Próximos Sábados de Curso
              </h3>
            </div>
            <div className="p-4">
              {(() => {
                const nextSaturdays = [];
                const today = new Date();
                let date = new Date(today);
                
                // Encontrar los próximos 4 sábados
                for (let i = 0; nextSaturdays.length < 4; i++) {
                  const checkDate = new Date(today);
                  checkDate.setDate(today.getDate() + i);
                  if (isSaturday(checkDate)) {
                    nextSaturdays.push(new Date(checkDate));
                  }
                }

                return nextSaturdays.map((saturday, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                      <div className="font-medium">Ir al curso</div>
                      <div className="text-sm text-gray-500">
                        {saturday.toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Curso
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Actividades Pendientes */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                Actividades Pendientes ({pendingActivities.length})
              </h3>
            </div>
            <div className="p-4">
              {pendingActivities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No hay actividades pendientes</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {pendingActivities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-3">
                      <div className="font-medium text-gray-900 mb-1">{activity.tema}</div>
                      <div className="text-sm text-gray-600 mb-2">{activity.descripcion}</div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {new Date(activity.fechaInicio).toLocaleDateString()} - 
                          {new Date(activity.fechaCierre).toLocaleDateString()}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
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

        {/* Leyenda */}
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