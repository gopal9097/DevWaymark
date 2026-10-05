# Contributing to DevWaymark

Welcome! DevWaymark is built to be **100% extensible and schema-driven**.

All career tracks, visual roadmap stages, milestone topics, curated learning links, best practice guides, and practice quiz questions live in **typed JSON content collections** validated by strict Zod schemas (`src/content.config.ts`).

> **Zero Component Code Required:** Adding a new roadmap, practice quiz, or best practice guide requires **only adding a single JSON file** to the appropriate folder. The platform will automatically generate the pages, search index, filters, and local progress tracking!

---

## Content Architecture Overview

```
src/content/
├── roadmaps/           # Career tracks (Frontend, Backend, DevOps, etc.)
│   ├── frontend.json
│   ├── backend.json
│   └── your-new-track.json
├── best-practices/     # Engineering principles and anti-patterns
│   ├── code-quality.json
│   ├── security.json
│   └── your-new-guide.json
└── quizzes/            # Topic-based multiple choice questions
    ├── frontend-quiz.json
    ├── backend-quiz.json
    └── your-new-quiz.json
```

---

## 1. How to Add a New Roadmap

To introduce a new track (e.g. `Rust Engineering`, `Data Engineering`, or `Game Development`):

1. Create a new file in `src/content/roadmaps/<id>.json` (e.g., `src/content/roadmaps/rust.json`).
2. Follow the required schema:

```json
{
  "id": "rust",
  "title": "Rust Systems Engineering",
  "tagline": "Memory safety without garbage collection, concurrency, and low-level systems",
  "description": "Comprehensive trajectory from ownership and borrowing to unsafe Rust, async runtimes, and WebAssembly.",
  "domain": "Languages",
  "difficulty": "Intermediate",
  "estimatedWeeks": 16,
  "icon": "terminal",
  "badge": "Modern Systems",
  "featured": false,
  "prerequisites": ["Basic C/C++ or general programming literacy"],
  "stages": [
    {
      "id": "rust-stage-1",
      "number": 1,
      "title": "Stage 1: Ownership & Memory Safety",
      "description": "Master the borrow checker, lifetimes, and zero-cost abstractions.",
      "nodes": [
        {
          "id": "rust-ownership",
          "title": "Ownership, Borrowing & Lifetimes",
          "description": "How Rust manages heap memory at compile-time without a runtime garbage collector.",
          "whyItMatters": "Eliminates use-after-free, double-free, and data races before code ever reaches production.",
          "importance": "essential",
          "estimatedHours": 18,
          "resources": [
            {
              "title": "The Rust Programming Language Book (Ch. 4)",
              "url": "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html",
              "type": "docs",
              "free": true
            }
          ],
          "keyTakeaways": [
            "Each value in Rust has an owner.",
            "There can only be one owner at a time.",
            "When the owner goes out of scope, the value is dropped."
          ],
          "interviewTips": "Be prepared to explain why mutable references cannot alias with immutable references."
        }
      ]
    }
  ]
}
```

3. Run `npm run check` or `npm run build` to validate the schema automatically.
4. That's it! Your new track is now immediately searchable in `Cmd+K`, listed on `/roadmaps`, and has its own visual page at `/roadmaps/rust`.

---

## 2. How to Add Practice Quiz Questions

1. Open or create a file in `src/content/quizzes/<track>-quiz.json` (e.g., `src/content/quizzes/rust-quiz.json`).
2. Add question objects according to the schema:

```json
{
  "id": "rust-quiz",
  "title": "Rust Systems Programming Quiz",
  "track": "Rust",
  "description": "Test your understanding of ownership, lifetimes, and safety guarantees.",
  "questions": [
    {
      "id": "rust-q1",
      "question": "Can you have two simultaneous mutable references (&mut T) to the same memory location in safe Rust?",
      "options": [
        "Yes, as long as they are on different threads.",
        "No, safe Rust strictly forbids aliasing mutable references to eliminate data races.",
        "Yes, if using the Box<T> smart pointer.",
        "Only inside an unsafe block."
      ],
      "correctAnswer": 1,
      "explanation": "Rust's fundamental aliasing rule states you can have either one mutable reference or any number of immutable references, but never both simultaneously.",
      "difficulty": "Beginner",
      "topic": "Ownership & Borrowing",
      "relatedRoadmapSlug": "rust"
    }
  ]
}
```

---

## 3. How to Add a Best Practice Guide

1. Create a file in `src/content/best-practices/<id>.json`.
2. Populate the `title`, `area`, `summary`, `readTime`, `level`, `keyPrinciples`, `rules` (with optional `badExample` and `goodExample` code comparisons), and `productionChecklist`.

---

## 4. Local Development & Testing

```bash
# Install dependencies
pnpm install (or npm install)

# Start local dev server
pnpm dev

# Typecheck and validate content collections
pnpm check

# Build production static site
pnpm build
```

---

## Philosophy & Guarantees

- **100% Free Forever:** No paywalls, no sponsored course affiliates.
- **Local-First:** User progress is stored in `localStorage`. Never add dependencies that phone home or track users.
- **Zero Runtime Bloat:** Keep client-side JavaScript minimal; leverage Astro's static generation by default.
