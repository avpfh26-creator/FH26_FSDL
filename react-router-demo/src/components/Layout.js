import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet /> {/* This renders the current page content */}
      </main>
      <footer className="footer">
        <p>© 2024 React Router Demo - Single Page Application</p>
      </footer>
    </>
  );
}

export default Layout;