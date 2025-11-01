import Soldado3 from "../../../../assets/img/Soldado3.avif";
const PerfilEstudiante = () => {
    ///
  return (
    <div className="flex items-center justify-center">
        <div className="flex-1 p-6 md:p-12 max-w-[80%] rounded-3xl border-l-8 border-t-4 border-b-4 border-[#ffcc01]">
            {/* Sección del usuario */}
            <div className="flex flex-col items-center text-center">
                <div className="w-auto h-auto rounded-full border-4 border-[#ffcc01] flepngx items-center justify-center mb-4 md:mb-8 pt-2">
                    {/* Espacio para la imagen de perfil */}
                    <img src={Soldado3} alt="" className="w-xl md:w-auto h-2xl md:h-[300px] rounded-full"/>
                </div>
                <h2 className="text-xl md:text-3xl font-semibold">Nombre de usuario</h2>
            </div>

            {/* Sección de Insignias */}
            <div className="mt-8 md:mt-12 text-center">
                <h3 className="text-lg md:text-2xl font-bold mb-4">Insignias</h3>
                <div className="flex justify-center space-x-4 md:space-x-8">
                {[1, 2, 3].map(badge => (
                    <div key={badge} className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-700 border-2 border-gray-500"></div>
                ))}
                </div>
            </div>

            {/* Sección de Felicitaciones */}
            <div className="mt-8 md:mt-12 text-center">
                <h3 className="text-2xl md:text-4xl font-bold mb-2 text-orange-400">¡Felicidades!</h3>
                <p className="text-base md:text-lg text-gray-400">Eres uno de los 10 mejores</p>
            </div>
        </div>
    </div>
    
  );
};

export default PerfilEstudiante;