import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const VideoSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  date: z.string(),
  category: z.string(),
  status: z.string(),
  platforms: z.object({
    bilibili: z.string().optional(),
    youtube: z.string().optional(),
    douyin: z.string().optional(),
  }),
  thumbnail: z.string(),
  tags: z.array(z.string()).default([]),
})


export default defineContentConfig({
  collections: {
    videos: defineCollection({
      type: 'data',
      source: 'video/**/*.yml',
      schema: VideoSchema
    })
  }
})
