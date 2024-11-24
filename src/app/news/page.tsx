'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

interface NewsArticle {
  id: number
  title: string
  date: string
  excerpt: string
  content: string
  image: string
  category: 'Release' | 'Tour' | 'Update' | 'Announcement' | 'Launch'
}

export default function News(): React.ReactElement {
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "'The Resurrection' - A Journey of Rebirth",
      date: "November 22, 2024",
      excerpt: "BZLY and KRUZ deliver a powerful comeback album chronicling their transformative journey from adversity to triumph.",
      content: `'The Resurrection' is more than just an album - it's a raw, unfiltered chronicle of rebirth. 
      BZLY's and KRUZ's comeback album takes listeners on an intense journey from hospital bed to unstoppable force, 
      depicting the raw emotions and transformative experiences of overcoming personal and external demons. 
      
      The album opens with a gripping skit that sets the stage for what's to come, immediately pulling listeners 
      into the narrative. Tracks like "Big Moves" and "Did The Dash" showcase not just musical prowess, but serve 
      as anthems of resilience and determination. Each track peels back another layer of the journey, from breaking 
      free of toxic relationships to embracing new beginnings.

      "Raised in the Struggle" and "Gotta Be a Dawg" further cement the album's themes of perseverance and authenticity, 
      while the strategic placement of skits throughout the project helps weave a compelling narrative that keeps 
      listeners engaged from start to finish.

      The outro offers an intriguing glimpse into what's next for BZLY and KRUZ, serving as both a conclusion to 
      this chapter and a preview of their promising future. More than just a collection of tracks, 'The Resurrection' 
      stands as a testament to loyalty, resilience, and the power of true artistic vision.

      Available now on all major streaming platforms, this is an album that needs to be experienced from start to finish 
      to truly appreciate its impact.`,
      image: "/article1.png",
      category: 'Release'
    },
    {
      id: 2,
      title: "New Official Website Launch",
      date: "December 1, 2024",
      excerpt: "BZLY launches new interactive website to better connect with fans.",
      content: "We're thrilled to announce the launch of our new official website. This platform will serve as your central hub for all things BZLY - from music releases to behind-the-scenes content. The new site features an immersive design that reflects our artistic vision, making it easier than ever to stay connected with our journey.",
      image: "/article2.png",
      category: 'Launch'
    },
    {
      id: 3,
      title: "What's Next for BZLY",
      date: "December 5, 2024",
      excerpt: "Exciting developments on the horizon as BZLY teases new projects and collaborations.",
      content: "As we close out 2024, we're already hard at work on new material. Expect more releases, potential collaborations, and some exciting surprises in early 2025. We're pushing our creative boundaries and can't wait to share what we've been working on. Stay tuned for more updates!",
      image: "/article3.jpg",
      category: 'Update'
    }
  ]

  const getCategoryColor = (category: NewsArticle['category']): string => {
    switch (category) {
      case 'Release':
        return 'bg-sky-600'
      case 'Tour':
        return 'bg-blue-600'
      case 'Update':
        return 'bg-sky-500'
      default:
        return 'bg-gray-600'
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <PageHero 
        title="Latest News"
        subtitle="Stay updated with BZLY"
      />
      
      {/* News Articles */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {newsArticles.map((article) => (
              <article 
                key={article.id}
                className="bg-gradient-to-r from-black to-sky-900/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Article Image */}
                  <div className="relative h-[300px] md:h-auto">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span 
                      className={`absolute top-4 left-4 ${getCategoryColor(article.category)} px-4 py-1 rounded-full text-sm`}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div className="p-8">
                    <div className="mb-4">
                      <time className="text-gray-400 text-sm">{article.date}</time>
                      <h2 className="text-2xl font-bold mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                        {article.title}
                      </h2>
                      <p className="text-gray-300 mb-6">{article.content}</p>
                    </div>
                    <Link 
                      href={`/news/${article.id}`}
                      className="inline-flex items-center text-sky-400 hover:text-blue-400 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-sky-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive updates and behind-the-scenes content.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
} 