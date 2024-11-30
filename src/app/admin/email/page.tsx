'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';

export default function EmailResponse() {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    type: 'contact' // or 'noreply'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/email/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) throw new Error('Failed to send email');
      
      alert('Email sent successfully!');
      setEmailData({ to: '', subject: '', message: '', type: 'contact' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <PageHero 
        title="Email Response"
        subtitle="Send emails as BZLY"
      />
      
      <div className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6 bg-sky-900/20 p-8 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-2">Send As:</label>
            <select
              value={emailData.type}
              onChange={(e) => setEmailData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
            >
              <option value="contact">contact@bzly.info</option>
              <option value="noreply">noreply@bzly.info</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">To:</label>
            <input
              type="email"
              value={emailData.to}
              onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Subject:</label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Message:</label>
            <textarea
              value={emailData.message}
              onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white h-40"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
          >
            Send Email
          </button>
        </form>
      </div>
    </main>
  );
} 