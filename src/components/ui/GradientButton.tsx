'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes } from 'react';

export interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function GradientButton({ 
  children, 
  className = '', 
  ...props 
}: GradientButtonProps) {
  return (
    <button
      className={`
        relative px-6 py-2 
        bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500
        text-white font-medium rounded-lg
        transition-all duration-200
        hover:scale-[1.02] hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
} 