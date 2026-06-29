import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am CareBot 🏥 Your AI Health Assistant. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = { sender: 'user', text: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/ai/chat', { message });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, something went wrong!' }]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const formatText = (text) => {
    const html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\* /gm, '• ')
      .replace(/\n/g, '<br/>');
    return { __html: html };
  };
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',background:'#e5ddd5'}}>
      <div style={{background:'linear-gradient(135deg, #1a5276, #2d7dd2)',padding:'15px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 2px 10px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>🏥</div>
          <div>
            <h3 style={{color:'white',margin:0,fontSize:'16px'}}>CareBot AI</h3>
            <p style={{color:'rgba(255,255,255,0.7)',margin:0,fontSize:'12px'}}>Always here to help</p>
          </div>
        </div>
        <div>
          <button style={{background:'rgba(255,255,255,0.2)',color:'white',border:'none',padding:'6px 14px',borderRadius:'15px',cursor:'pointer',marginRight:'8px',fontSize:'14px'}} onClick={() => navigate('/dashboard')}>🏠 Home</button>
          <button style={{background:'rgba(255,255,255,0.2)',color:'white',border:'none',padding:'6px 14px',borderRadius:'15px',cursor:'pointer',fontSize:'14px'}} onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
        </div>
      </div>
      <div style={{flex:1,padding:'20px',overflowY:'auto',display:'flex',flexDirection:'column',gap:'12px'}}>
        {messages.map((msg, index) => (
          <div key={index} style={{display:'flex',justifyContent:msg.sender === 'user' ? 'flex-end' : 'flex-start'}}>
            <div style={{maxWidth:'70%',padding:'12px 16px',borderRadius:msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',background:msg.sender === 'user' ? 'linear-gradient(135deg, #1a5276, #2d7dd2)' : 'white',color:msg.sender === 'user' ? 'white' : '#333',boxShadow:'0 2px 8px rgba(0,0,0,0.1)',fontSize:'18px',lineHeight:'1.6'}} dangerouslySetInnerHTML={formatText(msg.text)} />
          </div>
        ))}
        {loading && (
          <div style={{display:'flex',justifyContent:'flex-start'}}>
            <div style={{background:'white',padding:'10px 15px',borderRadius:'18px 18px 18px 4px',boxShadow:'0 2px 8px rgba(0,0,0,0.1)',fontSize:'18px',color:'#666'}}>CareBot is typing... ✍️</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{padding:'15px',background:'white',display:'flex',gap:'10px',alignItems:'center',boxShadow:'0 -2px 10px rgba(0,0,0,0.1)'}}>
        <input style={{flex:1,padding:'12px 18px',borderRadius:'25px',border:'2px solid #e8f4fd',fontSize:'16px',outline:'none',background:'#f8f9fa'}} type="text" placeholder="Ask me about your health..." value={message} onChange={e => setMessage(e.target.value)} onKeyPress={handleKeyPress} />
        <button style={{width:'45px',height:'45px',borderRadius:'50%',background:'linear-gradient(135deg, #1a5276, #2d7dd2)',color:'white',border:'none',cursor:'pointer',fontSize:'20px',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

export default Chat;