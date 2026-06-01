# Clickwrap Templates — ClickTerm

A responsive **Clickwrap Templates** dashboard built with Next.js 15, Tailwind CSS v4 and Framer Motion.

## Stack

- Next.js 15 (App Router, React 19, TypeScript)
- Tailwind CSS v4
- Framer Motion
- lucide-react icons

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Responsive

- **Desktop (≥1024px):** fixed sidebar + full table.
- **< 1024px:** sidebar collapses into a slide-in drawer (open via the ☰ button in the header); the toolbar wraps and the table scrolls horizontally.

## Deploy to Vercel

1. Push to a Git repo:

   ```bash
   git init
   git add .
   git commit -m "Clickwrap Templates dashboard"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Vercel auto-detects Next.js — no config needed. Click **Deploy**.

   Or via CLI:

   ```bash
   npm i -g vercel
   vercel
   ```

## Structure

```
src/
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  └─ page.tsx          # the dashboard page (responsive shell)
├─ components/
│  ├─ Sidebar.tsx       # nav + teams + invite card (collapsible / drawer)
│  └─ TemplatesTable.tsx
└─ lib/
   └─ data.ts           # template rows + tag colors
public/logos/Frame.svg  # ClickTerm logo
```
