'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHero from '@/components/PageHero'

export default function AdminLogin(): React.ReactElement {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Invalid credentials')
      }

      const data = await response.json()
      
      // Store the token in localStorage or other state management solution
      localStorage.setItem('adminToken', data.token)
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    } catch (err) {
      setError('Invalid username or password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <PageHero 
        title="Admin Login"
        height="half"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="bg-black/50 backdrop-blur-md p-8 rounded-lg border border-sky-900/30"
          >
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <label 
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
                required
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
} 