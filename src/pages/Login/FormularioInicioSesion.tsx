import React, { useState, useEffect } from 'react';
import './LoginForm.css';

const FormularioInicioSesion = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [recordar, setRecordar] = useState(false);
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorContrasena, setErrorContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [exito, setExito] = useState(false);

    type Validacion = { esValido: boolean; mensaje: string };

    const validarCorreo = (correo: string): Validacion => {
        if (!correo) return { esValido: false, mensaje: 'El correo es requerido' };
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(correo)) return { esValido: false, mensaje: 'Formato de correo inválido' };
        return { esValido: true, mensaje: '' };
    };

    const validarContrasena = (contrasena: string): Validacion => {
        if (!contrasena) return { esValido: false, mensaje: 'La contraseña es requerida' };
        if (contrasena.length < 8) return { esValido: false, mensaje: 'La contraseña debe tener al menos 8 caracteres' };
        return { esValido: true, mensaje: '' };
    };

    const handleValidarCampo = (nombreCampo: 'correo' | 'contrasena'): boolean => {
        const valor: string = nombreCampo === 'correo' ? correo : contrasena;
        const validador: (v: string) => Validacion = nombreCampo === 'correo' ? validarCorreo : validarContrasena;
        const setError: React.Dispatch<React.SetStateAction<string>> = nombreCampo === 'correo' ? setErrorCorreo : setErrorContrasena;

        const validacion = validador(valor);
        if (!validacion.esValido) {
            setError(validacion.mensaje);
            return false;
        }
        setError('');
        return true;
    };

    const handleEnviar = async (e: React.FormEvent) => {
        e.preventDefault();

        const esCorreoValido = handleValidarCampo('correo');
        const esContrasenaValida = handleValidarCampo('contrasena');

        if (!esCorreoValido || !esContrasenaValida) {
            return;
        }

        setCargando(true);

        // Simular llamada a la API
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Asumiendo que el inicio de sesión es exitoso
            setExito(true);
        } catch (error) {
            // Manejar error de inicio de sesión
            setErrorContrasena('Credenciales inválidas');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (exito) {
            // Ocultar el formulario y mostrar el mensaje de éxito
            const timer = setTimeout(() => {
                // Puedes agregar una redirección aquí, ej: usando react-router-dom
                console.log("Redirigiendo al panel de control...");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [exito]);

    return (
        <div className="login-container">
            <div className="login-card">
                {exito ? (
                    <div className="success-message show" id="successMessage">
                        <div className="success-icon">✓</div>
                        <h3>¡Inicio de sesión exitoso!</h3>
                        <p>Redirigiendo a tu panel de control...</p>
                    </div>
                ) : (
                    <>
                        <div className="login-header">
                            <h2>Iniciar Sesión</h2>
                            <p>Ingresa tus credenciales para acceder a tu cuenta</p>
                        </div>
                        
                        <form className="login-form" id="loginForm" noValidate onSubmit={handleEnviar}>
                            <div className={`form-group ${errorCorreo ? 'error' : ''}`}>
                                <div className="input-wrapper">
                                    <input 
                                        type="email" 
                                        id="correo" 
                                        name="correo" 
                                        required 
                                        autoComplete="email"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        onBlur={() => handleValidarCampo('correo')}
                                        className={correo ? 'has-value' : ''}
                                    />
                                    <label htmlFor="correo">Correo Electrónico</label>
                                </div>
                                <span className={`error-message ${errorCorreo ? 'show' : ''}`}>{errorCorreo}</span>
                            </div>

                            <div className={`form-group ${errorContrasena ? 'error' : ''}`}>
                                <div className="input-wrapper password-wrapper">
                                    <input 
                                        type={mostrarContrasena ? "text" : "password"} 
                                        id="contrasena" 
                                        name="contrasena" 
                                        required 
                                        autoComplete="current-password"
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        onBlur={() => handleValidarCampo('contrasena')}
                                        className={contrasena ? 'has-value' : ''}
                                    />
                                    <label htmlFor="contrasena">Contraseña</label>
                                    <button 
                                        type="button" 
                                        className="password-toggle" 
                                        aria-label="Mostrar/Ocultar contraseña"
                                        onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                    >
                                        <span className={`eye-icon ${mostrarContrasena ? 'show-password' : ''}`}></span>
                                    </button>
                                </div>
                                <span className={`error-message ${errorContrasena ? 'show' : ''}`}>{errorContrasena}</span>
                            </div>

                            <div className="form-options">
                                <label className="remember-wrapper">
                                    <input 
                                        type="checkbox" 
                                        id="recordar" 
                                        name="recordar"
                                        checked={recordar}
                                        onChange={(e) => setRecordar(e.target.checked)}
                                    />
                                    <span className="checkbox-label">
                                        <span className="checkmark"></span>
                                        Recordarme
                                    </span>
                                </label>
                                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                            </div>

                            <button type="submit" className={`login-btn ${cargando ? 'loading' : ''}`} disabled={cargando}>
                                <span className="btn-text">Iniciar Sesión</span>
                                <span className="btn-loader"></span>
                            </button>
                        </form>

                        <div className="signup-link">
                            <p>¿No tienes una cuenta? <a href="#">Crea una</a></p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FormularioInicioSesion;
