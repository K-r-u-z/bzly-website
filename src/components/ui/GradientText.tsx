'use client'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export default function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-red-100 via-red-200 to-red-300 ${className}`}>
      {children}
    </span>
  )
} 