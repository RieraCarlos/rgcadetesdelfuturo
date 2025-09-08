import React from "react";
import Escudo from "../img/escudo.png";
import { Link } from "react-router";
import SplinePage from "./Spline/Page";

export default function Element2() {
    return (
        <div className="info-section">
            <div className="column spline-section">
                <SplinePage/>
            </div>
            <div className="column welcome-section">
                <h2>¡Bienvenidos aspirantes a cadetes!</h2>
                <img
                src={Escudo}
                alt="Academy"
                className="academy-image"
                />
                <p>Nuestro compromiso es formar niños y jóvenes en disciplina, liderazgo y trabajo en equipo, combinando enseñanza teórica y práctica.</p>
                {/*<button className="join-button">More</button>*/}
            </div>
            {/*}
            <div className="column news-section">
                <h2>Iniciamos en Lago Agrio</h2>
                <ul>
                <li>
                    <p>Sábado 15 de Febrero del 2025 <br/><span>09:00am Inauguración</span></p>
                </li>
                <li>
                    <p>Duración del curso<br/><span>4 meses, todos los sábados</span></p>
                </li>
                <li>
                    <p>Certificados avalados por la Universidad de<br/>Quevedo <span>(certificado por cada nivel)</span></p>
                </li>
                </ul>
                <Link to="/lagoagrio" className="news-archive-link">Más</Link>
            </div>
            */}
            <div className="column why-choose-us">
                <h2>Módulos</h2>
                <ul>
                    <li>
                        <span className="number">1</span>
                        <div>
                            <strong>Primera unidad</strong>
                            <p>Nivel 1: Aspirante a cadete instrucción formal</p>
                        </div>
                    </li>
                    <li>
                        <span className="number">2</span>
                        <div>
                        <strong>Segunda unidad</strong>
                        <p>Nivel 2: Cadete en formación</p>
                        </div>
                    </li>
                    <li>
                        <span className="number">3</span>
                        <div>
                        <strong>Tercera Unidad</strong>
                        <p>Nivel 3: Cadete especialista en técnicas de supervivencia</p>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}