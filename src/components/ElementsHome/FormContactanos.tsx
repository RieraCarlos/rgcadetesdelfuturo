import Avatar from '../../assets/img/personaje.avif'

export default function FormContactanos() {
    return (
        <div className="flex flex-col justify-center items-center text-white py-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold mb-12 text-center">Contáctanos</h2>
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Columna del Formulario */}
                <div className="w-full">
                    <form className="w-full p-8 rounded-2xl shadow-xl/20 shadow-gray-50 backdrop-blur-sm ">
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                                Nombre
                            </label>
                            <input
                                className="w-full px-3 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d8159]"
                                id="name"
                                type="text"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                className="w-full px-3 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d8159]"
                                id="email"
                                type="email"
                                placeholder="Tu correo electrónico"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="message">
                                Mensaje
                            </label>
                            <textarea
                                className="w-full px-3 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8d8159]"
                                id="message"
                                rows={4}
                                placeholder="Escribe tu mensaje aquí..."
                            ></textarea>
                        </div>
                        <button
                            className="bg-[#8d8159] hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8d8159] transition-all duration-300"
                            type="submit"
                        >
                            Enviar
                        </button>
                    </form>
                </div>

                {/* Columna de la Imagen */}
                <div className="w-full flex justify-center items-center md:order-last">
                    <img src={Avatar} alt="Asistente virtual" className='w-64 md:w-80 lg:w-96' />
                </div>
            </div>
        </div>
    )
}
 