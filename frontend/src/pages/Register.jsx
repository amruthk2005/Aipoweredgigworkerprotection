import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [zone, setZone] = useState('');
    const [role, setRole] = useState('partner');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/register', { 
                name, email, password, phone, city, zone, role 
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Onboarding failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card fade-in">
                <div className="brand" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <i className="fa-solid fa-bolt"></i> SafeRide
                </div>
                <h2>Get Started</h2>
                <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Safe-guard your income in under 2 minutes.</p>
                
                <div className="role-toggle">
                    <button 
                        type="button" 
                        className={`toggle-btn ${role === 'partner' ? 'active' : ''}`}
                        onClick={() => setRole('partner')}
                    >
                        <i className="fa-solid fa-bicycle"></i> Delivery Partner
                    </button>
                    <button 
                        type="button" 
                        className={`toggle-btn ${role === 'agent' ? 'active' : ''}`}
                        onClick={() => setRole('agent')}
                    >
                        <i className="fa-solid fa-user-shield"></i> Insurance Agent
                    </button>
                </div>

                {error && <div className="error-box">{error}</div>}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="name@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" placeholder="+91 9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" placeholder="Bangalore" value={city} onChange={(e) => setCity(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Zone</label>
                            <input type="text" placeholder="HSR Layout" value={zone} onChange={(e) => setZone(e.target.value)} required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Join SafeRide"}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <Link to="/login" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Already protected? Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
