'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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

export default function NewsArticle(): React.ReactElement {
  const params = useParams()
  const id = Number(params.id)

  // This would typically come from an API or database
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
      content: `We're thrilled to announce the launch of our new official website. This platform represents a significant step forward in our digital presence, designed to create a more immersive and engaging experience for our fans.

      The new website features a sleek, modern design that reflects our artistic vision while providing easy access to all things BZLY. From our latest music releases to behind-the-scenes content, everything has been carefully curated to enhance your experience.

      Key Features:
      - Integrated music player for seamless listening
      - Real-time updates on new releases and events
      - Enhanced mobile experience
      - Direct connection to our social media platforms
      - Streamlined contact options for business inquiries

      This launch marks the beginning of a new chapter in how we connect with our audience. We're excited to use this platform to share our journey, music, and stories in more meaningful ways.

      Stay tuned for exclusive content and updates that will only be available here on our official website.`,
      image: "/article2.png",
      category: 'Launch'
    },
    {
      id: 3,
      title: "What's Next for BZLY",
      date: "December 5, 2024",
      excerpt: "Exciting developments on the horizon as BZLY teases new projects and collaborations.",
      content: `As we close out 2024, we're already hard at work on new material that promises to push our creative boundaries even further. The success of 'The Resurrection' has opened up exciting new opportunities for collaboration and experimentation.

      In the coming months, fans can expect:
      - New singles showcasing evolved sound
      - Collaborative projects with other artists
      - Special live performance announcements
      - Behind-the-scenes content
      - Exclusive merchandise drops

      We're particularly excited about several upcoming collaborations that will bring together different styles and perspectives, creating something truly unique for our listeners.

      The creative process is already underway, and we can't wait to share these new sounds with you. Each project represents a step forward in our artistic journey while staying true to our core sound and vision.

      Keep an eye on our social media and website for more updates as we move into 2025. The best is yet to come!`,
      image: "/article3.jpg",
      category: 'Announcement'
    }
  ]

  const article = newsArticles.find(article => article.id === id)

  if (!article) {
    return <div>Article not found</div>
  }

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
        title={article.title}
        subtitle={article.date}
      />
      
      <article className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-12">
            <span className={`inline-block ${getCategoryColor(article.category)} px-4 py-1 rounded-full text-sm mb-4`}>
              {article.category}
            </span>
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-8">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <Link 
                href="/news"
                className="text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to News
              </Link>
              <div className="flex gap-4">
                <Link 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  className="text-gray-400 hover:text-sky-400 transition-colors"
                >
                  Share on X
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
} 