import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DoctorRecords() {
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  const loadRecords = async () => {
    try {
      const res = await axios.get('http://localhost:8000/appointments/medical-records/1');
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addRecord = async () => {
    if (!diagnosis) {
      setMessage('Please enter diagnosis! ❌');
      return;
    }
    try {
      await axios.post('http://localhost:8000/appointments/medical-record', {
        user_id: 1,
        diagnosis: diagnosis,
        prescription: prescription,
        notes: notes
      });
      setMessage('Medical record added! ✅');
      setDiagnosis('');
      setPrescription('');
      setNotes('');
    } catch (err) {
      setMessage('Failed to add record!');
    }
  };

  return (
    <div style={{minHeight:'100vh',background:'#f0f4f8'}}>
      <div style={{background:'linear-gradient(135deg, #1a5276, #2d7dd2)',padding:'20px 30px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{color:'white',margin:0}}>🩺 Add Patient Record</h2>
        <button style={{background:'white',color:'#2d7dd2',border:'none',padding:'8px 16px',borderRadius:'8px',cursor:'pointer'}} onClick={() => navigate('/doctor-dashboard')}>Back</button>
      </div>
      <div style={{padding:'20px',maxWidth:'600px',margin:'0 auto'}}>
        <div style={{background:'white',padding:'25px',borderRadius:'16px',boxShadow:'0 4px 15px rgba(0,0,0,0.1)'}}>
          {message && <p style={{color: message.includes('❌') ? 'red' : 'green'}}>{message}</p>}
          <input style={{width:'100%',padding:'12px',margin:'8px 0',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}} placeholder="Diagnosis" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} />
          <input style={{width:'100%',padding:'12px',margin:'8px 0',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}} placeholder="Prescription" value={prescription} onChange={e => setPrescription(e.target.value)} />
          <input style={{width:'100%',padding:'12px',margin:'8px 0',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}} placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
          <button style={{width:'100%',padding:'12px',background:'#2d7dd2',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',marginTop:'10px'}} onClick={addRecord}>Add Record</button>
        </div>
        <div style={{background:'white',padding:'25px',borderRadius:'16px',boxShadow:'0 4px 15px rgba(0,0,0,0.1)',marginTop:'20px'}}>
          <h3 style={{color:'#1a5276'}}>📋 All Patient Records</h3>
          <button style={{width:'100%',padding:'12px',background:'#2d7dd2',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}} onClick={loadRecords}>Load Records</button>
          {records.map((r, i) => (
            <div key={i} style={{background:'#f0f4f8',padding:'15px',borderRadius:'8px',marginTop:'10px'}}>
              <p><strong>Diagnosis:</strong> {r.diagnosis}</p>
              <p><strong>Prescription:</strong> {r.prescription}</p>
              <p><strong>Notes:</strong> {r.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorRecords;