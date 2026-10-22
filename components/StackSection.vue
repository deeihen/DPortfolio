<template>
  <section id="stack" ref="root" class="stack">
    <div class="wrap">
      <div class="section-head" data-reveal>
        <span class="prompt">&gt;</span><h2>stack</h2>
      </div>
    </div>

    <p ref="band" class="stack__band mono" aria-hidden="true">
      <span v-for="t in all" :key="t.n">{{ t.n }}<span class="stack__sep">/</span></span>
    </p>

    <div class="stack__grid wrap">
      <div v-for="g in groups" :key="g.key" class="panel stack__group" :class="g.key" :style="{ '--tone': g.tone }">
        <div class="panel__bar"><span>~/stack/{{ g.key }}</span><span>{{ g.tools.length }} tools</span></div>
        <h3 class="stack__name">{{ g.name }}</h3>
        <ul class="stack__tiles">
          <li v-for="t in g.tools" :key="t.n" class="tile">
            <span class="tile__no mono">{{ String(t.no).padStart(2, '0') }}</span>
            <span class="tile__icon" :class="{ zoom: t.i === 'nmap.png' }" :style="{ '--icon': `url(/icons/${t.i})` }" aria-hidden="true" />
            <span class="tile__name">{{ t.n }}</span>
            <span class="tile__desc">{{ t.d }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from 'gsap'

// grid spans (12 cols): security 7 + os 5 | languages 7 + web 5 | ai 12, so every row is full
const groups = [
  {
    key: 'security', name: 'Security tools', tone: 'var(--high)', tools: [
      { i: 'burp.svg', n: 'Burp Suite', d: 'Intercept and test web apps' },
      { i: 'nmap.png', n: 'Nmap', d: 'Host discovery, port scans' },
      { i: 'wireshark.svg', n: 'Wireshark', d: 'Packet capture and analysis' },
      { i: 'cyberchef.svg', n: 'CyberChef', d: 'Decode, decrypt, transform' },
    ],
  },
  {
    key: 'os', name: 'Operating systems', tone: 'var(--ok)', tools: [
      { i: 'kali.svg', n: 'Kali Linux', d: 'Offensive security distro' },
      { i: 'parrot.svg', n: 'Parrot OS', d: 'Security and privacy distro' },
      { i: 'arch.svg', n: 'Arch Linux', d: 'Minimal, rolling release' },
    ],
  },
  {
    key: 'languages', name: 'Languages and data', tone: 'var(--med)', tools: [
      { i: 'python.svg', n: 'Python', d: 'Scripts and automation' },
      { i: 'java.svg', n: 'Java', d: 'Object-oriented apps' },
      { i: 'csharp.svg', n: 'C#', d: 'ASP.NET Core APIs' },
      { i: 'mysql.svg', n: 'MySQL', d: 'Relational databases' },
    ],
  },
  {
    key: 'web', name: 'Web', tone: 'var(--info)', tools: [
      { i: 'react.svg', n: 'React', d: 'Component UIs' },
      { i: 'nextjs.svg', n: 'Next.js', d: 'Full-stack React' },
    ],
  },
  {
    key: 'ai', name: 'AI tools', tone: 'var(--ai)', tools: [
      { i: 'claudecode.svg', n: 'Claude Code', d: 'Agentic coding in the terminal' },
      { i: 'codex.svg', n: 'Codex', d: "OpenAI's coding agent" },
      { i: 'antigravity.svg', n: 'Antigravity', d: 'Agent-first IDE' },
      { i: 'devin.svg', n: 'Devin', d: 'Autonomous software engineer' },
    ],
  },
]
let no = 0
for (const g of groups) for (const t of g.tools) t.no = ++no
const all = groups.flatMap(g => g.tools)

const root = ref(null)
const band = ref(null)

useMotion((motion) => {
  if (!motion) return
  // the giant tool-name band slides sideways as the section scrolls past
  gsap.fromTo(band.value, { xPercent: 0 }, {
    xPercent: -35,
    ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true },
  })
  // each group's tiles flip up into place, one after another
  root.value.querySelectorAll('.stack__group').forEach((g) => {
    // explicit end values: a re-run must never treat a half-flipped tile as the resting state
    gsap.fromTo(g.querySelectorAll('.tile'), { rotateX: -75, y: 30, opacity: 0, transformOrigin: '50% 100%' }, {
      rotateX: 0,
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: g, start: 'top 80%' },
    })
  })
})
</script>

<style scoped>
.stack { padding-block: var(--section); overflow: clip; }

.stack__band {
  display: flex;
  width: max-content;
  margin-bottom: clamp(32px, 5vw, 72px);
  font-size: clamp(3rem, 9vw, 8.5rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 1;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1px var(--line);
}
.stack__sep { margin-inline: 0.3em; color: var(--ok); -webkit-text-stroke: 0; opacity: 0.5; }

.stack__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-flow: dense;
  gap: var(--gap);
}
.stack__group { display: flex; flex-direction: column; }
.security, .languages { grid-column: span 7; }
.os, .web { grid-column: span 5; }
.ai { grid-column: 1 / -1; }

.stack__name { padding: 1rem 0.9rem 0; font-size: var(--step-lead); font-weight: 500; letter-spacing: -0.02em; }
.stack__name::before { content: ''; display: inline-block; width: 0.5em; height: 0.5em; margin-right: 0.5em; background: var(--tone); vertical-align: 0.1em; }

.stack__tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1px;
  margin: 1rem 0.9rem 0.9rem;
  background: var(--line);
  border: 1px solid var(--line);
  list-style: none;
  perspective: 800px;
  flex: 1;
}
.ai .stack__tiles { grid-template-columns: repeat(4, minmax(0, 1fr)); }

.tile {
  position: relative;
  display: grid;
  align-content: start;
  gap: 0.2rem;
  min-height: 150px;
  padding: 0.8rem;
  background: var(--panel);
  transition: background-color 0.3s var(--ease);
}
.tile:hover { background: var(--panel-2); }
.tile__no { position: absolute; top: 0.7rem; right: 0.8rem; font-size: 11px; color: var(--muted); }
/* logos are used as masks so every icon takes its group's colour */
.tile__icon {
  width: 2.6rem;
  height: 2.6rem;
  background: var(--tone);
  -webkit-mask: var(--icon) center / contain no-repeat;
  mask: var(--icon) center / contain no-repeat;
  transition: filter 0.3s var(--ease);
}
/* the nmap logo is a shaded raster eye with a wordmark: zoom on the eye and mask by brightness so its detail survives */
.tile__icon.zoom { -webkit-mask-size: 165%; mask-size: 165%; -webkit-mask-position: 50% 22%; mask-position: 50% 22%; mask-mode: luminance; }
.tile:hover .tile__icon { filter: drop-shadow(0 0 10px var(--tone)); }
.tile__name { margin-top: auto; padding-top: 0.6rem; font-weight: 500; }
.tile__desc { font-size: 13px; color: var(--muted); line-height: 1.35; }

@media (max-width: 900px) {
  .security, .languages, .os, .web { grid-column: 1 / -1; }
  .ai .stack__tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 480px) {
  .stack__tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .tile { min-height: 132px; }
}
</style>
