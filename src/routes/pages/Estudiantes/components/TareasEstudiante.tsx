import { ClipboardList } from 'lucide-react';
import React from 'react';

// Datos de ejemplo para las tareas (Cambiado a vacío para mostrar Empty State)
const tasksData: any[] = [];

const Tareas = () => {
  const hasTasks = tasksData.length > 0;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-sm rounded-3xl border-2 border-dashed border-[#ffcc01]/30 p-8 md:p-16 flex flex-col items-center justify-center text-center transition-all hover:border-[#ffcc01]/50">
        
        {!hasTasks ? (
          <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="p-6 rounded-full bg-[#ffcc01]/10 border-2 border-[#ffcc01]/20">
              <ClipboardList className="h-16 w-16 md:h-20 md:w-20 text-[#ffcc01]" strokeWidth={1.5} />
            </div>
            
            <div className="space-y-3 max-w-md">
              <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                Próximas Tareas
              </h2>
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                Aún no se han generado tareas. Pronto estarán disponibles para tu proceso de aprendizaje.
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#ffcc01]/5 border border-[#ffcc01]/10 text-[#ffcc01] text-sm font-medium">
                Sincronizado con tu plan de estudio
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col space-y-6">
            {tasksData.map((task, index) => (
              <div key={index} className="bg-[#ffcc01] p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-col space-y-2">
                  <div className="p-3 rounded-lg bg-[#030403]">
                    <h3 className="font-bold text-lg md:text-xl text-[#ffcc01]">Tema:</h3>
                    <p className="text-gray-300">{task.topic}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#030403]">
                    <h3 className="font-bold text-lg md:text-xl text-[#ffcc01]">Actividad:</h3>
                    <p className="text-gray-300">{task.activity}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#030403]">
                    <h3 className="font-bold text-lg md:text-xl text-[#ffcc01]">Recursos:</h3>
                    <ul className="text-gray-300 list-disc list-inside space-y-1">
                      {task.resources.map((resource: string, i: number) => (
                        <li key={i}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className={`py-2 px-6 rounded-lg text-sm md:text-base font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all ${
                      task.completed ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {task.completed ? 'Cumplida' : 'Pendiente'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tareas;