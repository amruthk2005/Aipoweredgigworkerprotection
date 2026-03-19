import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('partner');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
            
            // Verify if the role matches our toggle selection (Safety Check)
            if (data.role !== role) {
                setError(`Access Denied: You are not registered as an ${role.toUpperCase()}`);
                return;
            }

            localStorage.setItem('userInfo', JSON.stringify(data));
            
            // Redirect based on role
            if (data.role === 'agent') {
                navigate('/agent-dashboard'); 
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Access Denied: Invalid Credentials');
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
                <h2>Welcome Back</h2>
                <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Secure access for Partners and Agents</p>
                
                <div className="role-toggle">
                    <button 
                        type="button" 
                        className={`toggle-btn ${role === 'partner' ? 'active' : ''}`}
                        onClick={() => setRole('partner')}
                    >
                         Delivery Partner
                    </button>
                    <button 
                        type="button" 
                        className={`toggle-btn ${role === 'agent' ? 'active' : ''}`}
                        onClick={() => setRole('agent')}
                    >
                         Insurance Agent
                    </button>
                </div>
                {error && <div className="error-box">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@company.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Sign In"}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-dim)' }}>
                        New to SafeRide? <Link to="/register" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>Protect My Earnings</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
