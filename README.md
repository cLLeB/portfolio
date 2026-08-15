# Portfolio: Caleb Kyere Boateng

My personal portfolio site. Computer Science student at KNUST, focused on computer networking, security, and programming language design.

Live: https://portfolio.kyere.me/

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts: `npm run build`, `npm run type-check`, `npm run lint`.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion for animation
- next-themes for dark/light mode
- lucide-react and react-icons for icons

## How it's organised

```
src/
├── app/              # layout, page, global CSS
├── components/       # section components (Hero, About, Experience, ...)
│   └── ui/           # Button, LoadingSpinner, image modals
├── context/          # LanguageContext (EN/FR switching)
├── hooks/            # useMobileScrollLock
├── styles/           # design-system.css
├── translations/     # en.json, fr.json (all site copy lives here)
└── utils/            # contactForm.ts
```

Two things worth knowing before editing:

**Copy is not in the components.** Every string comes from `src/translations/en.json` and `fr.json` via the `t()` helper from `LanguageContext`. Change the JSON, not the JSX, and change both files or the French build falls back to keys.

**Some sections have separate desktop and mobile components** rather than one responsive component: `EnhancedHero`/`MobileOptimizedHero`, `Skills`/`TouchOptimizedSkills`, and `DesktopImageModal`/`MobileImageModal`. `page.tsx` picks between them with `hidden md:block` / `md:hidden`, and `ImageModal` picks between the two modals at a 768px media query. If you change one, check its counterpart.

The mobile image modal is portaled to `document.body` and relies on `position: fixed` resolving against the viewport. Do not add a `transform` to a broad selector in `globals.css`. A transform makes an element the containing block for its fixed descendants, which anchors the modal to the document instead of the viewport and pushes it off-screen.

## Deployment

Vercel builds `main` automatically and serves the live site.

`.github/workflows/deploy.yml` also publishes to GitHub Pages on push to `main`. That path sets `GITHUB_ACTIONS=true`, which switches `next.config.js` to `output: 'export'` and applies the `/portfolio` basePath. The site is static there, so anything needing a server won't work on that deployment.

## Contact

- Email: kyereboatengcaleb@gmail.com
- LinkedIn: https://www.linkedin.com/in/caleb-kyere-boateng-6736092b4
- GitHub: https://github.com/cLLeB
