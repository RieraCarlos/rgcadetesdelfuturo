import React from "react";
import IconAsesora from "../../img/asesora.png";
import FotoCoca from "../../img/fondo12.jpg"

export default function SedeCoca() {
    return (
        <div className="sede-description1">
            <div className="contenido">
                <div className="asesores">
                    <div className="asesor">
                        <img src={IconAsesora} alt="" />
                        <h2>Jennifer Valladolid - Asesora</h2>
                        <p><a href="https://api.whatsapp.com/send?phone=593989203222&text=Informacion">+593 98 920 3222</a></p>
                    </div>
                </div>
                <div className="direccion">
                    <h2>Dirección de oficina</h2>
                    <p>Calle Eugenio Espejo y Quito, El Coca, Ecuador<br/>Edificio Azriel Shopping</p>
                </div>
            </div>
            <div className="imagen-sede">
                <img src={FotoCoca} alt="" />
            </div>
        </div>  
    )
}   