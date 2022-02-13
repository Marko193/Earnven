import React from 'react';

export const SvgComponent = ({ color }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6.12651V5H10V6.12651H8ZM8.06977 14V7.82234H9.95349V14H8.06977Z" fill={color} />
      <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="2" />
    </svg>
  );
};
