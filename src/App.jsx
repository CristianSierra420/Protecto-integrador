import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { AuthContext, useAuthContext } from './context/AuthContext';

// Pages
import Home from './pages/Dashboard/pages/Home';
import LoginForm from './pages/Login/LoginForm';

const AuthProvider = ({ children }) => {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuthContext();

    if (loading) {
        return <div>Cargando...</div>; // O un spinner
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// App Router
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    {/* Redirección por defecto si la ruta no existe */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
