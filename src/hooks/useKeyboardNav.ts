'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useKeyboardNav() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key) {
          case 'h':
            router.push('/')
            break
          case 'm':
            router.push('/music')
            break
          case 'n':
            router.push('/news')
            break
          case 'a':
            router.push('/about')
            break
          case 'c':
            router.push('/contact')
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [router])
} 