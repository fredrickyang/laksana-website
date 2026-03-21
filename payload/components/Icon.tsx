import React from 'react'

export const Icon = () => (
  <div className="laksana-icon-wrapper">
    <style dangerouslySetInnerHTML={{__html: `
      .laksana-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .laksana-icon-wrapper img {
        width: 32px;
        height: 32px;
        object-fit: contain;
      }
      [data-theme="dark"] .laksana-icon-wrapper img {
        filter: brightness(0) invert(1);
      }
    `}} />
    <img
      src="/images/logo/logo.svg"
      alt="Laksana Logo"
    />
  </div>
)
