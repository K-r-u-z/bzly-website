'use client'

import React, { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    console.log('Submitting newsletter form with email:', email)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to subscribe')
      }

      setStatus('success')
      setMessage(data.message || 'Successfully subscribed!')
      setEmail('')
    } catch (error) {
      console.error('Subscription error:', error)
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-full bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white px-8 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25 disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {message && (
          <div className={`text-center text-sm p-2 rounded ${
            status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  )
} 