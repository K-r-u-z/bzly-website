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
          "#BF0B02",  // red-100
          "#AE0603",  // red-200
          "#880203",  // red-300
          "#560000",  // red-400
          "#250100",  // red-500
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
    <div className="absolute inset-0">
      <Particles
        className="absolute inset-0"
        id="tsparticles"
        init={particlesInit}
        options={baseConfig}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </div>
  )
} 