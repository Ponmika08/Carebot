import React from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{minHeight:'100vh',background:'#f0f4f8'}}>
      <div style={{background:'linear-gradient(135deg, #1a5276, #2d7dd2)',padding:'20px 30px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{color:'white',margin:0}}>🩺 CareBot - Doctor Portal</h2>
        <button style={{background:'white',color:'#2d7dd2',border:'none',padding:'8px 16px',borderRadius:'8px',cursor:'pointer'}} onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); navigate('/'); }}>Logout</button>
      </div>
      <div style={{padding:'40px 20px',textAlign:'center'}}>
        <h2 style={{color:'#1a5276'}}>Welcome, Doctor! 👨‍⚕️</h2>
        <p style={{color:'#666',marginBottom:'40px'}}>Manage your patients and appointments</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:'25px',maxWidth:'700px',margin:'0 auto'}}>
          <div style={{background:'white',padding:'30px 20px',borderRadius:'16px',boxShadow:'0 8px 25px rgba(0,0,0,0.1)',cursor:'pointer',borderTop:'4px solid #2ecc71'}} onClick={() => navigate('/doctor-appointments')}>
            <div style={{fontSize:'45px'}}>📅</div>
            <h3 style={{color:'#2ecc71'}}>Appointments</h3>
            <p style={{color:'#888',fontSize:'14px'}}>View and manage patient appointments</p>
          </div>
          <div style={{background:'white',padding:'30px 20px',borderRadius:'16px',boxShadow:'0 8px 25px rgba(0,0,0,0.1)',cursor:'pointer',borderTop:'4px solid #e74c3c'}} onClick={() => navigate('/doctor-records')}>
            <div style={{fontSize:'45px'}}>📋</div>
            <h3 style={{color:'#e74c3c'}}>Patient Records</h3>
            <p style={{color:'#888',fontSize:'14px'}}>Add diagnoses and prescriptions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;