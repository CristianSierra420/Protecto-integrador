import React from 'react';
import './dashboard.css';
import ProfileCard from '../../components/worker/ProfileCard';
import RecordForm from '../../components/common/RecordForm';
import RecordsTable from '../../components/common/RecordsTable';
import NotificationToast from '../../components/worker/NotificationToast';
import SummaryCard from '../../components/worker/SummaryCard';
import ActivitiesPanel from '../../components/worker/ActivitiesPanel';
import LogoutButton from '../../components/worker/LogoutButton';
import { addRecord } from '../../services/record.service';
import { toast } from 'react-toastify';

const WorkerDashboard = () => {
  const handleQuickRecord = async (type) => {
    // dummy cedula read from localStorage or default
    const stored = localStorage.getItem('user');
    let cedula = null;
    try{ cedula = stored ? JSON.parse(stored).cedula : null; }catch(e){ cedula = null }
    if(!cedula){ toast.error('No se encontró cédula del usuario.'); return; }
    try{
      const res = await addRecord(cedula, type);
      toast.success('Registro rápido guardado');
    }catch(e){ toast.error('Error al registrar'); }
  }
  return (
  <div className="dashboard-container page-template">
      <div className="dashboard-hero">
        <div>
          <div className="title">Bienvenido al panel</div>
          <div className="subtitle">Administra tu asistencia y registros</div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{textAlign:'right', marginRight:8}}>
            <div style={{fontSize:12, color:'rgba(255,255,255,0.8)'}}>Usuario</div>
            <div style={{fontWeight:700}}>{(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Invitado')}</div>
          </div>
          <div style={{width:44, height:44, borderRadius:10, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', color:'#0f1724'}}>Logo</div>
          <LogoutButton />
        </div>
      </div>

      <div className="dashboard-grid">
        <div>
          <div className="card-soft">
            <ProfileCard />
            <SummaryCard />
          </div>
          <div style={{marginTop:12}}>
            <ActivitiesPanel onQuickRecord={handleQuickRecord} />
          </div>
        </div>

        <div>
          <div className="card-soft">
            <RecordForm />
          </div>
          <div className="card-soft records-table mt-4">
            <RecordsTable />
          </div>
        </div>
      </div>

      <NotificationToast />
    </div>
  );
};

export default WorkerDashboard;
