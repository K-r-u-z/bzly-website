'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes } from 'react'

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  href?: string
}

export default function GradientButton({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false
}: GradientButtonProps) {
  const baseClasses = `bg-red-400 hover:bg-red-300 text-white px-6 py-2 rounded-full transition-all duration-300 ${className}`

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
} 