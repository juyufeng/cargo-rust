import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

/**
 * 导航栏组件
 * 
 * 提供在不同页面间导航的功能
 */
const NavBar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <Link to="/">Wasm 插件演示</Link>
      </div>
      
      <button className="menu-button" onClick={toggleMenu}>
        {menuOpen ? '✕' : '☰'}
      </button>
      
      <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
          onClick={() => setMenuOpen(false)}
        >
          首页
        </Link>
        <Link 
          to="/extism" 
          className={location.pathname === '/extism' ? 'active' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Extism 插件
        </Link>
        <Link 
          to="/bindgen" 
          className={location.pathname === '/bindgen' ? 'active' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Bindgen 插件
        </Link>
      </div>
    </nav>
  );
};

export default NavBar; 