import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Logout from './Logout';

function Layout() {
  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-blue-100">
        <h1 className="text-xl font-bold">Banking System</h1>
        <nav>
          
          <Logout />
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
