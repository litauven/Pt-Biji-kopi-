import { MetadataRoute } from 'next'
import { products } from '../data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://acewinmello.com'

  const staticPages = [
    '',
    '/about',
    '/divisions',
    '/products',
    '/services',
    '/industries',
    '/gallery',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...productPages]
}
