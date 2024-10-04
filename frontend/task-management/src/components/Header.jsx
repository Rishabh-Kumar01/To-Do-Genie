import React from 'react';
import { Menu } from 'lucide-react';

function Header({ toggleSidebar }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white p-4 flex items-center justify-between md:justify-center z-40">
      <button onClick={toggleSidebar} className="md:hidden focus:outline-none">
        <Menu size={24} />
      </button>
      
      <h1 className="text-2xl font-bold">Task Manager</h1>
      
      <div className="w-6 md:hidden"></div>
    </header>
  );
}

export default Header;