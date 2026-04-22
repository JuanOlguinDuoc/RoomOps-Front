import React, { useState } from 'react'
import { showErrorToast, showSuccessToast } from '../../utils/toast.js';
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import './Login.css'

import api, { setAuthToken } from '../../service/api';
import { setUserSession } from '../../service/localStorage';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = { email: '', password: '' }

        if (email == "" || email.length == 0) {
            newErrors.email = 'El correo no puede estar vacio'
            isValid = false;
        }

        if (password == "" || password.length == 0) {
            newErrors.password = 'El password no puede estar vacio'
            isValid = false;
        }

        setErrors(newErrors);
        if (!isValid) {
            Object.values(newErrors)
                .filter(msg => msg !== '')
                .forEach(msg => showErrorToast(msg));
            return;
        }

        setLoading(true);
        try {
            const resp = await api.post('/api/v1/auth/login', { email, password });
            const data = resp.data || {};
            const token = data.token;

            if (token) {
                // Limpiar datos mockeados del localStorage antes de guardar datos reales del backend
                localStorage.removeItem('roles');
                localStorage.removeItem('registeredUsers');
                localStorage.removeItem('nextUserId');
                
                // guardar token y configurar instancia api
                setAuthToken(token);
                // establecer sesión mínima inmediatamente para actualizar UI (Navbar, Checkout)
                try {
                    setUserSession({ email: data.email || email, name: data.name || data.firstName || '' });
                } catch (e) { /* noop */ }
                // intentar obtener perfil completo del usuario desde backend y reemplazar la sesión
                try {
                    const respUser = await api.get('/api/v1/users/by-email', {
                        params: { email: data.email || email }
                    });
                    if (respUser?.data) {
                        // Verificar si el usuario está activo antes de permitir el acceso
                        if (respUser.data.activo === false) {
                            setAuthToken(null);
                            showErrorToast('Tu cuenta está desactivada. Contacta al administrador.');
                            return;
                        }
                        setUserSession(respUser.data);
                    }
                } catch (err) {
                    // si falla, ya tenemos una sesión mínima (no bloqueamos por error de red)
                }
                localStorage.setItem('email', data.email || email);

                showSuccessToast(data.message || 'Inicio de sesión exitoso');
                navigate(redirectTo);
            } else {
                showErrorToast(data.message || 'Credenciales inválidas');
            }
        } catch (err) {
            // Manejar diferentes tipos de error
            if (err.response) {
                // Error del servidor (4xx, 5xx)
                const msg = err.response?.data?.message || 'Credenciales inválidas';
                showErrorToast(msg);
            } else if (err.request) {
                // Error de red
                showErrorToast('Error de conexión. Verifica tu conexión a internet.');
            } else {
                // Otro tipo de error
                showErrorToast('Error inesperado. Inténtalo de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form">
            <h2>Inicio de sesión</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo Electrónico *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <button type="submit" className="btn" disabled={loading}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    {loading ? 'Ingresando...' : 'Iniciar sesión'}
                </button>
            </form>
            <p className="message">¿No tienes una cuenta?
                <Link to={`/register${redirectTo ? `?redirect=${redirectTo}` : ''}`}>
                    Crear Cuenta
                </Link>
            </p>
        </div>
    )
}