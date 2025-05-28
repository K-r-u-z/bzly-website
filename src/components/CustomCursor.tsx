'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if we're on desktop (width > 768px)
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    // Initial check
    checkDesktop();

    // Add resize listener
    window.addEventListener('resize', checkDesktop);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Only add mouse event listeners if we're on desktop
    if (isDesktop) {
      window.addEventListener('mousemove', updatePosition);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'none';
    }

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible, isDesktop]);

  // Don't render anything on mobile
  if (!isDesktop) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-100"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <Image
        src="/blunt-cursor.png"
        alt="Custom cursor"
        width={32}
        height={32}
        className="w-8 h-8"
        priority
      />
    </div>
  );
};

export default CustomCursor; 