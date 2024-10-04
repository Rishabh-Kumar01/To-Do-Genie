import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { logout as logoutAPI } from '../api';
import { X } from 'lucide-react';

function Sidebar({ closeSidebar }) {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAPI();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="w-64 bg-gray-800 p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={closeSidebar} className="text-white focus:outline-none">
          <X size={24} />
        </button>
      </div>
      {user ? (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold">{user.username}</h2>
          </div>
          <nav className="flex-grow">
            <ul className="space-y-2">
              <li><Link to="/" className="block py-2 hover:text-gray-300" onClick={closeSidebar}>All Tasks</Link></li>
              <li><Link to="/new-task" className="block py-2 hover:text-gray-300" onClick={closeSidebar}>New Task</Link></li>
              <li><Link to="/change-password" className="block py-2 hover:text-gray-300" onClick={closeSidebar}>Change Password</Link></li>
            </ul>
          </nav>
          <button 
            onClick={() => {
              handleLogout();
              closeSidebar();
            }} 
            className="block py-2 hover:text-gray-300 w-full text-left mt-auto"
          >
            Logout
          </button>
        </>
      ) : (
        <nav>
          <ul className="space-y-2">
            <li><Link to="/login" className="block py-2 hover:text-gray-300" onClick={closeSidebar}>Login</Link></li>
            <li><Link to="/register" className="block py-2 hover:text-gray-300" onClick={closeSidebar}>Register</Link></li>
          </ul>
        </nav>
      )}
    </aside>
  );
}

export default Sidebar;