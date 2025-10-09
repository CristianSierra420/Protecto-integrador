import React from 'react';
import '../../pages/Dashboard/dashboard-components.css';
import '../..//pages/Dashboard/dashboard.css';

const ProfileCard = () => {
  // Dummy data - replace with actual user data from context or props
  const userData = {
    name: 'Juan Pérez',
    cedula: '123456789',
    currentDate: new Date().toLocaleDateString(),
  };

  return (
    <div className="profile-card panel">
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div style={{width:64, height:64, borderRadius:12, background:'#0ea5a2', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:20}}>
          {userData.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
        </div>
        <div>
          <h2 style={{margin:0}}>{userData.name}</h2>
          <div style={{fontSize:12, color:'#64748b'}}>Cédula: {userData.cedula}</div>
          <div style={{fontSize:12, color:'#94a3b8'}}>Fecha: {userData.currentDate}</div>
        </div>
      </div>
      <div style={{marginTop:12}}>
        <button className="btn btn-small btn-secondary">Editar perfil</button>
      </div>
    </div>
  );
};

export default ProfileCard;
