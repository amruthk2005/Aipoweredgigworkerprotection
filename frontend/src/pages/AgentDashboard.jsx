import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgentDashboard = () => {
    const [policies, setPolicies] = useState([]);
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [triggering, setTriggering] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!user || user.role !== 'agent') {
            navigate('/login');
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [pRes, cRes] = await Promise.all([
                axios.get('http://localhost:5000/api/policies/all'),
                axios.get('http://localhost:5000/api/claims/all')
            ]);
            setPolicies(pRes.data);
            setClaims(cRes.data);
        } catch (err) {
            console.error('Error fetching dashboard data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleTriggerCheck = async () => {
        setTriggering(true);
        try {
            const { data } = await axios.get('http://localhost:5000/api/claims/trigger');
            alert(`Weather Monitor Finished.\n\nRain: ${data.weather.rain}mm\nTemp: ${data.weather.temp}°C\nClaims Triggered: ${data.triggeredClaims.length}`);
            fetchData();
        } catch (err) {
            alert('Failed to trigger scan');
        } finally {
            setTriggering(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    if (loading) return <div className="auth-page"><h2>Loading Secure Intel...</h2></div>;

    const totalPayouts = claims.reduce((acc, curr) => acc + curr.payoutAmount, 0);

    return (
        <div className="agent-dashboard">
            <nav>
                <div className="brand"><i className="fa-solid fa-bolt"></i> SafeRide | Agent Portal</div>
                <div className="nav-links">
                    <span style={{color: 'var(--primary-light)', fontWeight: 700}}>Agent: {user.name}</span>
                    <button onClick={handleLogout} className="btn btn-glass" style={{marginLeft: '1rem'}}>Logout</button>
                </div>
            </nav>

            <main style={{ padding: '2rem 5%' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1>Intelligence Dashboard</h1>
                        <p style={{ color: 'var(--text-dim)' }}>Fleet-wide risk monitoring and payout automation</p>
                    </div>
                    <button 
                        onClick={handleTriggerCheck} 
                        className="btn btn-primary" 
                        disabled={triggering}
                        style={{ background: 'var(--accent)' }}
                    >
                        {triggering ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-satellite-dish"></i>} Run Weather Scan
                    </button>
                </header>

                <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
                    <div className="card">
                        <p style={{ color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Active Policies</p>
                        <h2 style={{ fontSize: '2.5rem' }}>{policies.length}</h2>
                    </div>
                    <div className="card">
                        <p style={{ color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Total Claims</p>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--secondary)' }}>{claims.length}</h2>
                    </div>
                    <div className="card">
                        <p style={{ color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Total Payouts</p>
                        <h2 style={{ fontSize: '2.5rem' }}>₹{totalPayouts}</h2>
                    </div>
                    <div className="card">
                        <p style={{ color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Active Risk Zones</p>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>3</h2>
                    </div>
                </div>

                <section className="claims-table card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ margin: 0 }}>Recent Auto-Payouts</h3>
                        <span className="badge" style={{ background: 'var(--secondary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>LIVE MONITORING</span>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-dim)' }}>
                                <th style={{ padding: '1.2rem 2rem' }}>PARTNER</th>
                                <th style={{ padding: '1.2rem 2rem' }}>ZONE</th>
                                <th style={{ padding: '1.2rem 2rem' }}>TRIGGER</th>
                                <th style={{ padding: '1.2rem 2rem' }}>AMOUNT</th>
                                <th style={{ padding: '1.2rem 2rem' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.map((claim) => (
                                <tr key={claim._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '1.2rem 2rem' }}>{claim.userId?.name || 'Unknown'}</td>
                                    <td style={{ padding: '1.2rem 2rem' }}>{claim.userId?.zone || 'Global'}</td>
                                    <td style={{ padding: '1.2rem 2rem' }}>
                                        <i className={`fa-solid ${claim.triggerType === 'RAIN' ? 'fa-cloud-showers-heavy' : 'fa-sun'}`} 
                                           style={{ marginRight: '8px', color: 'var(--primary-light)' }}></i>
                                        {claim.triggerType}
                                    </td>
                                    <td style={{ padding: '1.2rem 2rem', fontWeight: 700 }}>₹{claim.payoutAmount}</td>
                                    <td style={{ padding: '1.2rem 2rem' }}>
                                        <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>
                                            <i className="fa-solid fa-circle-check"></i> {claim.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {claims.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>No recent parametric triggers detected.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default AgentDashboard;
