import React from 'react';
import { Menu } from 'lucide-react';

function Header({ toggleSidebar }) {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center md:hidden">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button onClick={toggleSidebar} className="focus:outline-none">
        <Menu size={24} />
      </button>
    </header>
  );
}

export default Header;