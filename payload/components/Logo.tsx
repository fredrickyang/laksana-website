import React from 'react'

export const Logo = () => (
  <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
    <img
      src="/images/logo/logo.svg"
      alt="Laksana Logo"
      style={{
        maxWidth: '100%',
        height: 'auto',
        maxHeight: '45px',
      }}
    />
  </div>
)
