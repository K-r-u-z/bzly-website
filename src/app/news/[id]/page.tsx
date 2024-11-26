'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { NewsItem } from '@/types'

// Hard-coded news items
const defaultNewsItems: NewsItem[] = [
  {
    id: "1",
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
    id: "2",
    title: "New Official Website Launch",
    date: "December 1, 2024",
    excerpt: "BZLY launches new interactive website to better connect with fans.",
    content: "We're thrilled to announce the launch of our new official website. This platform will serve as your central hub for all things BZLY - from music releases to behind-the-scenes content. The new site features an immersive design that reflects our artistic vision, making it easier than ever to stay connected with our journey.",
    image: "/article2.png",
    category: 'Launch'
  },
  {
    id: "3",
    title: "What's Next for BZLY",
    date: "December 5, 2024",
    excerpt: "Exciting developments on the horizon as BZLY teases new projects and collaborations.",
    content: "As we close out 2024, we're already hard at work on new material. Expect more releases, potential collaborations, and some exciting surprises in early 2025. We're pushing our creative boundaries and can't wait to share what we've been working on. Stay tuned for more updates!",
    image: "/article3.jpg",
    category: 'Update'
  }
]

export default function NewsArticle({
  params
}: {
  params: { id: string }
}): React.ReactElement {
  const [article, setArticle] = useState<NewsItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchArticle()
  }, [params.id])

  const fetchArticle = async () => {
    // First check if it's one of our default articles
    const defaultArticle = defaultNewsItems.find(item => item.id === params.id)
    if (defaultArticle) {
      setArticle(defaultArticle)
      setIsLoading(false)
      return
    }

    // If not a default article, try to fetch from MongoDB
    try {
      const response = await fetch(`/api/news/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch article')
      const data = await response.json()
      
      setArticle({
        ...data,
        id: data._id.toString(),
        _id: data._id.toString(),
        date: new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      })
    } catch (err) {
      setError('Failed to load article')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  if (!article) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">Article not found</h1>
            <button
              onClick={() => router.push('/news')}
              className="mt-4 text-sky-400 hover:text-sky-300"
            >
              Return to News
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Article Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <span 
            className={`inline-block mb-4 px-4 py-1 rounded-full text-sm ${getCategoryColor(article.category)}`}
          >
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {article.title}
          </h1>
          <time className="text-gray-300">
            {article.date}
          </time>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            {/* Split content into paragraphs */}
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-300">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-sky-900/30">
            <button
              onClick={() => router.push('/news')}
              className="text-sky-400 hover:text-sky-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to News
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function getCategoryColor(category: NewsItem['category']): string {
  switch (category) {
    case 'Release':
      return 'bg-sky-600 text-white'
    case 'Tour':
      return 'bg-blue-600 text-white'
    case 'Update':
      return 'bg-sky-500 text-white'
    case 'Launch':
      return 'bg-green-600 text-white'
    default:
      return 'bg-gray-600 text-white'
  }
}
