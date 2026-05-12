import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">📝 Notes App</h1>
        <div className="navbar-menu">
          <span>My Notes</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;