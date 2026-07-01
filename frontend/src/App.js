import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import Dashboard from './pages/Dashboard';
import MedicalRecords from './pages/MedicalRecords';
import Medications from './pages/Medications';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorAppointments from './pages/DoctorAppointments';
import DoctorRecords from './pages/DoctorRecords';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/records" element={<MedicalRecords />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
<Route path="/doctor-records" element={<DoctorRecords />} />
      </Routes>
    </Router>
  );
}

export default App;