import React, { useContext } from "react";
import { SessionContext } from "../SessionLogin/SessionContext";

export default function Header() {
    const {user, isAuthenticated} = useContext(SessionContext);

    return (
        <header>
            {isAuthenticated ? (
                <p>Bienvenido, {user.username}</p>
            ):(
                <p>No has iniciado sesión</p>
            )}
        </header>
    )
}