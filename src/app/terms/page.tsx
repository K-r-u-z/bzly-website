import Image from "next/image";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Terms() {
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
          <h1 className="text-6xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-300">Understanding our terms and conditions</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-red-500/5">
        <div className="max-w-3xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Website Usage</h2>
            <p className="text-gray-300 mb-4">
              By accessing and using the BZLY website, you agree to these terms of service. This website is intended for personal, non-commercial use to access BZLY's music, news, and updates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Fictional Nature</h2>
            <p className="text-gray-300 mb-4">
              BZLY and KRUZ are fictional characters created for entertainment purposes. The music, stories, and content associated with these characters are works of fiction and should not be interpreted as real or factual. All content is created purely for artistic and entertainment purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Music Streaming</h2>
            <p className="text-gray-300 mb-4">
              Music streaming is provided through embedded players from official platforms, including SoundCloud.
              Usage of these services is subject to their respective terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. User Conduct</h2>
            <p className="text-gray-300 mb-4">
              Users must not engage in any activity that could harm, disable, or impair the website's functionality. This includes attempting unauthorized access to our systems or data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              This website is provided "as is" without warranties of any kind. BZLY is not liable for any damages arising from your use of the website. All content, including music and narratives, is fictional and created for entertainment purposes only. Any resemblance to real persons, living or dead, or actual events is purely coincidental.
            </p>
          </section>

          <p className="text-gray-400 mt-8 text-sm">
            Last updated: May 2025
          </p>

          <p className="text-gray-400 mt-2 text-xs italic">
            Our website integrates with third-party services including SoundCloud and Apple Music for music playback. These services have their own terms of service that you must comply with.
          </p>
        </div>
      </section>
    </main>
  )
}
