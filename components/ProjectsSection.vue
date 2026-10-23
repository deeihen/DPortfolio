<template>
  <section id="work" ref="root" class="work wrap">
    <div class="section-head" data-reveal>
      <span class="prompt">&gt;</span><h2>projects</h2>
    </div>

    <div class="work__grid">
      <article v-for="p in projects" :key="p.title" class="panel card">
        <div class="panel__bar"><span>{{ p.kind }}</span><span>{{ p.year }}</span></div>
        <div class="card__body">
          <h3 class="card__title">{{ p.title }}</h3>
          <p class="card__role mono">{{ p.role }}</p>
          <p class="card__sum">{{ p.summary }}</p>
          <ul class="chips mono"><li v-for="t in p.stack" :key="t">{{ t }}</li></ul>
          <p class="card__links mono">
            <a v-for="l in p.links" :key="l.href" class="card__link" :href="l.href" target="_blank" rel="noopener">{{ l.label }} ↗</a>
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { gsap } from 'gsap'

const projects = [
  {
    title: 'RescueLink Taguig',
    kind: 'emergency response platform',
    year: '2026',
    role: 'backend + documentation · team of 4',
    summary: 'Connects Taguig residents with the Command Center of Taguig by live voice, video or chat. Coordinators triage each call, log the incident and dispatch Police, Fire, Medical or DRRMO from one real-time workspace. In production for the city.',
    stack: ['Next.js', 'NestJS', 'Socket.IO', 'PostgreSQL', 'Prisma', 'Docker', 'AWS'],
    links: [
      { label: 'live', href: 'https://rescuelinktaguig.com' },
      { label: 'code', href: 'https://github.com/emergencyadmincenter/rescue-link-taguig' },
    ],
  },
  {
    title: 'Booklat',
    kind: 'AppBuildersPH Hackathon',
    year: '2026',
    role: 'team of 3',
    summary: 'Offline oral-reading assessment for Filipino teachers. On-device speech recognition suggests reading marks in English and Filipino, and learner audio never leaves the device.',
    stack: ['local AI', 'on-device speech recognition'],
    links: [
      { label: 'demo', href: 'https://www.linkedin.com/in/mark-dennis-concha-2ab10a316/recent-activity/all/' },
    ],
  },
  {
    title: '.Js',
    kind: 'free JavaScript course',
    year: '2026',
    role: 'solo build',
    summary: 'JavaScript from "Hello, World!" for complete beginners: 21 short lessons you read, run and check in the browser. No account, no install, and progress stays on your device.',
    stack: ['Next.js', 'React', 'Three.js', 'GSAP'],
    links: [
      { label: 'live', href: 'https://dotjsv2.vercel.app' },
      { label: 'code', href: 'https://github.com/deeihen/dotjs' },
    ],
  },
  {
    title: 'Paddock 101',
    kind: 'interactive F1 guide',
    year: '2026',
    role: 'solo build',
    summary: 'Scroll-driven 3D guide to Formula 1, from beginner to enthusiast. Built around a 3D 2026 F1 car and a simulated timing-tower race.',
    stack: ['Vite', 'Three.js', 'GSAP ScrollTrigger', 'Lenis'],
    links: [
      { label: 'live', href: 'https://paddock101.vercel.app' },
      { label: 'code', href: 'https://github.com/deeihen/Paddock101' },
    ],
  },
]

const root = ref(null)

useMotion((motion) => {
  if (!motion) return
  // cards rise one after another
  gsap.fromTo(root.value.querySelectorAll('.card'), { y: 80, opacity: 0 }, {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
    clearProps: 'transform,opacity', // hand the hover lift back to CSS
    stagger: 0.12,
    scrollTrigger: { trigger: root.value.querySelector('.work__grid'), start: 'top 80%' },
  })
})
</script>

<style scoped>
.work { padding-block: var(--section); }

.work__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gap);
}
.card { display: flex; flex-direction: column; transition: border-color 0.3s var(--ease), transform 0.4s var(--ease); }
.card:hover { border-color: var(--ok); transform: translateY(-4px); }
.card__body { display: flex; flex-direction: column; flex: 1; padding: 1.2rem 0.9rem; }
.card__title { font-size: var(--step-head); font-weight: 500; letter-spacing: -0.03em; line-height: 1; }
.card__role { margin-top: 0.6rem; font-size: 13px; color: var(--muted); }
.card__sum { margin-top: 1rem; }
.card__links { display: flex; gap: 1.5rem; margin-top: auto; padding-top: 1.2rem; }
.card__link { display: inline-flex; align-items: center; min-height: 40px; color: var(--ok); font-size: 14px; }
.card__link:hover { text-decoration: underline; text-underline-offset: 0.2em; }

.chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1rem; list-style: none; font-size: 12px; color: var(--muted); }
.chips li { padding: 0.15rem 0.5rem; border: 1px solid var(--line); }

@media (max-width: 1000px) {
  .work__grid { grid-template-columns: minmax(0, 1fr); }
}
</style>
