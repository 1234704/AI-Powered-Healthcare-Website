import { Outlet, useNavigate } from 'react-router-dom';

export default function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-blue-900">CarePulse Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
        >
          Logout
        </button>
      </nav>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="p-4 bg-white border-t border-gray-200 text-center text-sm text-gray-500">
        © 2026 CodeCelix Health. All rights reserved.
      </footer>
    </div>
  );
}