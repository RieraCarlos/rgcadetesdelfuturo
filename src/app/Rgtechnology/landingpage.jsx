import React from "react";
import TECHNOLOGY from "../../img/TECHNOLOGY.jpg";
export default function Rgtechnology() {
    return (
        <div className="rg-hero-container">
        <nav className="rg-navbar">
            <div className="rg-logo">RG Technology</div>
            <ul className="rg-nav-links">
                {/*<li><a href="#home">Inicio</a></li>
                <li><a href="#about">Sobre Nosotros</a></li>
                <li><a href="#work">Servicios</a></li>
                <li><a href="#info">Contacto</a></li>
                <li><button className="rg-get-started-button">Comenzar</button></li>*/}
            </ul>
        </nav>

        <div className="rg-hero-content">
            <div className="rg-hero-text">
                <h1>Servicios de Diseño Web</h1>
                <p>
                    En RG Technology ofrecemos soluciones digitales innovadoras y personalizadas para impulsar el crecimiento de tu negocio.
                    Nuestros servicios están orientados a mejorar tu productividad, eficiencia y presencia en línea a través de herramientas tecnológicas de alta calidad.
                </p>
                <button className="rg-learn-more-button">Saber Más</button>
            </div>
            <div className="rg-hero-image">
                <img src={TECHNOLOGY} alt="Website Design Illustration" />
            </div>
        </div>

        <div className="rg-services-overview">
            <h2>¿Qué hacemos en RG Technology?</h2>
            <p>
                En RG Technology ofrecemos soluciones digitales innovadoras y personalizadas para impulsar el crecimiento de tu negocio.
                Nuestros servicios están orientados a mejorar tu productividad, eficiencia y presencia en línea a través de herramientas tecnológicas de alta calidad.
            </p>
            <h3>Nuestros servicios incluyen:</h3>
            <ul>
                <li>Desarrollo de páginas web para empresas, negocios locales y restaurantes.</li>
                <li>Creación de tiendas en línea (e-commerce) totalmente funcionales y seguras.</li>
                <li>Sistemas personalizados para el control y seguimiento de gastos, ingresos y egresos.</li>
                <li>Automatización y creación de sistemas internos utilizando herramientas de la suite de Google (Google Sheets, Forms, Apps Script, etc.).</li>
                <li>Optimización y eficiencia de software, enfocada en mejorar procesos operativos.</li>
                <li>Consultoría tecnológica personalizada, adaptada a las necesidades de tu empresa.</li>
            </ul>
        </div>
    </div>
    );
}