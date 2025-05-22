import React from 'react';
import Header from './partials/Header';
import FooterCustom from './partials/Footer';
// import Footer from './partials/Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </main>
      <FooterCustom/>
    </div>
  );
}