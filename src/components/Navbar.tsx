'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Music', path: '/music' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
    { name: 'Join our Discord', path: 'https://discord.com/invite/yFdpd8Vyk8', external: true },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string): boolean => pathname === path

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/50 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative max-w-6xl mx-auto flex items-center h-16">
        {/* Logo with jiggle animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute left-0 flex items-center h-full"
          whileHover={{ 
            rotate: [0, -5, 5, -5, 5, 0],
            transition: { 
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          <Link href="/" className="block w-[100px] h-[50px] relative">
            <Image
              src="/bzly-logo.png"
              alt="BZLY"
              fill
              sizes="100px"
              className="object-contain"
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 mx-auto">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
            >
              {item.external ? (
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative px-2 py-1 group transition-colors text-white hover:text-sky-400`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-sky-400 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </a>
              ) : (
                <Link
                  href={item.path}
                  className={`relative px-2 py-1 group transition-colors ${
                    isActive(item.path)
                      ? 'text-sky-400'
                      : 'text-white hover:text-sky-400'
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-sky-400 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                  {isActive(item.path) && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-400"
                      layoutId="underline"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden absolute right-4 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden absolute top-full left-0 right-0 overflow-hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial="collapsed"
          animate={isMenuOpen ? "open" : "collapsed"}
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {item.external ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-base text-white hover:text-sky-400 hover:bg-sky-900/10 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.path}
                    className={`block px-3 py-2 text-base transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-sky-400 bg-sky-900/20'
                        : 'text-white hover:text-sky-400 hover:bg-sky-900/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
} 