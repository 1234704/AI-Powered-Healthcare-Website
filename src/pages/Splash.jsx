import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-blue-600 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold animate-pulse mb-4">CarePulse</h1>
        <p className="text-xl opacity-80">Loading your healthcare dashboard...</p>
      </div>
    </div>
  );
}