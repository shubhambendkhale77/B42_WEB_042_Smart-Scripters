import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120">
    <path 
      d="M50 70 L65 70 L75 30 L30 30 L35 40 L65 40 L60 60 L40 60" 
      fill="none" 
      stroke="#2563EB" 
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="45" cy="80" r="6" fill="#2563EB"/>
    <circle cx="60" cy="80" r="6" fill="#2563EB"/>
    <text 
      x="100" 
      y="65" 
      fontFamily="Arial, sans-serif" 
      fontSize="40" 
      fontWeight="bold"
      fill="#1E293B"
    >
      Shop<tspan fill="#2563EB">Smart</tspan>
    </text>
    <text 
      x="100" 
      y="85" 
      fontFamily="Arial, sans-serif" 
      fontSize="14" 
      fill="#64748B"
    >
      Your Digital Marketplace
    </text>
  </svg>
);

