import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [simulationActive, setSimulationActive] = useState(false);

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
    
    // Simulate API call to backend parametric engine
    // In actual Phase 2, this would hit http://localhost:5000/api/claims/trigger
    setTimeout(() => {
      alert('🚨 Parametric Event Detected: Rainfall > 50mm in your zone!\n\n✅ Auto-Claim #SR-9921 generated.\n💰 ₹200 Payout initiated to your wallet.');
      setSimulationActive(false);
    }, 2000);
  };

  return (
    <div className="App">
      <nav>
        <div className="brand">
          <i className="fa-solid fa-bolt"></i> SafeRide
        </div>
        <div className="nav-links">
          <a href="#policies">Policies</a>
          <a href="#my-claims">My Claims</a>
          <a href="#support">Support</a>
          <a href="#" className="btn btn-glass">Log In</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Secure Your <span>Weekly Earnings</span></h1>
            <p>Don't lose income to rain, heat, or disruptions. SafeRide protects Zomato, Swiggy, and Zepto partners with automatic payouts.</p>
            <div className="cta-group">
              <a href="#policies" className="btn btn-primary">
                Protect My Week <i className="fa-solid fa-arrow-right"></i>
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
            <p>Income protection against heavy rainfall (50mm+) and floods. Perfect for delivery partners.</p>
            <ul style={{ listStyle: 'none', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
              <li><i className="fa-solid fa-check" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i> ₹200 Daily Payout</li>
              <li><i className="fa-solid fa-check" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i> Smart Parametric Trigger</li>
              <li><i className="fa-solid fa-check" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i> Zero-touch Claims</li>
            </ul>
            <button className="btn btn-primary">Select Weekly Plan</button>
          </div>

          <div className="card" style={{ animationDelay: '0.2s' }}>
            <div className="premium">₹40<span>/wk</span></div>
            <h3>Heat & Air Safety</h3>
            <p>Income security when temp &gt; 42°C or AQI &gt; 300 makes outdoor work hazardous.</p>
            <ul style={{ listStyle: 'none', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
              <li><i className="fa-solid fa-check" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i> Health-first Payout</li>
              <li><i className="fa-solid fa-check" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i> Hyperlocal Risk Factor</li>
              <li><i className="fa-solid fa-check" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i> Real-time Approval</li>
            </ul>
            <button className="btn btn-primary">Select Weekly Plan</button>
          </div>

        </section>

        <section id="how-it-works" style={{ padding: '6rem 5%', background: 'rgba(15, 23, 42, 0.5)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1.5rem' }}><i className="fa-solid fa-user-plus"></i></div>
              <h3>1. Signup</h3>
              <p>Quickly create your profile and link your gig platforms for automated coverage.</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}><i className="fa-solid fa-wand-magic-sparkles"></i></div>
              <h3>2. AI Matching</h3>
              <p>Our AI analyzes your work patterns to suggest the most cost-effective protection.</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1.5rem' }}><i className="fa-solid fa-bolt"></i></div>
              <h3>3. Instant Support</h3>
              <p>Submit claims with a single tap and get approved by our AI in minutes.</p>
            </div>
          </div>
        </section>

        <footer style={{ padding: '4rem 5%', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
          <div className="brand" style={{ marginBottom: '2rem', display: 'inline-block' }}>
            <i className="fa-solid fa-bolt"></i> SafeRide
          </div>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Zero-loss weeks for the heartbeat of our digital economy.</p>
          <div className="nav-links" style={{ marginBottom: '2rem' }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>&copy; 2026 SafeRide Weekly Shield. All rights reserved.</p>
          
          <div style={{ marginTop: '3rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--primary-light)', fontWeight: 700 }}>DEVTrails 2026: Simulation Hub</p>
            <button 
              id="simulate-trigger" 
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

export default App;
