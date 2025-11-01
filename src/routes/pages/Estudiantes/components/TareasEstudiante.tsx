import React from 'react';

// Datos de ejemplo para las tareas
const tasksData = [
  {
    topic: 'Introducción a React',
    activity: 'Configurar el entorno de desarrollo',
    resources: ['https://reactjs.org/docs/getting-started.html', 'Tutorial en video', 'Guía en PDF'],
    completed: false,
  },
  {
    topic: 'Componentes y Props',
    activity: 'Crear tu primer componente',
    resources: ['Documentación oficial', 'Ejemplos de código'],
    completed: true,
  },
  {
    topic: 'Manejo de Estados',
    activity: 'Crear un contador simple',
    resources: ['Recurso de estado'],
    completed: false,
  },
];

const Tareas = () => {
  return (
    <div className=" min-h-screen flex flex-col md:flex-row items-center justify-center">
      {/* Contenido principal de las tareas */}
      <div className="flex-1 p-6 md:p-12 rounded-3xl md:border-l-8 md:border-t-4 md:border-b-4 md:border-[#ffcc01] max-w-[80%]">

        {/* Lista de tareas */}
        <div className="flex flex-col space-y-6">
          {tasksData.map((task, index) => (
            <div key={index} className="bg-[#ffcc01] p-4 rounded-xl">
              <div className="flex flex-col space-y-2">
                <div className="p-3 rounded-lg bg-[#030403]">
                  <h3 className="font-bold text-lg md:text-xl text-[#ffcc01]">Tema:</h3>
                  <p className="text-gray-300">{task.topic}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#030403] ">
                  <h3 className="font-bold text-lg md:text-xl text-[#ffcc01]">Actividad:</h3>
                  <p className="text-gray-300">{task.activity}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#030403]">
                  <h3 className="font-bold text-lg md:text-xl text-[#ffcc01]">Recursos:</h3>
                  <ul className="text-gray-300 list-disc list-inside space-y-1">
                    {task.resources.map((resource, i) => (
                      <li key={i}>{resource}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className={`py-2 px-4 rounded-full text-sm md:text-base font-semibold transition-colors ${task.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {task.completed ? 'Cumplida' : 'Pendiente'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tareas;