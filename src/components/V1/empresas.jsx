import React from "react";
import Empresa3 from "../img/E-tools.png";

export default function Empresas() {
  return (
    <div className="contenendor-empresas">
        <div className="title">
            <h2>Empresas que confían en <span>nosotros</span></h2>
        </div>
        <div className="empresas">
            <ul className="empresas-list">
                {/*<li className="empresa-2"><img src={Empresa2} alt="Colegio RG" /></li>*/}
                <li className="empresa-2"><img src={Empresa3} alt="E-tools" /></li>
            </ul>
        </div>    
    </div>
  );
}