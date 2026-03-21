import React from 'react'

export const Logo = () => (
  <div className="laksana-logo-wrapper">
    <style dangerouslySetInnerHTML={{__html: `
      .laksana-logo-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .laksana-logo-wrapper img {
        max-width: 100%;
        height: auto;
        /* Sidebar needs small height, auth page allows larger */
        max-height: 80px; 
      }
      .payload-sidebar-header .laksana-logo-wrapper img {
        max-height: 45px;
      }
      /* Auto-invert the black logo for dark mode visibility */
      [data-theme="dark"] .laksana-logo-wrapper img {
        filter: brightness(0) invert(1);
      }
    `}} />
    <img
      src="/images/logo/logo.svg"
      alt="Laksana Logo"
    />
  </div>
)
