import { MetadataRoute } from 'next'
import { getPublishedDogs, getPublishedUpdates } from '@/lib/cms/db'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://secondchancetails.org'
  const dogs = getPublishedDogs()
  const updates = getPublishedUpdates()

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/dogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/adoption`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/volunteer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/emergency`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...dogs.map((dog) => ({
      url: `${baseUrl}/dogs/${dog.publicId}`,
      lastModified: new Date(dog.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...updates.map((update) => ({
      url: `${baseUrl}/updates/${update.slug}`,
      lastModified: new Date(update.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}


