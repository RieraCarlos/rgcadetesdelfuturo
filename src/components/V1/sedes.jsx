{/*}
import React, {useState} from "react";
import IconAsesor from "../img/asesor.png";
import FotoCoca from "../img/fondo12.jpg"
import SedeCoca from "./Sedes/sedeCoca";
import SedeSacha from "./Sedes/sedeSacha";
import SedeLago from "./Sedes/sedeLago";

export default function Sedes() {
    const [currentSede, setCurrentSede] = useState("Lago Agrio");
    const [showSede, setShowSede] = useState(true);
    const [showSede2, setShowSede2] = useState(false);
    const [showSede3, setShowSede3] = useState(false);

    const handleSedeClick = (sede) => {
        setCurrentSede(sede);
        console.log(`Se ha hecho click en la sede ${sede}`);    
        // Actualizar el estado de las clases "active"
        setShowSede(sede === "Lago Agrio");
        setShowSede2(sede === "La Joya de los Sachas");
        setShowSede3(sede === "El coca");
      
    };


    return (
        <div className="contenedor-sedes">
            <div className="title-contenedor">
                <h2>Sedes del curso de <span>educación</span> en valores con disciplina militar</h2>    
            </div>      
            <div className="headers">
                <div onClick={() => handleSedeClick("Lago Agrio")} className={`sede-title1 ${showSede ? "active" : ""}`}>
                    <h2>Lago Agrio</h2>
                </div>   
                <div onClick={() => handleSedeClick("La Joya de los Sachas")} className={`sede-title2 ${showSede2 ? "active" : ""}`}>
                    <h2>La Joya de los Sachas</h2>
                </div>
                <div onClick={() => handleSedeClick("El coca")} className={`sede-title3 ${showSede3 ? "active" : ""}`}>
                    <h2>El Coca</h2>    
                </div>
            </div>    
            <div className="descriptions">
                {currentSede === "Lago Agrio" && <SedeLago />}  
                {currentSede === "La Joya de los Sachas" && <SedeSacha />}
                {currentSede === "El coca" && <SedeCoca />}
               
            </div>
        </div>
    );
};
*/}