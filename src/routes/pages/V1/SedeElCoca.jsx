import React from "react";
import Nav from "../../../components/nav";

export default function SedeElCoca() {  
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
                            CURSO DE <span>EDUCACIÓN</span> EN VALORES<br/> CON DISCIPLINA MILITAR
                        </h1>
                        <p>
                            Para niños de 8 años hasta jóvenes de 17 años, preparándolos para afrontar desafíos con carácter y compromiso.
                        </p>
                        <button className="join-button"><a href="https://api.whatsapp.com/send?phone=593979358299&text=Informacion">¡Inscribirme ahora!</a></button> 
                    </div>
                </div>
            </div>
        </div>
    )
}