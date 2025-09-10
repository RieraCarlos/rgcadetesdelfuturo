import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// Define the types for your form data
interface IRegistrationForm {
  studentName: string;
  birthDate: string;
  idNumber: string;
  gender: string;
  bloodType: string;
  canton: string;
  address: string;
  zone: string;
  aspirantDocument: string;
  healthService: string;
  allergies: string;
  fractures: string;
  treatments: string;
  representativeName: string;
  representativeBirthDate: string;
  kinship: string;
  representativeId: string;
  representativePhone: string;
  advisorName: string;
}

const RegistroEstudiante: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IRegistrationForm>();

  const onSubmit: SubmitHandler<IRegistrationForm> = data => {
    console.log(data);
    //endpoint
    
    // Here you would handle the form submission, e.g., send data to an API
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 font-sans">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-6xl border-2 border-gray-200 rounded-xl p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 py-2 px-4">
          Formulario de matriculas
        </h1>

        {/* Section: Student Information */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-white flex-1">
            <div className="w-full h-40 md:h-full flex items-center justify-center bg-gray-500 text-white rounded-lg">
              <span className="text-lg">Ingrese imagen</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Nombres del estudiante"
              {...register('studentName', { required: true })}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Fecha de Nacimiento"
              type="date"
              {...register('birthDate', { required: true })}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese la N cédula"
              {...register('idNumber', { required: true })}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Genero"
              {...register('gender')}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Tipo de Sangre"
              {...register('bloodType')}
            />
          </div>
        </div>

        {/* Section: Location and Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Canton"
            {...register('canton')}
          />
          <input
            className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Dirección"
            {...register('address')}
          />
          <input
            className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Zona"
            {...register('zone')}
          />
          <input
            className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Documento del aspirante"
            {...register('aspirantDocument')}
          />
        </div>

        {/* Section: Health Information */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 py-2 px-4 rounded-md border-2 border-white">Datos de salud</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Servicio de salud"
              {...register('healthService')}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Alergias"
              {...register('allergies')}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Fracturas"
              {...register('fractures')}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enfermedades con tratamiento"
              {...register('treatments')}
            />
          </div>
        </div>

        {/* Section: Representative Information */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 py-2 px-4 rounded-md border-2 border-white">Datos del representante</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 col-span-1 md:col-span-2"
              placeholder="Nombre del representante"
              {...register('representativeName')}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Fecha de Nacimiento"
              type="date"
              {...register('representativeBirthDate')}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Parentesco"
              {...register('kinship')}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese la N cédula"
              {...register('representativeId')}
            />
            <input
              className="p-3 rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese n° de celular"
              {...register('representativePhone')}
            />
          </div>
        </div>

        {/* Section: Advisor Information */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 py-2 px-4 rounded-md border-2 border-white">Datos del asesor</h2>
          <input
            className="p-3 w-full rounded-md bg-gray-500 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Nombre del asesor"
            {...register('advisorName')}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 rounded-xl font-bold text-lg bg-orange-600 hover:bg-orange-700 transition-colors"
        >
          Matricular
        </button>
      </form>
    </div>
  );
};

export default RegistroEstudiante;