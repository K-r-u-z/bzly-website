import React from 'react'
import Link from 'next/link'

export default function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear()

  const sections = {
    music: [
      { name: 'Latest Releases', href: '/music' },
      { name: 'Discography', href: '/music' },
    ],
    social: [
      { name: 'Discord', href: 'https://discord.gg/9qaK8uaKXN' },
      { name: 'SoundCloud', href: 'https://soundcloud.com/kruzbeats' }
    ],
    contact: [
      { name: 'contact@bzly.info', href: '/contact' },
    ]
  }

  return (
    <footer className="bg-black/90 text-white border-t border-red-500/30">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold">BZLY</Link>
            <p className="mt-4 text-gray-400">
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Music</h3>
            <ul className="space-y-2">
              {sections.music.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-red-100 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              {sections.social.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-100 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              {sections.contact.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-red-100 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-red-500/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} BZLY. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Developed by Kruz
              </p>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link 
                href="/privacy"
                className="text-sm text-gray-400 hover:text-red-100 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                className="text-sm text-gray-400 hover:text-red-100 transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 