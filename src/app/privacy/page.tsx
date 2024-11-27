export default function Privacy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-sky-400">Information We Collect</h2>
          <p className="text-gray-300 mb-4">
            We collect minimal information to provide you with the best experience on our website. This includes:
          </p>
          <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
            <li>Usage data through analytics (pages visited, time spent)</li>
            <li>Technical data (browser type, device information)</li>
            <li>Cookies for website functionality</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-sky-400">How We Use Your Information</h2>
          <p className="text-gray-300 mb-4">
            We use collected information to:
          </p>
          <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
            <li>Improve website performance and content</li>
            <li>Analyze user behavior to enhance user experience</li>
            <li>Maintain website security</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-sky-400">Third-Party Services</h2>
          <p className="text-gray-300 mb-4">
            Our website integrates with third-party services including SoundCloud and Spotify for music playback. These services may collect additional information according to their own privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-sky-400">Data Security</h2>
          <p className="text-gray-300 mb-4">
            We implement appropriate security measures to protect your information. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-sky-400">Contact Information</h2>
          <p className="text-gray-300 mb-4">
            For any privacy-related questions or concerns, please contact us through our contact form.
          </p>
        </section>

        <p className="text-gray-400 mt-8 text-sm">
          Last updated: March 2024
        </p>
      </div>
    </main>
  )
}
