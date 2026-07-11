import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) return;
    setMessage(`If an account exists for ${email}, a reset link has been sent.`);
    setEmail('');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleReset} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-900">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">Enter your email address and we'll send you a link to reset your password.</p>
        
        {message && <p className="text-green-700 mb-4 text-sm text-center bg-green-50 p-3 rounded border border-green-200">{message}</p>}
        
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-semibold transition-colors">Send Reset Link</button>
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-blue-600 font-medium hover:underline">← Back to Login</Link>
        </div>
      </form>
    </div>
  );
}