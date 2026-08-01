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
    }).optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().min(1).optional(),
    episode: z.number().int().nonnegative().optional(),
    repository: z.string().url().optional(), // 源码地址
    order: z.number().default(0),
})

const NewsSchema = z.object({
    title: z.string(),
    date: z.string(),
    source: z.string().url().optional(), // 新闻来源链接
})

const CreatorSchema = z.object({
    name: z.string(),
    avatar: z.string(),
    href: z.string(),
    role: z.string(),
    order: z.number().int().nonnegative().default(0),
})

const WorkSchema = z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    type: z.string(),
    order: z.number().int().nonnegative().default(0),
    tags: z.array(z.string()).default([]),
    website: z.string().url().optional(),
    repository: z.string().url().optional(),
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
        creators: defineCollection({
            type: 'data',
            source: 'creators/**/*.yml',
            schema: CreatorSchema,
        }),
        works: defineCollection({
            type: 'page',
            source: 'works/**/*.md',
            schema: WorkSchema,
        }),
    },
})
