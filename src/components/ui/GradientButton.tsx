'use client'

import Link from 'next/link'

interface GradientButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}

export default function GradientButton({ 
  href, 
  children, 
  className = '',
  external = false 
}: GradientButtonProps) {
  const baseClasses = "inline-block bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
  
  if (external) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <Link 
      href={href}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </Link>
  )
} 