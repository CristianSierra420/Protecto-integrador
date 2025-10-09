import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; // Importa el contexto de autenticación
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuthContext();

    const validateEmail = (email) => {
        if (!email) return { isValid: false, message: 'Email is required' };
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) return { isValid: false, message: 'Invalid email format' };
        return { isValid: true };
    };

    const validatePassword = (password) => {
        if (!password) return { isValid: false, message: 'Password is required' };
        if (password.length < 8) return { isValid: false, message: 'Password must be at least 8 characters' };
        return { isValid: true };
    };

    const handleValidateField = (fieldName) => {
        const value = fieldName === 'email' ? email : password;
        const validator = fieldName === 'email' ? validateEmail : validatePassword;
        const errorSetter = fieldName === 'email' ? setEmailError : setPasswordError;

        const validation = validator(value);
        if (!validation.isValid) {
            errorSetter(validation.message || '');
            return false;
        }
        errorSetter('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmailValid = handleValidateField('email');
        const isPasswordValid = handleValidateField('password');

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulación de rol
            const role = email === 'admin@test.com' ? 'admin' : 'worker';
            login(role);

            setIsSuccess(true);
        } catch (error) {
            setPasswordError('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate('/'); // Redirige al dashboard
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    return (
        <div className="login-container">
            <div className="login-card">
                {isSuccess ? (
                    <div className="success-message show" id="successMessage">
                        <div className="success-icon">✓</div>
                        <h3>Login Successful!</h3>
                        <p>Redirecting to your dashboard...</p>
                    </div>
                ) : (
                    <>
                        <div className="login-header">
                            <h2>Sign In</h2>
                            <p>Enter your credentials to access your account</p>
                        </div>
                        
                        <form className="login-form" id="loginForm" noValidate onSubmit={handleSubmit}>
                            <div className={`form-group ${emailError ? 'error' : ''}`}>
                                <div className="input-wrapper">
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        required 
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => handleValidateField('email')}
                                        className={email ? 'has-value' : ''}
                                    />
                                    <label htmlFor="email">Email Address</label>
                                </div>
                                <span className={`error-message ${emailError ? 'show' : ''}`}>{emailError}</span>
                            </div>

                            <div className={`form-group ${passwordError ? 'error' : ''}`}>
                                <div className="input-wrapper password-wrapper">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        id="password" 
                                        name="password" 
                                        required 
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={() => handleValidateField('password')}
                                        className={password ? 'has-value' : ''}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <button 
                                        type="button" 
                                        className="password-toggle" 
                                        aria-label="Toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className={`eye-icon ${showPassword ? 'show-password' : ''}`}></span>
                                    </button>
                                </div>
                                <span className={`error-message ${passwordError ? 'show' : ''}`}>{passwordError}</span>
                            </div>

                            <div className="form-options">
                                <label className="remember-wrapper">
                                    <input 
                                        type="checkbox" 
                                        id="remember" 
                                        name="remember"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                    />
                                    <span className="checkbox-label">
                                        <span className="checkmark"></span>
                                        Remember me
                                    </span>
                                </label>
                                <a href="#" className="forgot-password">Forgot password?</a>
                            </div>

                            <button type="submit" className={`login-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                                <span className="btn-text">Sign In</span>
                                <span className="btn-loader"></span>
                            </button>
                        </form>

                        <div className="signup-link">
                            <p>Don't have an account? <a href="#">Create one</a></p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginForm;