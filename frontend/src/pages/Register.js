import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('patient');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8000/auth/register', {
        full_name: fullName,
        email: email,
        password: password,
        role: role
      
      });
      alert('Registered! Please login.');
      navigate('/');
    } catch (err) {
      setError('Registration failed. Email may already exist!');
    }
  };

  const bg = {display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',background:'linear-gradient(135deg, #1a5276, #2d7dd2)'};
  const card = {background:'white',padding:'40px',borderRadius:'20px',boxShadow:'0 20px 60px rgba(0,0,0,0.3)',width:'380px',textAlign:'center'};
  const input = {width:'100%',padding:'14px',margin:'8px 0',borderRadius:'10px',border:'2px solid #e8f4fd',fontSize:'14px',boxSizing:'border-box'};
  const btn = {width:'100%',padding:'14px',background:'linear-gradient(135deg, #1a5276, #2d7dd2)',color:'white',border:'none',borderRadius:'10px',fontSize:'16px',cursor:'pointer',marginTop:'15px',fontWeight:'bold'};

  return (
    <div style={bg}>
      <div style={card}>
        <div style={{fontSize:'50px'}}>🏥</div>
        <h1 style={{color:'#2d7dd2'}}>CareBot</h1>
        <p style={{color:'#888'}}>Create your account</p>
        {error && <p style={{color:'red'}}>{error}</p>}
        <input style={input} type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
        <input style={input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <select style={input} value={role} onChange={e => setRole(e.target.value)}>
  <option value="patient">👤 Patient</option>
  <option value="doctor">👨‍⚕️ Doctor</option>
</select>
        <button style={btn} onClick={handleRegister}>Create Account</button>
        <p style={{color:'#888',marginTop:'20px'}}>Already have an account? <span style={{color:'#2d7dd2',cursor:'pointer'}} onClick={() => navigate('/')}>Login</span></p>
      </div>
    </div>
  );
}

export default Register;