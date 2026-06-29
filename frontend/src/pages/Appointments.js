import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Appointments() {
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const bookAppointment = async () => {
    if (!doctorName || !date || !time || !reason) {
      setMessage('Please fill all fields! ❌');
      return;
    }
    try {
      await axios.post('http://localhost:8000/appointments/book', {
        user_id: 1,
        doctor_name: doctorName,
        appointment_date: date,
        appointment_time: time,
        reason: reason
      });
      setMessage('Appointment booked successfully! ✅');
      setDoctorName('');
      setDate('');
      setTime('');
      setReason('');
    } catch (err) {
      setMessage('Failed to book appointment!');
    }
  };

  const getAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/appointments/list/1');
      setAppointments(res.data);
    } catch (err) {
      setMessage('Failed to fetch appointments!');
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:8000/appointments/cancel/${id}`);
      setMessage('Appointment cancelled! ❌');
      getAppointments();
    } catch (err) {
      setMessage('Failed to cancel appointment!');
    }
  };

  const inputStyle = {width:'100%',padding:'12px',margin:'8px 0',borderRadius:'10px',border:'2px solid #e8f4fd',fontSize:'14px',boxSizing:'border-box',outline:'none'};
  const btnStyle = {width:'100%',padding:'12px',background:'linear-gradient(135deg, #1a5276, #2d7dd2)',color:'white',border:'none',borderRadius:'10px',fontSize:'15px',cursor:'pointer',marginTop:'10px',fontWeight:'bold'};

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg, #f0f4f8, #e8f4fd)'}}>
      <div style={{background:'linear-gradient(135deg, #1a5276, #2d7dd2)',padding:'20px 30px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{color:'white',margin:0}}>🏥 CareBot</h2>
        <div>
          <button style={{background:'rgba(255,255,255,0.2)',color:'white',border:'none',padding:'8px 16px',borderRadius:'20px',cursor:'pointer',marginRight:'10px'}} onClick={() => navigate('/dashboard')}>🏠 Home</button>
          <button style={{background:'rgba(255,255,255,0.2)',color:'white',border:'none',padding:'8px 16px',borderRadius:'20px',cursor:'pointer'}} onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
        </div>
      </div>
      <div style={{display:'flex',gap:'20px',padding:'20px',flexWrap:'wrap',maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{background:'white',padding:'25px',borderRadius:'16px',boxShadow:'0 8px 25px rgba(0,0,0,0.1)',flex:1,minWidth:'300px',borderTop:'4px solid #2ecc71'}}>
          <h3 style={{color:'#1a5276',marginBottom:'20px'}}>📅 Book Appointment</h3>
          {message && <div style={{background: message.includes('❌') ? '#ffe0e0' : '#d5f5e3',color: message.includes('❌') ? '#c0392b' : '#1e8449',padding:'10px',borderRadius:'8px',marginBottom:'15px'}}>{message}</div>}
          <input style={inputStyle} type="text" placeholder="👨‍⚕️ Doctor Name" value={doctorName} onChange={e => setDoctorName(e.target.value)} />
          <input style={inputStyle} type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input style={inputStyle} type="time" value={time} onChange={e => setTime(e.target.value)} />
          <textarea style={{...inputStyle, height:'80px'}} placeholder="📝 Reason for visit" value={reason} onChange={e => setReason(e.target.value)} />
          <button style={btnStyle} onClick={bookAppointment}>Book Appointment</button>
        </div>
        <div style={{background:'white',padding:'25px',borderRadius:'16px',boxShadow:'0 8px 25px rgba(0,0,0,0.1)',flex:1,minWidth:'300px',borderTop:'4px solid #3498db'}}>
          <h3 style={{color:'#1a5276',marginBottom:'20px'}}>📋 My Appointments</h3>
          <button style={btnStyle} onClick={getAppointments}>Load Appointments</button>
          {appointments.length === 0 && <p style={{color:'#888',textAlign:'center',marginTop:'20px'}}>No appointments found.</p>}
          {appointments.map((apt, index) => (
            <div key={index} style={{background:'#f0f4f8',padding:'15px',borderRadius:'12px',marginTop:'15px',borderLeft:'4px solid #2d7dd2'}}>
              <p style={{margin:'5px 0'}}><strong>👨‍⚕️ Doctor:</strong> {apt.doctor_name}</p>
              <p style={{margin:'5px 0'}}><strong>📅 Date:</strong> {apt.appointment_date}</p>
              <p style={{margin:'5px 0'}}><strong>⏰ Time:</strong> {apt.appointment_time}</p>
              <p style={{margin:'5px 0'}}><strong>📝 Reason:</strong> {apt.reason}</p>
              <p style={{margin:'5px 0',color: apt.status === 'cancelled' ? 'red' : '#2ecc71'}}><strong>Status:</strong> {apt.status} {apt.status === 'cancelled' ? '❌' : '✅'}</p>
              {apt.status !== 'cancelled' && (
                <button style={{padding:'8px 16px',background:'#e74c3c',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',marginTop:'8px'}} onClick={() => cancelAppointment(apt.id)}>Cancel Appointment</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Appointments;