import ImgSuperBen from "../../assets/img/SuperBen.png"
export default function SuperBen(){
    return(
        <div className="relative min-h-screen bg-black text-yellow-400 font-serif overflow-hidden flex flex-col items-center justify-center p-4">
            <style>
                {`
                @keyframes crawl {
                    0% {
                        top: 100%;
                        transform: rotateX(20deg) scale(1);
                    }
                    100% {
                        top: -200%;
                        transform: rotateX(25deg) scale(0.5);
                    }
                }

                .star-wars-crawl {
                    position: absolute;
                    top: 100%;
                    animation: crawl 60s linear infinite; /* Adjust duration as needed */
                    transform-origin: 50% 100%;
                    text-align: justify;
                    font-size: 2.5vw; /* Responsive font size */
                    line-height: 1.5;
                    width: 80%; /* Adjust width as needed */
                    max-width: 800px;
                    padding: 0 10%;
                }

                .star-wars-container {
                    perspective: 400px;
                    overflow: hidden;
                    position: relative;
                    height: 100vh;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .star-wars-title {
                    position: relative;
                    font-size: 5vw;
                    text-align: center;
                    margin-bottom: 20px;
                    color: #4CAF50; /* Green color for title */
                    z-index: 10;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
                }

                .star-wars-subtitle {
                    position: relative;
                    font-size: 2vw;
                    text-align: center;
                    margin-top: 20px;
                    color: #00BFFF; /* Light blue for subtitle */
                    z-index: 10;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .star-wars-crawl {
                        font-size: 4vw;
                        width: 95%;
                        padding: 0 2.5%;
                    }
                    .star-wars-title {
                        font-size: 8vw;
                    }
                    .star-wars-subtitle {
                        font-size: 3.5vw;
                    }
                }

                @media (max-width: 480px) {
                    .star-wars-crawl {
                        font-size: 5vw;
                        width: 98%;
                        padding: 0 1%;
                    }
                    .star-wars-title {
                        font-size: 10vw;
                    }
                    .star-wars-subtitle {
                        font-size: 4.5vw;
                    }
                }
                `}
            </style>
        <div className="min-h-screen bg-[#171717] text-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#8d8159] mb-6">SuperBen</h2>
                <img src={ImgSuperBen} alt="SuperBen" className="w-48 h-48 object-contain mx-auto mb-8 rounded-lg shadow-lg" />
                <div className="text-lg leading-relaxed text-gray-300 space-y-6 text-justify">
                    <p>
                        En un futuro no muy lejano, la Tierra fue invadida por una especie inesperada: ardillas extraterrestres, criaturas inteligentes provenientes del planeta Nutronia, decididas a conquistar el mundo y recolectar toda la energía vital del planeta.
                        Las ciudades cayeron, los bosques fueron silenciados… y la humanidad perdió la esperanza.
                    </p>
                    <p>
                        Hasta que, en un laboratorio oculto bajo la cordillera андina, el Profesor Carlos, un brillante científico con un corazón noble, decidió crear al héroe que el mundo necesitaba.
                        Usando tecnología genética avanzada, ADN canino y circuitos de energía cuántica, nació SuperBen, un perro con fuerza sobrehumana, mente brillante y un olfato para el peligro.
                    </p>
                    <p>
                        Pero SuperBen no nació siendo un héroe…
                        Para liberar a la Tierra, deberá superar una serie de desafíos científicos y mentales:
                        <br/>🔹 Resolver rompecabezas que desbloquean códigos secretos.
                        <br/>🔹 Escapar de laberintos con trampas interdimensionales.
                        <br/>🔹 Superar experimentos diseñados para probar su valentía.
                        <br/>🔹 Recuperar cartas secretas que revelan el origen de las ardillas invasoras.
                    </p>
                    <p>
                        Cada misión completada lo hace más fuerte, más sabio… y más cercano a su destino final:
                        💥 Derrotar a la Reina Ardilla y restaurar el equilibrio del planeta.
                    </p>
                </div>
                <h6 className="text-xl sm:text-2xl font-bold text-gray-400 mt-10">
                    🎮 SuperBen: Un juego gamificado para todas las edades, donde aprender, pensar y actuar con valor te convierten en el verdadero héroe.
                </h6>
            </div>
        </div>
        </div>
    )
}