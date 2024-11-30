'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHero from '@/components/PageHero';

export default function UnsubscribePage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleUnsubscribe = async () => {
      try {
        const email = searchParams.get('email');
        
        if (!email) {
          setStatus('error');
          return;
        }

        const response = await fetch('/api/newsletter/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Unsubscribe error:', error);
        setStatus('error');
      }
    };

    handleUnsubscribe();
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <PageHero 
        title="Newsletter Unsubscribe" 
        subtitle="Manage your subscription"
      />
      
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-sky-900/20 rounded-lg p-8 shadow-lg border border-sky-600/20">
          {status === 'loading' && (
            <p className="text-center text-gray-300">Processing your unsubscribe request...</p>
          )}
          
          {status === 'success' && (
            <div className="text-center">
              <p className="text-green-400 mb-4">You have been successfully unsubscribed from our newsletter.</p>
              <p className="text-gray-300">We're sorry to see you go! You can always subscribe again from our website.</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center">
              <p className="text-red-400 mb-4">Sorry, we couldn't process your unsubscribe request.</p>
              <p className="text-gray-300">The link may be invalid or expired. Please contact us if you need assistance.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 