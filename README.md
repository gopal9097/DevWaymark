<p align="center">
  <img src="public/logo.svg" alt="DevWaymark Logo" width="128" height="128">
</p>

<h1 align="center">DevWaymark</h1>

<p align="center">
  <strong>Free, open-source career roadmaps for software engineers. Visual stage-by-stage learning paths, production insights, and persistent in-browser progress. No backend, no dependencies, works offline.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-5.18-BC52EE?logo=astro&logoColor=white" alt="Astro">
  <img src="https://img.shields.io/badge/TypeScript-5.8_Strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript Strict">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Storage-Local--First-7B9669" alt="Local-First">
  <img src="https://img.shields.io/badge/Access-100%25_Free_Forever-404E3B" alt="Free Forever">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="MIT License">
</p>

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [How It Works](#how-it-works)
4. [Architecture & Content Model](#architecture--content-model)
5. [Storage & Privacy Model](#storage--privacy-model)
6. [Design System & Palette](#design-system--palette)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [Project Structure](#project-structure)
9. [Running Locally](#running-locally)
10. [Deploying to GitHub Pages](#deploying-to-github-pages)
11. [Adding New Content](#adding-new-content)
12. [Browser Support](#browser-support)
13. [Author & Team](#author--team)
14. [How This Project Was Built](#how-this-project-was-built)
15. [Roadmap](#roadmap)
16. [License](#license)

---

## Overview

Learning software engineering in today's ecosystem is overwhelming. Learners are caught between shallow tutorial hell, scattered documentation, and expensive paywalled bootcamps that fail to prepare them for production systems.

**DevWaymark** provides open, visual learning roadmaps across 12 core engineering disciplines. Instead of dump-lists of buzzwords, every track organizes technologies into progressive stages. Each milestone provides:
- **Core Explanation:** Concise, practical conceptual breakdown.
- **Why It Matters in Production:** Real-world incident prevention, latency trade-offs, scalability bottlenecks, and engineering realities.
- **Curated Free Links:** Official documentation, benchmark guides, and free community deep-dive videos.
- **Persistent Progress:** Check off milestones and quizzes directly in your browser without logging in.

Everything runs on a static **Astro 5** island architecture. No backend servers, no user accounts, no tracking telemetry, and zero cost to host.

---

## Features

### Career Roadmaps (12 Full Tracks)

| Track | What it covers |
| :--- | :--- |
| **Frontend Engineering** | Semantic HTML & A11y, Modern CSS, DOM rendering lifecycle, React 19, state architecture, Web Performance & Core Web Vitals |
| **Backend Engineering** | HTTP/REST & gRPC, SQL schemas & normalization, caching with Redis, auth (JWT/OAuth2), async message queues, worker architectures |
| **DevOps & Site Reliability** | Linux internals & systemd, Docker containerization, Kubernetes orchestration, Infrastructure as Code (Terraform), OpenTelemetry observability |
| **JavaScript Deep Dive** | Execution contexts & lexical scope, event loop & microtasks, prototypal inheritance, memory profiling, TypeScript strict generics |
| **React Ecosystem** | Fiber reconciler & hooks internals, Concurrent Mode, React Server Components (RSC), Next.js App Router, state managers, bundle profiling |
| **Python Engineering** | Data structures & protocols, generators/iterators, asyncio concurrency, type hinting, FastAPI, Pydantic, pytest test design |
| **System Design** | Scalability fundamentals, CAP theorem, database partitioning/sharding, caching topologies, distributed consensus, event sourcing |
| **AI & LLM Applications** | Vector embeddings, vector databases (Chroma/Pinecone), RAG pipelines, prompt architecture, autonomous agents, evaluations |
| **Cloud Architecture** | Core compute primitives, VPC networking & subnets, IAM least privilege, serverless microservices, multi-region disaster recovery |
| **Databases & Data Systems** | Storage engines (B-Tree vs LSM), ACID guarantees & isolation levels, replication topologies, query planner optimization, indexing |
| **Mobile Development** | React Native / Flutter architecture, native device bridge, mobile offline-first sync, deep linking, App Store / Play Store release |
| **Cybersecurity** | OWASP Top 10 web vulnerabilities, cryptography fundamentals, zero-trust network models, secure CI/CD supply chain, threat modeling |

### Platform Capabilities

- **Interactive Milestone Drawer:** Clicking any node slides open an in-depth reference sheet with production rationales, pitfalls, and curated resources.
- **60-Second "Where Do I Start?" Guide:** An interactive triage questionnaire that routes beginners, switchers, and seniors to their ideal roadmap based on goals and experience.
- **Production Best Practices Library:** Practical guides covering clean code, security hardening, performance tuning, Git workflows, testing strategies, and API architecture with side-by-side good vs. bad examples.
- **Topic-Based Practice Quizzes:** Multi-question technical quizzes per discipline with immediate feedback, detailed explanations, and local score retention.
- **Instant Search (`⌘K` / `Ctrl+K`):** Global client-side fuzzy search across all roadmaps, stages, and milestones.
- **Earthy Human Design System:** Refined palette using sage green, deep forest olive, and clean neutrals with full light & dark mode support.

---

## How It Works

```
 Visitor Arrives                          Browsing & Learning
 ───────────────                          ───────────────────
 Instant static load from CDN             Explore visual stage map
        │                                          │
        ▼                                          ▼
 System theme resolved inline             Click any milestone node
 (no light/dark flash)                             │
        │                                          ▼
        ▼                                 Slide-over drawer opens:
 Explore tracks or search (⌘K)            • Concept breakdown
        │                                 • Production trade-offs
        ▼                                 • Curated links & docs
 Mark milestone as completed                       │
        │                                          ▼
        └───────────────────────────────> State saved to localStorage
                                          (No accounts • 100% private)
```

Learner progress is completely decentralized: your checkmarks, roadmap completion percentages, and quiz scores stay inside your browser's private local storage.

---

## Architecture & Content Model

DevWaymark is architected with a strict separation between presentation logic and content definitions:

```
src/content/
├── roadmaps/           # Typed JSON collections describing tracks, stages & nodes
├── best-practices/     # Engineering guides with good vs bad code comparisons
├── quizzes/            # Multiple-choice quizzes with explanations
└── config.ts           # Build-time Zod schemas guaranteeing contract validity
```

### Schema Validation
Every piece of content is strictly typed and validated at build time using **Zod**. If an invalid URL, missing node ID, or broken schema is committed, `pnpm check` and `pnpm build` fail immediately, preventing broken production deployments.

### Zero Runtime Overhead
All roadmaps and guide pages are pre-rendered into static HTML at build time. Client JavaScript is only loaded for interactive components (the search modal, progress storage, quiz evaluators, and mobile drawer).

---

## Storage & Privacy Model

DevWaymark requires **zero** accounts, collects **zero** telemetry, and contacts **zero** remote APIs:

| Key | Storage | Value Format | Purpose |
| :--- | :--- | :--- | :--- |
| `devwaymark_progress` | `localStorage` | `Record<string, boolean>` | Map of completed topic IDs (`{ "frontend-html-semantics": true }`) |
| `devwaymark_theme` | `localStorage` | `'light' \| 'dark'` | User theme preference override |
| `devwaymark_quiz_*` | `localStorage` | `Record<string, number>` | Last quiz score and completed question record |

- **No Cookies:** No session tracking, advertising cookies, or fingerprinting.
- **No Third-Party Analytics:** No Google Analytics, Segment, or tracking pixels.
- **Zero Network Ingestion:** All progress computations run entirely on the client device.

---

## Design System & Palette

DevWaymark replaces generic bright AI gradients with a grounded, organic palette tailored for high readability during prolonged study:

| Role | Color Hex | Color Name | Application |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | `#7B9669` | **Sage Green** | Primary action buttons, active tags, completion checkboxes |
| **Deep Anchor** | `#404E3B` | **Deep Forest Olive** | Dark mode backgrounds, dark card containers, header accents |
| **Secondary Accent** | `#6C8480` | **Slate Sage** | Secondary category badges, window chrome, subtle borders |
| **Light Tint** | `#BAC8B1` | **Pale Mint** | Dark mode text accents, soft card highlights, success states |
| **Neutral Base** | `#E6E6E6` | **Clean Off-White** | Light mode surfaces, high-contrast text containers |

---

## Keyboard Shortcuts

| Key | Context | Action |
| :--- | :--- | :--- |
| `⌘K` or `Ctrl+K` | Anywhere | Open global search modal |
| `Esc` | Anywhere | Close search modal or milestone slide drawer |
| `Tab` / `Shift+Tab` | Modals & Drawer | Focus trapped accessible navigation |
| `Space` / `Enter` | Roadmap Node | Open milestone drawer or toggle completion |

---

## Project Structure

```
├── astro.config.mjs            # Astro 5 configuration with Tailwind v4 & sitemap
├── tsconfig.json               # TypeScript strict configuration
├── package.json                # Project dependencies and run scripts
├── README.md                   # Repository documentation
├── CONTRIBUTING.md             # Guide for adding roadmaps and questions
├── LICENSE                     # MIT license
├── public/
│   ├── logo.svg                # Vector DevWaymark brand icon (< ◇ >)
│   ├── favicon.svg             # Browser tab icon
│   └── images/                 # Preview graphics and social cards
└── src/
    ├── content/
    │   ├── config.ts           # Zod content collection schemas
    │   ├── roadmaps/           # 12 roadmaps (frontend, backend, devops, etc.)
    │   ├── best-practices/     # Guides (clean code, security, git, testing)
    │   └── quizzes/            # Technical practice question banks
    ├── components/
    │   ├── Header.astro        # Sticky navigation with theme toggle & search button
    │   ├── Footer.astro        # Clean footer with site map and license details
    │   ├── RoadmapCard.astro   # Responsive grid card for roadmap items
    │   ├── RoadmapFlow.astro   # Interactive stage-by-stage node visualizer
    │   ├── SearchModal.astro   # Client-side ⌘K fuzzy search dialog
    │   └── TopicDrawer.astro   # Slide-out drawer with tabs and mark-complete toggle
    ├── layouts/
    │   └── Layout.astro        # Base layout with FOUT-free theme script & SEO metadata
    ├── pages/
    │   ├── index.astro         # Clean landing page
    │   ├── start.astro         # "Where Do I Start?" 60-second guided quiz
    │   ├── roadmaps/           # Searchable roadmaps index & dynamic [slug].astro routes
    │   ├── best-practices/     # Best practices index & detail guides
    │   └── practice/           # Quiz selection & interactive quiz runners
    └── styles/
        └── global.css          # Tailwind CSS v4 design tokens and theme variables
```

---

## Running Locally

DevWaymark requires Node.js 18+ and pnpm (or npm / yarn).

```bash
# 1. Clone the repository
git clone https://github.com/gopal9097/DevWaymark.git
cd DevWaymark

# 2. Install dependencies
pnpm install

# 3. Start local development server
pnpm dev
```

Then open `http://localhost:4321` in your browser.

### Available Scripts

| Command | Purpose |
| :--- | :--- |
| `pnpm dev` | Starts local Astro development server at `localhost:4321` with hot-module reload |
| `pnpm build` | Type-checks and compiles static production build into the `dist/` folder |
| `pnpm preview` | Serves the production build locally to verify deployment readiness |
| `pnpm check` | Runs Astro & TypeScript diagnostic check on all components and schemas |

---

## Deploying to GitHub Pages

Because DevWaymark compiles to pure static HTML and assets with zero server dependencies, it deploys to GitHub Pages in minutes for $0:

1. Push the repository to GitHub:
   ```bash
   git remote add origin https://github.com/gopal9097/DevWaymark.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. GitHub will automatically detect the Astro workflow and deploy your site to `https://<username>.github.io/<repo>/`.

---

## Adding New Content

DevWaymark was engineered so that anyone can contribute new roadmaps, guides, or quizzes **without writing a single line of component code**.

### Adding a New Roadmap
Create a new file `src/content/roadmaps/<slug>.json`:
```json
{
  "id": "rust-engineering",
  "title": "Rust Systems Engineering",
  "description": "Master memory safety, ownership, borrow checker, and concurrent systems in Rust.",
  "category": "Backend",
  "difficulty": "Advanced",
  "estimatedMonths": 4,
  "stages": [
    {
      "id": "memory-safety",
      "title": "Ownership & Borrowing",
      "description": "How Rust eliminates data races without a garbage collector.",
      "nodes": [
        {
          "id": "rust-ownership",
          "title": "Ownership Invariant",
          "importance": "Core",
          "summary": "Every value in Rust has an owner; only one owner exists at a time.",
          "whyItMatters": "Eliminates dangling pointers and double-free vulnerabilities at compile time.",
          "resources": [
            {
              "title": "The Rust Book: Ownership",
              "url": "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html",
              "type": "Documentation"
            }
          ]
        }
      ]
    }
  ]
}
```

Run `pnpm check` to validate that the file matches the schema, and the roadmap will immediately appear on the site!

---

## Browser Support

DevWaymark works on all modern desktop and mobile browsers:
- Google Chrome & Chromium browsers (v90+)
- Mozilla Firefox (v88+)
- Apple Safari & iOS Safari (v15+)
- Microsoft Edge (v90+)

---

## Author & Team

- **Project Lead & Vision:** [Gopal Kumar Singh](https://github.com/gopal9097) (`@gopal9097`)
- **Core Collaborators & Contributors:**
  - **Ankit Kumar Mishra**
  - **Ankul Kumar**
  - **Nitish Kumar**

### Primary Contributions
- **Gopal Kumar Singh:** Project vision, system architecture, base layouts & UI components, Tailwind CSS v4 design system, dynamic routing engine, and local-first progress storage.
- **Ankit Kumar Mishra:** Core web & systems engineering tracks (Frontend, Backend, DevOps, System Design) and interactive practice quizzes.
- **Ankul Kumar:** Cloud infrastructure, Cybersecurity, Databases, and Production Best Practices guidelines.
- **Nitish Kumar:** Language deep-dives (JavaScript, React, Python), Mobile development, and the interactive "Where Do I Start?" 60-second triage guide.

---

## How This Project Was Built

- **Idea, Feature Set & Project Direction:** Gopal Kumar Singh ([@gopal9097](https://github.com/gopal9097)).
- **Collaborative Team Effort:** Built together with my 3 friends (**Ankit Kumar Mishra**, **Ankul Kumar**, and **Nitish Kumar**). I came up with the idea and overall concept, and our team distributed different parts and tracks among ourselves to build out the platform collaboratively.
- **Brand & Logo Design:** The brand concept and `< ◇ >` vector logo were designed with Google Antigravity.
- **AI Assistance & Implementation:**
  During development, whenever we encountered roadblocks or needed to clarify complex architectural patterns, TypeScript types, or Zod collection configurations, we used AI assistants for guidance. We also used AI to refine and format our code and explanations so they are clean, well-structured, and easy for any learner or developer to understand. Every component, schema definition, and resource was reviewed, tested, and integrated by our team.

**Why We Are Completely Transparent About This:**  
We are stating this openly and upfront so that there is complete transparency and no one can claim or blame us later that this project was secretly generated by AI. We believe modern AI tools are valuable for learning and accelerating development, but the vision, division of labor, manual testing, code review, and final implementation were driven by us.

---

## Roadmap

- [ ] Export and import learner progress via encrypted JSON file
- [ ] Visual dependency connector lines between roadmap stages
- [ ] Interactive terminal playground for command-line milestones
- [ ] Community roadmap submission guidelines via GitHub PR templates
- [ ] Offline PWA (Progressive Web App) caching support

---

## License

This project is licensed under the [MIT License](LICENSE).
