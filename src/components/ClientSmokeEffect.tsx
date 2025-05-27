'use client';

import dynamic from 'next/dynamic';

const SmokeEffect = dynamic(() => import('./SmokeEffect'), {
  ssr: false,
});

export default function ClientSmokeEffect() {
  return <SmokeEffect />;
} 