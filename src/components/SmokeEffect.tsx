'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  rotation: number;
  rotationSpeed: number;
  stretch: number;
  points: { x: number; y: number }[]; // Points for organic shape
}

const SmokeEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: Particle[] = [];
  const mousePosition = useRef({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  // Offset values for smoke position
  const OFFSET_X = 15; // Pixels to the right
  const OFFSET_Y = -11; // Pixels up (negative means up)

  useEffect(() => {
    // Check if we're on desktop (width > 768px)
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    // Initial check
    checkDesktop();

    // Add resize listener
    window.addEventListener('resize', checkDesktop);

    const canvas = canvasRef.current;
    if (!canvas || !isDesktop) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Create organic shape points
    const createOrganicShape = (size: number, stretch: number) => {
      const points = [];
      const numPoints = 8;
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const radius = size * (0.8 + Math.random() * 0.4);
        points.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius * stretch,
        });
      }
      return points;
    };

    // Create new particle
    const createParticle = () => {
      const size = Math.random() * 4 + 2;
      const speedX = (Math.random() - 0.5) * 0.1;
      const speedY = -Math.random() * 0.2 - 0.1;
      const rotation = Math.random() * Math.PI * 2;
      const rotationSpeed = (Math.random() - 0.5) * 0.005;
      const stretch = 0.8;

      // Add offset to the initial position
      const startX = mousePosition.current.x + OFFSET_X;
      const startY = mousePosition.current.y + OFFSET_Y;

      particles.push({
        x: startX,
        y: startY,
        size,
        speedX,
        speedY,
        opacity: 0.5,
        life: 1,
        rotation,
        rotationSpeed,
        stretch,
        points: createOrganicShape(size, stretch),
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles continuously
      if (particles.length < 100) {
        createParticle();
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        // Update particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.size *= 0.995;
        particle.opacity *= 0.995;
        particle.life -= 0.002;
        particle.rotation += particle.rotationSpeed;
        particle.stretch += 0.02;

        // Update points for organic shape
        particle.points = createOrganicShape(particle.size, particle.stretch);

        // Add some turbulence
        particle.speedX += (Math.random() - 0.5) * 0.02;
        particle.speedY += (Math.random() - 0.5) * 0.02;

        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        // Draw organic shape
        ctx.beginPath();
        ctx.moveTo(particle.points[0].x, particle.points[0].y);
        for (let i = 1; i < particle.points.length; i++) {
          const point = particle.points[i];
          const prevPoint = particle.points[i - 1];
          const cpX = (prevPoint.x + point.x) / 2;
          const cpY = (prevPoint.y + point.y) / 2;
          ctx.quadraticCurveTo(cpX, cpY, point.x, point.y);
        }
        ctx.closePath();
        
        // Create gradient for more realistic look
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * particle.stretch);
        gradient.addColorStop(0, `rgba(200, 200, 200, ${particle.opacity})`);
        gradient.addColorStop(1, `rgba(200, 200, 200, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.restore();

        // Remove dead particles
        if (particle.life <= 0 || particle.size < 0.5) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDesktop]);

  // Don't render anything on mobile
  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default SmokeEffect; 