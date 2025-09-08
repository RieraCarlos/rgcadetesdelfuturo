import React, { useContext, useState } from "react";
import { authenticateUser } from "../../../components/database/supabase";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../../components/SessionLogin/SessionContext";

export default function Login() {
    const navigate = useNavigate();
    const {login} = useContext(SessionContext);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const user = await authenticateUser(username, token);
        if (user) {
            login(user);
            setSuccess(true);
            setError('');
            navigate('/scanner'); 
            console.log('Usuario autenticado:', user);

        } else {
            setError('Credenciales incorrectas. Intente nuevamente.');
            setSuccess(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <button type="submit">Iniciar Sesión</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Inicio de sesión exitoso</p>}
            </div>
        </div>
    )
}