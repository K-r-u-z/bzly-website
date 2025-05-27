'use client'

import React from 'react'
import PageHero from '@/components/PageHero'
import SocialIcon from '@/components/SocialIcon'
import ContactForm from '@/components/ContactForm'

type SocialLink = {
  url: string
  platform: 'instagram' | 'twitter' | 'soundcloud'
}

export default function Contact(): React.ReactElement {
  const socialLinks: SocialLink[] = [
    { platform: 'twitter', url: 'https://twitter.com/peanutrb' },
    { platform: 'soundcloud', url: 'https://soundcloud.com/user-405939442' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-red-500/10 to-black text-white">
      <PageHero 
        title="Contact"
        subtitle="Get in touch with BZLY"
        titleClassName="text-white"
        subtitleClassName="text-white"
      />
      
      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">
                Connect With Us
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <p className="bg-clip-text text-transparent bg-gradient-to-r from-red-100 to-red-200">contact@bzly.info</p>
                  <p className="text-sm text-gray-400 mt-1">We aim to respond to all inquiries within 24 hours or less.</p>
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
                        className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300"
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
            <div className="bg-black/40 p-8 rounded-lg shadow-xl shadow-red-500/20 border border-red-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-white">
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