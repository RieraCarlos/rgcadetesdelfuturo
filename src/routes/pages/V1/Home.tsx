import React from "react";
import Nav from "../../../components/V1/nav.jsx";
import Element1 from "../../../components/V1/element1.jsx";
import Element2 from "../../../components/V1/element2.jsx";
import Element3 from "../../../components/V1/element3.jsx";
import Empresas from "../../../components/V1/empresas.jsx";
import Sedes from "../../../components/V1/sedes.jsx";
import Footer from "../../../components/V1/footer.jsx";
import Publicidad from "../../../components/V1/publicidad.jsx";

export default function Home() {
    return (
        <div className="contenedor-home">
            <Element1 />
            <Element2 />
            <Element3 />
            <Empresas />
            <Sedes />
            <Publicidad />
            <Footer />
        </div>
    )
}