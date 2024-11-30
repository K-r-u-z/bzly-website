'use client'

import React from 'react'
import PageHero from '@/components/PageHero'
import SocialIcon from '@/components/SocialIcon'
import ContactForm from '@/components/ContactForm'

interface SocialLink {
  platform: 'instagram' | 'twitter' | 'spotify' | 'soundcloud'
  url: string
}

export default function Contact(): React.ReactElement {
  const socialLinks: SocialLink[] = [
    { platform: 'twitter', url: 'https://twitter.com/peanutrb' },
    { platform: 'spotify', url: '#' },
    { platform: 'soundcloud', url: 'https://soundcloud.com/user-405939442' }
  ]

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
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 