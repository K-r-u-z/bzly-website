'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import SocialIcon from '@/components/SocialIcon'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface SocialLink {
  platform: 'instagram' | 'twitter' | 'spotify' | 'soundcloud'
  url: string
}

export default function Contact(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const socialLinks: SocialLink[] = [
    { platform: 'twitter', url: 'https://twitter.com/peanutrb' },
    { platform: 'spotify', url: '#' },
    { platform: 'soundcloud', url: 'https://soundcloud.com/user-405939442' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <PageHero 
        title="Contact"
        subtitle="Get in touch with BZLY"
      />
      
      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                Connect With Us
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <p className="text-gray-300">contact.kruzbeats@gmail.com</p>
                </div>
                
                {/* Social Links */}
                <div className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-sky-900/20 hover:bg-sky-900/40 transition-colors duration-300"
                      >
                        <SocialIcon 
                          platform={link.platform}
                          className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-sky-900/20 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="press">Press Inquiry</option>
                    <option value="general">General Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 