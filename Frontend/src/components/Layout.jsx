import React from 'react';
import { Outlet } from "react-router-dom"; 

const Layout = ({ children }) => (
  <div className="bg-[#0a0a0a] text-gray-300 min-h-screen flex flex-col items-center justify-center font-sans p-4 selection:bg-yellow-500/30">
    <main className="flex-grow flex items-center justify-center w-full"><Outlet /> </main>
    <footer className="text-center text-gray-600 text-xs py-4">
      &copy; {new Date().getFullYear()} Noir Capital. All Rights Reserved.
    </footer>
  </div>
);

export default Layout;
