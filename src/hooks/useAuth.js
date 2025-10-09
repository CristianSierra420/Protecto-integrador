import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para gestionar la autenticación simulada con localStorage.
 */
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null); // No hay usuario logueado
            }
        } catch (error) {
            console.error("Error al acceder a localStorage:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback((role = 'worker') => {
        const userData = { role };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        setUser(null);
    }, []);

    return { user, loading, login, logout };
};
