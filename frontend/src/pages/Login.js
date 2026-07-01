import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8000/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      const role = res.data.role;
      localStorage.setItem('role', role);
      if (role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password!');
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',background:'linear-gradient(135deg, #1a5276, #2d7dd2)'}}>
      <div style={{background:'white',padding:'40px',borderRadius:'20px',boxShadow:'0 20px 60px rgba(0,0,0,0.3)',width:'380px',textAlign:'center'}}>
        <div style={{fontSize:'50px',marginBottom:'10px'}}>🏥</div>
        <h1 style={{color:'#2d7dd2',marginBottom:'5px',fontSize:'28px'}}>CareBot</h1>
        <p style={{color:'#888',marginBottom:'30px',fontSize:'14px'}}>Your AI Health Assistant</p>
        {error && <div style={{background:'#ffe0e0',color:'#c0392b',padding:'10px',borderRadius:'8px',marginBottom:'15px',fontSize:'14px'}}>{error}</div>}
        <input style={{width:'100%',padding:'14px',margin:'8px 0',borderRadius:'10px',border:'2px solid #e8f4fd',fontSize:'14px',boxSizing:'border-box',outline:'none'}} type="email" placeholder="📧 Email address" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={{width:'100%',padding:'14px',margin:'8px 0',borderRadius:'10px',border:'2px solid #e8f4fd',fontSize:'14px',boxSizing:'border-box',outline:'none'}} type="password" placeholder="🔒 Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button style={{width:'100%',padding:'14px',background:'linear-gradient(135deg, #1a5276, #2d7dd2)',color:'white',border:'none',borderRadius:'10px',fontSize:'16px',cursor:'pointer',marginTop:'15px',fontWeight:'bold'}} onClick={handleLogin}>{loading ? 'Logging in...' : 'Login →'}</button>
        <p style={{color:'#888',marginTop:'20px',fontSize:'14px'}}>Don't have an account? <span style={{color:'#2d7dd2',cursor:'pointer',fontWeight:'bold'}} onClick={() => navigate('/register')}>Register</span></p>
      </div>
    </div>
  );
}

export default Login;