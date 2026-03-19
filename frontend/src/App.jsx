import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import AgentDashboard from './pages/AgentDashboard';
import PartnerDashboard from './pages/PartnerDashboard';

function LandingPage() {
  const [simulationActive, setSimulationActive] = useState(false);
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));
  }, []);

  const handleSimulateTrigger = async () => {
    setSimulationActive(true);
    setTimeout(() => {
      alert(`🚨 Parametric Event Detected in ${user?.zone || 'your zone'}!\n\n✅ Auto-Claim #SR-9921 generated.\n💰 ₹200 Payout initiated to your wallet.`);
      setSimulationActive(false);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.reload();
  };

  return (
    <div className="App">
      <nav>
        <div className="brand">
          <i className="fa-solid fa-bolt"></i> SafeRide
        </div>
        <div className="nav-links">
          {user ? (
            <>
              <span style={{color: 'var(--primary-light)', fontWeight: 600}}>Welcome, {user.name}</span>
              <a href={user.role === 'agent' ? '/agent-dashboard' : '/dashboard'}>My Shield</a>
              <a href="#my-claims">My Claims</a>
              <button onClick={handleLogout} className="btn btn-glass" style={{marginLeft: '1rem'}}>Log Out</button>
            </>
          ) : (
            <>
              <a href="#policies">Policies</a>
              <a href="#support">Support</a>
              <a href="/login" className="btn btn-glass">Log In</a>
            </>
          )}
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Secure Your <span>Weekly Earnings</span></h1>
            <p>Don't lose income to rain, heat, or disruptions. SafeRide protects {user?.zone || 'delivery'} partners with automatic payouts.</p>
            <div className="cta-group">
              <a href="#policies" className="btn btn-primary">
                {user ? 'View My Shield' : 'Protect My Week'} <i className="fa-solid fa-arrow-right"></i>
              </a>
              <a href="#how-it-works" className="btn btn-glass">
                How it Works
              </a>
            </div>
          </div>
        </section>

        <section id="policies" className="dashboard">
          <div className="card">
            <div className="premium">₹25<span>/wk</span></div>
            <h3>Monsoon Shield</h3>
            <p>Income protection against heavy rainfall (50mm+) and floods. Perfect for partners in {user?.city || 'India'}.</p>
            <ul style={{ listStyle: 'none', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
              <li><i className="fa-solid fa-check" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i> ₹200 Daily Payout</li>
              <li><i className="fa-solid fa-check" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i> Smart Parametric Trigger</li>
            </ul>
            <button className="btn btn-primary">{user ? 'Active Coverage' : 'Select Weekly Plan'}</button>
          </div>

          <div className="card" style={{ animationDelay: '0.2s' }}>
            <div className="premium">₹40<span>/wk</span></div>
            <h3>Heat & Air Safety</h3>
            <p>Income security when temp &gt; 42°C or AQI &gt; 300 makes outdoor work hazardous.</p>
            <ul style={{ listStyle: 'none', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
              <li><i className="fa-solid fa-check" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i> Health-first Payout</li>
              <li><i className="fa-solid fa-check" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i> Real-time Approval</li>
            </ul>
            <button className="btn btn-primary">Select Weekly Plan</button>
          </div>
        </section>

        <footer style={{ padding: '4rem 5%', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
          <div className="brand" style={{ marginBottom: '2rem', display: 'inline-block' }}>
            <i className="fa-solid fa-bolt"></i> SafeRide
          </div>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Zero-loss weeks for the heartbeat of our digital economy.</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>&copy; 2026 SafeRide Weekly Shield. All rights reserved.</p>
          
          <div style={{ marginTop: '3rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--primary-light)', fontWeight: 700 }}>DEVTrails 2026: Simulation Hub</p>
            <button 
              className="btn btn-glass" 
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              onClick={handleSimulateTrigger}
              disabled={simulationActive}
            >
              {simulationActive ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Monitoring Weather...</>
              ) : (
                <><i className="fa-solid fa-cloud-showers-heavy"></i> Simulate Parametric Trigger</>
              )}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/dashboard" element={<PartnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
