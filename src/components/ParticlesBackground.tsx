'use client'

import { useCallback } from 'react'
import type { Engine } from 'tsparticles-engine'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import type { ISourceOptions } from 'tsparticles-engine'

interface ParticlesBackgroundProps {
  preset?: 'default' | 'waves' | 'equalizer' | 'pulse' | 'stardust'
}

export default function ParticlesBackground({ preset = 'default' }: ParticlesBackgroundProps): React.ReactElement {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const baseConfig: ISourceOptions = {
    fullScreen: false,
    fpsLimit: 120,
    particles: {
      number: {
        value: 300,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: [
          "#111111",  // Almost black
          "#222222",  // Very dark gray
          "#333333",  // Dark gray
          "#444444",  // Medium dark gray
          "#666666",   // Medium gray
          "#777777",  // Slightly lighter gray
          "#999999",  // Light gray
        ]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.3,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: { min: 1, max: 3 },
        random: true
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "bounce"
        }
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
          parallax: {
            enable: true,
            force: 20,
            smooth: 20
          }
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
          factor: 20,
          speed: 0.5,
          maxSpeed: 20,
          easing: "ease-out-quad"
        }
      }
    },
    background: {
      color: "transparent"
    },
    detectRetina: true
  }

  return (
    <Particles
      className="absolute inset-0"
      id="tsparticles"
      init={particlesInit}
      options={baseConfig}
    />
  )
} 