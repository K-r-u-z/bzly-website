import Image from 'next/image'

interface SocialIconProps {
  platform: 'discord' | 'soundcloud'
  className?: string
}

export default function SocialIcon({ platform, className = '' }: SocialIconProps) {
  switch (platform) {
    case 'discord':
      return (
        <Image
          src="/icons/discord.png"
          alt="Discord"
          width={24}
          height={24}
          className={className}
        />
      )
    case 'soundcloud':
      return (
        <Image
          src="/icons/music.png"
          alt="SoundCloud"
          width={24}
          height={24}
          className={className}
        />
      )
  }
} 