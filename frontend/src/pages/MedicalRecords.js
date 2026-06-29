import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MedicalRecords() {
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  const addRecord = async () => {
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

  const getRecords = async () => {
    try {
      const res = await axios.get('http://localhost:8000/appointments/medical-records/1');
      setRecords(res.data);
    } catch (err) {
      setMessage('Failed to fetch records!');
    }
  };

  return (
    <div>
      <div style={{background:'#2d7dd2',padding:'15px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{color:'white',margin:0}}>🏥 CareBot - Medical Records</h2>
        <button style={{background:'white',color:'#2d7dd2',border:'none',padding:'8px 16px',borderRadius:'8px',cursor:'pointer'}} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
      <div style={{padding:'20px',maxWidth:'800px',margin:'0 auto'}}>
        <h3>📋 Add Medical Record</h3>
        {message && <p style={{color:'green'}}>{message}</p>}
        <input style={{width:'100%',padding:'10px',margin:'8px 0',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}} type="text" placeholder="Diagnosis" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} />
        <input style={{width:'100%',padding:'10px',margin:'8px 0',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}} type="text" placeholder="Prescription" value={prescription} onChange={e => setPrescription(e.target.value)} />
        <input style={{width:'100%',padding:'10px',margin:'8px 0',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}} type="text" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
        <button style={{width:'100%',padding:'12px',background:'#2d7dd2',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',marginTop:'10px'}} onClick={addRecord}>Add Record</button>
        <hr/>
        <h3>📋 My Records</h3>
        <button style={{width:'100%',padding:'12px',background:'#2d7dd2',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}} onClick={getRecords}>Load Records</button>
        {records.map((record, index) => (
          <div key={index} style={{background:'#f0f4f8',padding:'15px',borderRadius:'8px',marginTop:'10px'}}>
            <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
            <p><strong>Prescription:</strong> {record.prescription}</p>
            <p><strong>Notes:</strong> {record.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicalRecords;