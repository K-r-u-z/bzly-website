'use client'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export default function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500 ${className}`}>
      {children}
    </span>
  )
} 