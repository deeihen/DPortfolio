# 🎨 My Portfolio — Nuxt 3

A bold, colorful personal portfolio built with **Vue 3 + Nuxt 3**, designed for performance and style.

## ✨ Features
- Nuxt 3 + Vue 3 Composition API
- Google Fonts (Bebas Neue, Syne, Space Mono)
- Custom animated cursor
- Smooth page transitions
- Sections: Hero, About, Skills, Projects, Contact
- Vercel-ready deployment

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate
```

## 📦 Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Vercel auto-detects Nuxt — click **Deploy**
5. Done! 🎉

## 🎨 Customization

Edit the following to make it yours:
- `components/HeroSection.vue` — Your name, title, tagline
- `components/AboutSection.vue` — Bio, photo, meta info
- `components/SkillsSection.vue` — Your actual skills
- `components/ProjectsSection.vue` — Your real projects
- `components/ContactSection.vue` — Your social links & email
- `nuxt.config.ts` — Site title and meta description
- `assets/css/main.css` — Colors (CSS variables at the top)

## 🗂 Project Structure
```
portfolio/
├── assets/css/       # Global styles
├── components/       # Vue components (each section)
├── layouts/          # Default layout (nav + cursor)
├── pages/            # Routes (index.vue = home)
├── public/           # Static files (favicon, resume.pdf)
├── nuxt.config.ts    # Nuxt configuration
└── vercel.json       # Vercel deployment config
```
