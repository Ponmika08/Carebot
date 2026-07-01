import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/appointments/list/1');
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/appointments/update-status/${id}`, { status });
      loadAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{minHeight:'100vh',background:'#f0f4f8'}}>
      <div style={{background:'linear-gradient(135deg, #1a5276, #2d7dd2)',padding:'20px 30px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{color:'white',margin:0}}>🩺 Patient Appointments</h2>
        <button style={{background:'white',color:'#2d7dd2',border:'none',padding:'8px 16px',borderRadius:'8px',cursor:'pointer'}} onClick={() => navigate('/doctor-dashboard')}>Back</button>
      </div>
      <div style={{padding:'20px',maxWidth:'800px',margin:'0 auto'}}>
        {appointments.map((apt, i) => (
          <div key={i} style={{background:'white',padding:'20px',borderRadius:'12px',marginBottom:'15px',boxShadow:'0 4px 15px rgba(0,0,0,0.1)'}}>
            <p><strong>Patient:</strong> {apt.patient_name}</p>
            <p><strong>Doctor:</strong> {apt.doctor_name}</p>
            <p><strong>Date:</strong> {apt.appointment_date}</p>
            <p><strong>Time:</strong> {apt.appointment_time}</p>
            <p><strong>Reason:</strong> {apt.reason}</p>
            <p><strong>Status:</strong> {apt.status}</p>
            {apt.status === 'pending' && (
              <button style={{padding:'8px 16px',background:'#2ecc71',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',marginRight:'10px'}} onClick={() => updateStatus(apt.id, 'confirmed')}>Confirm</button>
            )}
            {apt.status === 'confirmed' && (
              <button style={{padding:'8px 16px',background:'#3498db',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}} onClick={() => updateStatus(apt.id, 'completed')}>Mark Completed</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAppointments;