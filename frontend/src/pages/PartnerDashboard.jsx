import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartnerDashboard = () => {
    const [policies, setPolicies] = useState([]);
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'partner') {
            navigate('/login');
            return;
        }
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const [pRes, cRes] = await Promise.all([
                axios.get(`http://localhost:5000/api/policies/user/${user._id}`),
                axios.get(`http://localhost:5000/api/claims/user/${user._id}`)
            ]);
            setPolicies(pRes.data);
            setClaims(cRes.data);
        } catch (err) {
            console.error('Failed to load dashboard data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    if (loading) return <div className="auth-page"><h2>Syncing with AI Risk Engine...</h2></div>;

    const activePolicy = policies.find(p => p.isActive);

    return (
        <div className="partner-dashboard">
            <nav>
                <div className="brand"><i className="fa-solid fa-bolt"></i> SafeRide | Partner</div>
                <div className="nav-links">
                    <span style={{color: 'var(--primary-light)', fontWeight: 700}}>Partner: {user.name}</span>
                    <button onClick={handleLogout} className="btn btn-glass" style={{marginLeft: '1rem'}}>Logout</button>
                </div>
            </nav>

            <main style={{ padding: '2rem 5%' }}>
                <header style={{ marginBottom: '3rem' }}>
                    <h1>Partner Dashboard</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Zone: 📍 {user.zone}, {user.city}</p>
                </header>

                <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
                    {/* Policy Card */}
                    <div className="card" style={{ borderLeft: '4px solid var(--primary-light)' }}>
                        <h3>{activePolicy ? 'Active Shield' : 'No Active Shield'}</h3>
                        {activePolicy ? (
                            <>
                                <p style={{ margin: '1rem 0', fontSize: '1.2rem', color: 'var(--secondary)' }}>
                                    <i className="fa-solid fa-cloud-rain"></i> Monsoon Protection Active
                                </p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Premium: ₹{activePolicy.weeklyPremium}/wk</p>
                            </>
                        ) : (
                            <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Get Protected</button>
                        )}
                    </div>

                    {/* Risk Insight */}
                    <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
                        <h3>AI Risk insight</h3>
                        <p style={{ margin: '1rem 0', color: 'var(--text-dim)' }}>Predictive model shows <strong>75% Moderate Risk</strong> in {user.zone} for tomorrow.</p>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                            <div style={{ width: '75%', height: '100%', background: 'var(--accent)', borderRadius: '4px' }}></div>
                        </div>
                    </div>

                    {/* Earnings Protected */}
                    <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
                        <h3>Earnings saved</h3>
                        <h2 style={{ fontSize: '2.5rem', marginTop: '1rem' }}>₹{claims.reduce((acc, c) => acc + c.payoutAmount, 0)}</h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Total payouts received since joining.</p>
                    </div>
                </div>

                <section className="card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '2rem' }}>Personal Claim History</h3>
                    {claims.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ color: 'var(--text-dim)', borderBottom: '1px solid var(--glass-border)' }}>
                                    <th style={{ padding: '1rem' }}>DATE</th>
                                    <th style={{ padding: '1rem' }}>TRIGGER</th>
                                    <th style={{ padding: '1rem' }}>PAYOUT</th>
                                    <th style={{ padding: '1rem' }}>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {claims.map(claim => (
                                    <tr key={claim._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '1rem' }}>{new Date(claim.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem' }}>{claim.triggerType}</td>
                                        <td style={{ padding: '1rem', fontWeight: 800 }}>₹{claim.payoutAmount}</td>
                                        <td style={{ padding: '1rem', color: 'var(--secondary)' }}>
                                            <i className="fa-solid fa-circle-check"></i> {claim.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>
                            <i className="fa-solid fa-umbrella" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                            <p>No claims triggered yet. You're fully covered!</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default PartnerDashboard;
