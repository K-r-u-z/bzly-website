'use client'

import React from 'react'
import PageHero from '@/components/PageHero'

export default function Privacy(): React.ReactElement {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <PageHero 
        title="Privacy Policy"
        subtitle="Last updated: January 2024"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">1. Introduction</h2>
              <p>
                BZLY ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website bzly.com (the "Website").
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">2. Information We Collect</h2>
              <h3 className="text-xl font-bold mb-2">Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Contact us through our website</li>
                <li>Subscribe to our newsletter</li>
                <li>Register for an account</li>
                <li>Purchase merchandise or music</li>
              </ul>

              <h3 className="text-xl font-bold mb-2 mt-6">Automatically Collected Information</h3>
              <p>When you visit our Website, we automatically collect certain information, including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Device information (browser type, IP address)</li>
                <li>Usage data (pages visited, time spent)</li>
                <li>Location data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">3. How We Use Your Information</h2>
              <p>We use the collected information for various purposes:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>To provide and maintain our Website</li>
                <li>To notify you about changes to our services</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">5. Third-Party Services</h2>
              <p>
                Our Website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party sites.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to our use of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                Email: contact.kruzbeats@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 