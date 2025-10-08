import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../services/auth.service';

import { BoxArrowInRight, BoxArrowRight } from 'react-bootstrap-icons';

const Navbar = ({ onLogout }) => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onLogout();
    navigate('/');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-black'>
      <div className='container-fluid'>
        <Link className='navbar-brand text-primary fw-bold' to='/'>
          InnovaPro
        </Link>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            {user ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">
                    Bienvenido, {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button className='btn btn-outline-light' onClick={handleLogout}>
                    <BoxArrowRight className="me-2"/>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className='nav-link' to='/login'>
                  <BoxArrowInRight className="me-2"/>
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}; 

export default Navbar;