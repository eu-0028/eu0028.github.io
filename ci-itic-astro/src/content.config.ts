import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Регионы для фильтра проектов
export const REGIONS = {
  ca: 'Центральная Азия',
  cn: 'Китай',
  gulf: 'Страны Залива',
  in: 'Индия',
  ru: 'Россия',
} as const;
const region = z.enum(['ca', 'cn', 'gulf', 'in', 'ru']);

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    cover: z.string().optional(),        // путь вида /uploads/news/...
    coverAlt: z.string().optional(),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    where: z.string(),                   // «Узбекистан, Ташкент»
    regions: z.array(region).min(1),
    summary: z.string(),                 // что сделано, одна-две фразы
    result: z.string().optional(),       // результат одной фразой
    role: z.string().optional(),         // роль CI ITIC, если нужно указать явно
    featured: z.boolean().default(false),
    order: z.number().default(100),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Публикации в СМИ: раздел появляется в меню, когда есть хотя бы одна запись
const media = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/media' }),
  schema: z.object({
    title: z.string(),
    outlet: z.string(),                  // издание
    date: z.coerce.date(),
    url: z.string().url(),
    quote: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    text: z.string(),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { news, projects, media, events };
