import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Medications() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState('');

  const add = () => {
    if (!name) return;
    setList([...list, {name, dosage, frequency}]);
    setMsg('Medication added! ✅');
    setName('');
    setDosage('');
    setFrequency('');
  };

  return (
    <div style={{background:'#f0f4f8',minHeight:'100vh'}}>
      <div style={{background:'#2d7dd2',padding:'15px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{color:'white',margin:0}}>🏥 CareBot - Medications</h2>
        <button style={{background:'white',color:'#2d7dd2',border:'none',padding:'8px 16px',borderRadius:'8px',cursor:'pointer'}} onClick={() => navigate('/dashboard')}>Back</button>
      </div>
      <div style={{padding:'20px',maxWidth:'600px',margin:'0 auto'}}>
        <div style={{background:'white',padding:'20px',borderRadius:'12px',marginBottom:'20px'}}>
          <h3 style={{color:'#2d7dd2'}}>💊 Add Medication</h3>
          {msg && <p style={{color:'green'}}>{msg}</p>}
          <input style={{width:'100%',padding:'10px',margin:'8px 0',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}} placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input style={{width:'100%',padding:'10px',margin:'8px 0',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}} placeholder="Dosage" value={dosage} onChange={e => setDosage(e.target.value)} />
          <input style={{width:'100%',padding:'10px',margin:'8px 0',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}} placeholder="Frequency" value={frequency} onChange={e => setFrequency(e.target.value)} />
          <button style={{width:'100%',padding:'12px',background:'#2d7dd2',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',marginTop:'10px'}} onClick={add}>Add Medication</button>
        </div>
        <div style={{background:'white',padding:'20px',borderRadius:'12px'}}>
          <h3 style={{color:'#2d7dd2'}}>💊 My Medications</h3>
          {list.length === 0 && <p style={{color:'#666',textAlign:'center'}}>No medications added yet.</p>}
          {list.map((med, i) => (
            <div key={i} style={{background:'#f0f4f8',padding:'15px',borderRadius:'8px',marginTop:'10px'}}>
              <p><strong>Name:</strong> {med.name}</p>
              <p><strong>Dosage:</strong> {med.dosage}</p>
              <p><strong>Frequency:</strong> {med.frequency}</p>
              <p style={{color:'green'}}><strong>Status:</strong> Active ✅</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Medications;