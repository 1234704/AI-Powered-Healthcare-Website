import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required to create an account.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    // Save user to our "local database"
    localStorage.setItem('carepulse_user', JSON.stringify(formData));
    
    navigate('/login');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSignup} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Create Account</h2>
        
        {error && <p className="text-red-500 mb-4 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
        
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Dr. John Doe" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="doctor@carepulse.com" 
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="••••••••" 
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-semibold transition-colors">
          Sign Up
        </button>
        
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Log in here</Link>
        </p>
      </form>
    </div>
  );
}