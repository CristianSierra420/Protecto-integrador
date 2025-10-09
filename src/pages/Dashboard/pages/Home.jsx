import React from 'react';
import WorkerDashboard from '../WorkerDashboard';
import AdminDashboard from '../AdminDashboard';
import { useAuthContext } from '../../../context/AuthContext'; 
import { addRecord } from '../../../services/record.service';
import { getUser } from '../../../services/auth.service'; 

const Home = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      {user.role === 'admin' ? <AdminDashboard /> : <WorkerDashboard />}
    </div>
  );
};

export default Home;
