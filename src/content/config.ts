import { defineCollection, z } from 'astro:content';

const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    scholar: z.string().url(),
    github: z.string().url(),
    email: z.string().email(),
    cv: z.string(),
    researchgate: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    orcid: z.string().url().optional(),
    uni: z.string().url().optional()
  })
});

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string()
  })
});

const contact = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    email: z.string().email(),
    github: z.string().url().optional(),
    scholar: z.string().url().optional(),
    researchgate: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    orcid: z.string().url().optional(),
    uni: z.string().url().optional()
  })
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    venue: z.string(),
    authors: z.string(),
    url: z.string().url(),
    order: z.number().default(0),
    website: z.string().url().optional(),
    repo: z.string().url().optional()
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().default(0)
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string()
  })
});

const projectsPage = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string()
  })
});

export const collections = { about, research, contact, publications, projects, blog, 'projects-page': projectsPage };