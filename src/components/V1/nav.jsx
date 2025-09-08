import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Nav() {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    }

    return (
        <div className="contenedor-nav h-[60px] flex justify-center items-center">
            <div className="logo">
                <Link to="/rgtechnology" className="link-item"></Link>
            </div>
            <div>
                <div className="paginas">
                    <div className="title-paginas flex justify-center items-center h-full">
                        <h2 onClick={handleClick}>Home</h2>
                       
                    </div>
                    <h2 className="title-paginas">Servicios</h2>
                    <h2 className="title-paginas">Contactos</h2>
                    <ul className="lista-pages" style={{display: show ? 'flex' : 'none'}}>
                            <li><Link to="/lagoagrio" className="link-item">Lago Agrio</Link></li>
                            <li><Link to="/index.html" className="link-item">El Coca</Link></li>
                            <li><Link to="/index.html" className="link-item">La Joya de los Sachas</Link></li>
                    </ul>
                    <button className="bg-white px-5 py-1 rounded-xl"><Link to="/login">Iniciar sesion</Link></button>    
                </div>
            </div>
            
        </div>
    )
}
