import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    { icon:'🤖', title:'AI Chat', desc:'Chat with AI', path:'/chat', color:'#3498db' },
    { icon:'📅', title:'Appointments', desc:'Book appointments', path:'/appointments', color:'#2ecc71' },
    { icon:'📋', title:'Medical Records', desc:'View history', path:'/records', color:'#e74c3c' },
    { icon:'💊', title:'Medications', desc:'Track medications', path:'/medications', color:'#9b59b6' }
  ];

  const headerStyle = {background:'linear-gradient(135deg, #1a5276, #2d7dd2)',padding:'20px 30px',display:'flex',justifyContent:'space-between',alignItems:'center'};
  const btnStyle = {background:'rgba(255,255,255,0.2)',color:'white',border:'1px solid white',padding:'8px 20px',borderRadius:'20px',cursor:'pointer'};
  const gridStyle = {display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:'25px',maxWidth:'900px',margin:'0 auto'};

  return (
    <div style={{minHeight:'100vh',background:'#f0f4f8'}}>
      <div style={headerStyle}>
        <h2 style={{color:'white',margin:0}}>🏥 CareBot</h2>
        <button style={btnStyle} onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
      </div>
      <div style={{padding:'40px 20px',textAlign:'center'}}>
        <h2 style={{color:'#1a5276',fontSize:'32px'}}>Welcome to CareBot! 👋</h2>
        <p style={{color:'#666',marginBottom:'40px'}}>Your personal AI health assistant</p>
        <div style={gridStyle}>
          {cards.map((card, i) => (
            <div key={i} onClick={() => navigate(card.path)} style={{background:'white',padding:'30px 20px',borderRadius:'16px',boxShadow:'0 8px 25px rgba(0,0,0,0.1)',cursor:'pointer',borderTop:`4px solid ${card.color}`}}>
              <div style={{fontSize:'45px',marginBottom:'15px'}}>{card.icon}</div>
              <h3 style={{color:card.color,marginBottom:'10px'}}>{card.title}</h3>
              <p style={{color:'#888',fontSize:'14px'}}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;