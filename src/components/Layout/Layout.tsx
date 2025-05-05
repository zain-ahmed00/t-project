
import React from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, header, footer }) => {
  return (
    <div className="app-layout">
      <header className="app-header">
        {header}
      </header>
      <main className="app-content">
        {children}
      </main>
      <footer className="app-footer">
        {footer}
      </footer>
    </div>
  );
};

export default Layout;
