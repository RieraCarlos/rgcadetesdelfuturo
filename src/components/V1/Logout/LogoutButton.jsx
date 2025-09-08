import React from "react";
import { SessionContext } from "../SessionLogin/SessionContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const { logout } = useContext(SessionContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login"); // Redirigir a la página de inicio de sesión    
    }
    return <button onClick={handleLogout}>Cerrar Sesión</button>
}