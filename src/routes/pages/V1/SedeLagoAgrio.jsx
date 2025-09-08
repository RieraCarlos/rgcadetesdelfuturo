import React from "react";
import Nav from "../../../components/nav";
import Footer from "../../../components/footer";
import Soldado1 from "../../img/soldado1.png";
import Soldado2 from "../../img/soldado2.png";
import Soldado3 from "../../img/soldado3.png";
import Soldado4 from "../../img/soldado4.png";
import Soldado5 from "../../img/soldado5.png";
import Soldado6 from "../../img/soldado6.png";
import Soldado7 from "../../img/soldado7.png";
import Soldado8 from "../../img/soldado8.png";
import Soldado9 from "../../img/soldado9.png";
import Soldado10 from "../../img/soldado10.png";
import Escudo from "../../img/Escudo_de_Ecuador.png";
import { Link } from "react-router-dom";

export default function SedeLagoAgrio() {
    return (
        <div>
            <div className="hero-section">
                <div className="hero-image">
                    <div className="espacio-nav">
                        <Nav />
                    </div>
                    <div className="overlay"></div>
                    <div className="content">
                        <h1>
                            Bienvenidos a la sede <span>Lago Agrio</span>
                        </h1>
                        <p>
                            Formando a niños y jóvenes una enseñanza basada en el respeto, la responsabilidad y el liderazgo.
                        </p>
                        <button className="join-button"><a href="https://api.whatsapp.com/send?phone=593979358299&text=Informacion">¡Inscribirme ahora!</a></button> 
                    </div>
                </div>
            </div>
            <div className="card1">
                <div className="title-card1">
                    <h2>Mejores aspirantes a <span>soldados</span></h2>
                </div>
                <div className="content-card1">
                    <div className="fila fila-1">
                        <div className="estudiante">
                            <img src={Soldado1} alt="Estudiante 1" />
                        </div>
                    </div>
                    <div className="fila fila-2">
                        <div className="estudiante">
                            <img src={Soldado2} alt="Estudiante 2" />
                        </div>
                        <div className="estudiante">
                            <img src={Soldado3} alt="Estudiante 3" />
                        </div>
                    </div>
                    <div className="fila fila-3">
                        <div className="estudiante">
                            <img src={Soldado4} alt="Estudiante 4" />
                        </div>
                        <div className="estudiante">
                            <img src={Soldado5} alt="Estudiante 5" />
                        </div>
                        <div className="estudiante">
                            <img src={Soldado6} alt="Estudiante 6" />
                        </div>
                    </div>
                    <div className="fila fila-4">
                        <div className="estudiante">
                            <img src={Soldado7} alt="Estudiante 7" />
                        </div>
                        <div className="estudiante">
                            <img src={Soldado8} alt="Estudiante 8" />
                        </div>
                        <div className="estudiante">
                            <img src={Soldado9} alt="Estudiante 9" />
                        </div>
                        <div className="estudiante">
                            <img src={Soldado10} alt="Estudiante 10" />
                        </div>
                    </div>
                </div>
                <div className="mensaje">
                    <p>Nos complace reconocer a los diez aspirantes que han destacado por su esfuerzo, disciplina y liderazgo. Su dedicación es un ejemplo para todos.</p>
                    <ul>
                        <li>🫡ANTHONELLA ROXELL TOCTO QUEREVALU🪖</li>
                        <li>🫡BERNARDO ISMAEL RODRIGUEZ SANTOS🪖</li>
                        <li>🫡ALEXIS ANIBAL GOMEZ SANCHEZ🪖</li>
                        <li>🫡TORRES VASQUEZ JUAN MARCELO🪖</li>
                        <li>🫡MILAN MALDONADO ALEXIS JOSUE🪖</li>
                        <li>🫡ALDANA AGUILAR IAN JEREMY🪖</li>
                        <li>🫡MATEO GABRIEL ASTUDILLO TORRES🪖</li>
                        <li>🫡RODRIGUEZ MORALES ARELYS CRISLEY🪖</li>
                        <li>🫡BANSHUY CORDOVA GENESIS MISHELL🪖</li>
                        <li>🫡CRIOLLO TOAPANTA CARLOS DUVIAN🪖</li>

                    </ul>
                    <span>¡Sigamos adelante, siempre en busca de la excelencia!</span>
                </div>
            </div>
            <div className="carruselP">
                <div className="marquee">
                    <div className="marquee-content">
                        <span>Disciplina</span>
                        <span>Honor</span>
                        <span>Lealtad</span>
                        <span>Patriotismo</span>
                        <span>Servicio</span>
                        <span>Deber</span>
                        <span>Obediencia</span>
                        <span>Liderazgo</span>
                        <span>Compañerismo</span>
                        <span>Estrategia</span>
                        <span>Táctica</span>
                        <span>Misión</span>
                        <span>Orden</span>
                        <span>Comando</span>
                        <span>Jerarquía</span>
                        {/* */}
                        <span>Disciplina</span>
                        <span>Honor</span>
                        <span>Lealtad</span>
                        <span>Patriotismo</span>
                        <span>Servicio</span>
                        <span>Deber</span>
                        <span>Obediencia</span>
                        <span>Liderazgo</span>
                        <span>Compañerismo</span>
                        <span>Estrategia</span>
                        <span>Táctica</span>
                        <span>Misión</span>
                        <span>Orden</span>
                        <span>Comando</span>
                        <span>Jerarquía</span>
                    </div>
                </div>
            </div>
            <div className="informacion">
                <div className="escudo">
                    <img src={Escudo} alt="" />
                </div>
                <div className="buttons-info">
                    <button><Link to="/login">Instructores</Link></button>
                    <button><a href="">Administrativo</a></button>
                </div>
            </div>
            <Footer />
        </div>
    )
}