import Image from 'next/image'

interface SocialIconProps {
  platform: 'instagram' | 'twitter' | 'soundcloud'
  className?: string
}

export default function SocialIcon({ platform, className = '' }: SocialIconProps) {
  return (
    <div className={`relative w-10 h-10 ${className}`}>
      <Image
        src={`/icons/${platform}.png`}
        alt={platform}
        width={40}
        height={40}
        className="object-contain"
      />
    </div>
  )
} 