import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const VideoSchema = z.object({
    title: z.string(),
    description: z.string(),
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
    order: z.number().default(0),
})

const NewsSchema = z.object({
    title: z.string(),
    date: z.string(),
})

export default defineContentConfig({
    collections: {
        videos: defineCollection({
            type: 'page',
            source: 'videos/**/*.md',
            schema: VideoSchema,
        }),
        news: defineCollection({
            type: 'page',
            source: 'news/**/*.md',
            schema: NewsSchema,
        }),
    },
})
