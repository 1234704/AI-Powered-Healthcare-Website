import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    // Retrieve user from our "local database"
    const storedUser = JSON.parse(localStorage.getItem('carepulse_user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      // Set authentication flag
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      // Reject unauthorized users
      setError('Invalid email or password. Please create an account first.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Welcome Back</h2>
        
        {error && <p className="text-red-500 mb-4 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
        
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="doctor@carepulse.com" />
        </div>
        
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-semibold transition-colors">Sign In</button>
        
        <div className="mt-6 text-sm text-center flex justify-between">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
          <Link to="/signup" className="text-blue-600 hover:underline">Create Account</Link>
        </div>
      </form>
    </div>
  );
}