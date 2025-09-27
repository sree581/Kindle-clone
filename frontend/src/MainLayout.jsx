import React from 'react';
import Navbar from './Navbar';

function MainLayout({ children }) {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;

