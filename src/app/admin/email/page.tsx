'use client';

import { useState, useEffect } from 'react';
import PageHero from '@/components/PageHero';
import { generateEmail } from '@/utils/emailTemplates';

export default function EmailResponse() {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    type: 'contact' // or 'noreply'
  });
  const [previewHtml, setPreviewHtml] = useState('');

  // Update preview whenever email data changes
  useEffect(() => {
    if (emailData.subject || emailData.message) {
      const emailHtml = generateEmail({
        title: emailData.subject || 'Preview',
        content: emailData.message || 'Your message will appear here...',
        category: 'MESSAGE',
        email: emailData.to || 'recipient@example.com'
      });
      setPreviewHtml(emailHtml);
    }
  }, [emailData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Generate the email HTML using the template
      const emailHtml = generateEmail({
        title: emailData.subject,
        content: emailData.message,
        category: 'MESSAGE',
        email: emailData.to
      });

      const response = await fetch('/api/email/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...emailData,
          message: emailHtml
        }),
      });

      if (!response.ok) throw new Error('Failed to send email');
      
      alert('Email sent successfully!');
      setEmailData({ to: '', subject: '', message: '', type: 'contact' });
      setPreviewHtml('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-red-500/20 to-black text-white">
      <PageHero 
        title="Email Response"
        subtitle="Send emails as BZLY"
      />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-red-500/20 p-8 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-2">Send As:</label>
                <select
                  value={emailData.type}
                  onChange={(e) => setEmailData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-red-100 focus:outline-none focus:border-red-200 text-white"
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
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-red-100 focus:outline-none focus:border-red-200 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject:</label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-red-100 focus:outline-none focus:border-red-200 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message:</label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-red-100 focus:outline-none focus:border-red-200 text-white h-40"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-400 hover:bg-red-300 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/25"
              >
                Send Email
              </button>
            </form>
          </div>

          {/* Preview Panel */}
          <div className="bg-black/50 p-6 rounded-lg border border-red-400/20">
            <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
            <div className={`rounded-lg overflow-hidden ${previewHtml ? 'bg-white' : 'bg-black border border-red-400/20'}`}>
              {previewHtml ? (
                <iframe
                  srcDoc={previewHtml}
                  className="w-full h-[600px]"
                  title="Email Preview"
                />
              ) : (
                <div className="w-full h-[600px] flex items-center justify-center text-white/60">
                  Start typing to see the email preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 