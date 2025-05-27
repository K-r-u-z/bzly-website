import Image from "next/image"
import ParticlesBackground from "@/components/ParticlesBackground"

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-red-500/10 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-10" />
          <Image
            src="/hero-background.jpg"
            alt="Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={90}
          />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 z-20">
          <ParticlesBackground />
        </div>
        
        <div className="z-30 text-center px-4">
          <h1 className="text-6xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300">How we handle your information</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-red-500/5">
        <div className="max-w-3xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Fictional Nature</h2>
            <p className="text-gray-300 mb-4">
              BZLY and KRUZ are fictional characters created for entertainment purposes. While we collect and process real user data for website functionality, all content, music, and narratives associated with these characters are works of fiction. Any personal information collected is used solely for website operation and improvement purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Information Sharing</h2>
            <p className="text-gray-300 mb-4">
              Our website integrates with third-party services including SoundCloud for music playback.
              These services may collect additional information according to their privacy policies.
            </p>
            <p className="text-gray-300">We may use third-party services such as:</p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
              <li>SoundCloud for music streaming</li>
              <li>Social media platforms (Instagram, Twitter)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement appropriate security measures to protect your information. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Your Rights</h2>
            <p className="text-gray-300 mb-4">
              For any privacy-related questions or concerns, please contact us through our contact form.
            </p>
          </section>

          <p className="text-gray-400 mt-8 text-sm">
            Last updated: May 2025
          </p>
        </div>
      </section>
    </main>
  )
}
