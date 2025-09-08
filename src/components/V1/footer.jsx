import React from "react";
import Facebook from "../img/facebook.png";
import WhatsApp from "../img/whatsApp.webp";
import Instagram from "../img/instagram.webp";
import Tiktok from "../img/tiktok.png";
import Linkedin from "../img/linkedin.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <div className="link-section">
                    <h4>MENU</h4>
                    <ul>
                        <li><Link to="/lagoagrio">Lago Agrio</Link></li>
                        <li><a href="#">El Coca</a></li>
                        <li><a href="#">Joya de los Sachas</a></li>
                    </ul>
                </div>
                <div className="link-section">
                    <h4>Ubicación</h4>
                    <p>Lago Agrio,<br/> Av. Venezuela y calle Malta Km 3-1/2<br/> Barrio Sta Isabel<br/> (Oficina ubicada junto a la Radio El Cisne.)</p>
                </div>
                <div className="link-section">
                    <h4>Contáctanos</h4>
                    <p>Yerline Pin: <a href="https://api.whatsapp.com/send?phone=593979358299&text=Informacion">+593 97 935 8299</a></p>
                    <p>Kenneth Riera: <a href="https://api.whatsapp.com/send?phone=593987984878&text=Informacion">+593 98 798 4878</a></p>
                    <p>Email: <a href="carlos710jair@gmail.com">carlos710jair@gmail.com</a></p>
                </div>
                <div className="link-section">
                    <h4>Síguenos</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/p/Centro-de-Formaci%C3%B3n-Start-Good-100067946552938/"><img src={Facebook} alt="Facebook" /></a>
                        <a href="https://api.whatsapp.com/send?phone=593987984878&text=Informacion"><img src={WhatsApp} alt="WhatsApp" /></a>
                        <a href="https://www.instagram.com/startgood_ecuador/"><img src={Instagram} alt="Instagram" /></a>
                        <a href="https://www.tiktok.com/@startgoodec"><img src={Tiktok} alt="Pinterest" /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 RG-technology.com. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}