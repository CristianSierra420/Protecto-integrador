import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; // Ajusta la ruta si es necesario
import { BoxArrowRight } from 'react-bootstrap-icons';
import '../../pages/Dashboard/dashboard-components.css';

const LogoutButton = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="btn btn-small logout-btn">
            <BoxArrowRight />
            <span>Cerrar Sesión</span>
        </button>
    );
};

export default LogoutButton;
