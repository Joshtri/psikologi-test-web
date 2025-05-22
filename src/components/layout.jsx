import React from 'react';

export default function Layout({ children }) {
  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Bisa tambah header/nav/footer di sini */}
      {children}
    </div>
  );
}