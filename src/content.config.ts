import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const resourceSchema = z.object({
  title: z.string(),
  url: z.string(),
  type: z.enum(['docs', 'article', 'video', 'interactive']),
  free: z.boolean().default(true),
});

const nodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  whyItMatters: z.string(),
  importance: z.enum(['essential', 'recommended', 'optional']).default('essential'),
  estimatedHours: z.number().optional(),
  resources: z.array(resourceSchema),
  keyTakeaways: z.array(z.string()).optional(),
  interviewTips: z.string().optional(),
});

const stageSchema = z.object({
  id: z.string(),
  number: z.number(),
  title: z.string(),
  description: z.string(),
  nodes: z.array(nodeSchema),
});

const roadmaps = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/roadmaps' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    domain: z.enum([
      'Frontend',
      'Backend',
      'DevOps & Cloud',
      'Languages',
      'Architecture',
      'AI & Data',
      'Security & Mobile',
    ]),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    estimatedWeeks: z.number(),
    icon: z.string(),
    badge: z.string().optional(),
    featured: z.boolean().default(false),
    prerequisites: z.array(z.string()).optional(),
    stages: z.array(stageSchema),
  }),
});

const bestPractices = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/best-practices' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    area: z.string(),
    summary: z.string(),
    readTime: z.string(),
    level: z.enum(['Fundamental', 'Intermediate', 'Advanced']),
    icon: z.string(),
    keyPrinciples: z.array(z.string()),
    rules: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        badExample: z
          .object({
            code: z.string(),
            explanation: z.string(),
          })
          .optional(),
        goodExample: z
          .object({
            code: z.string(),
            explanation: z.string(),
          })
          .optional(),
      })
    ),
    productionChecklist: z.array(z.string()),
  }),
});

const quizzes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/quizzes' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    track: z.string(),
    description: z.string(),
    questions: z.array(
      z.object({
        id: z.string(),
        question: z.string(),
        codeSnippet: z.string().optional(),
        options: z.array(z.string()),
        correctAnswer: z.number(),
        explanation: z.string(),
        difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
        topic: z.string(),
        relatedRoadmapSlug: z.string().optional(),
      })
    ),
  }),
});

export const collections = {
  roadmaps,
  'best-practices': bestPractices,
  quizzes,
};
