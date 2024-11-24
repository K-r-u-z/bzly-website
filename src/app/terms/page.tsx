'use client'

import React from 'react'
import PageHero from '@/components/PageHero'

export default function Terms(): React.ReactElement {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <PageHero 
        title="Terms of Service"
        subtitle="Last updated: January 2024"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">1. Agreement to Terms</h2>
              <p>
                By accessing our website bzly.com, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">2. Intellectual Property Rights</h2>
              <p>
                All content on this Website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of BZLY and is protected by international copyright laws.
              </p>
              <p className="mt-4">
                You may not:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Transfer the materials to another person or mirror them on any other server</li>
                <li>Use the materials in any way that violates our intellectual property rights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">3. User Content</h2>
              <p>
                By posting, uploading, or submitting any content to our Website, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, publicly perform, publicly display, reproduce, and distribute such content.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">4. Prohibited Activities</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Use the Website in any way that violates any applicable laws</li>
                <li>Engage in unauthorized framing or linking to the Website</li>
                <li>Upload or transmit viruses or malicious code</li>
                <li>Collect or track personal information of other users</li>
                <li>Spam, phish, or harm others in any way</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">5. Disclaimer</h2>
              <p>
                The materials on BZLY's Website are provided on an 'as is' basis. BZLY makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">6. Limitation of Liability</h2>
              <p>
                In no event shall BZLY or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BZLY's Website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">7. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of any changes by updating the "Last updated" date at the top of this page.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-sky-400">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
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