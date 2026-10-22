<template>
  <section id="evidence" class="ev wrap">
    <div class="section-head" data-reveal>
      <span class="prompt">&gt;</span><h2>achievements</h2>
    </div>

    <div class="ev__grid">
      <aside class="panel ev__read" aria-hidden="true">
        <div class="panel__bar"><span>case summary</span><span>{{ active + 1 }} / {{ items.length }}</span></div>
        <p class="ev__stat mono">{{ shown }}<span class="muted">{{ items[active].stat.suffix }}</span></p>
        <p class="ev__label">{{ items[active].stat.label }}</p>
      </aside>

      <div ref="steps" class="ev__steps">
        <span class="ev__rail"><span ref="fill" class="ev__fill" /></span>
        <ol>
          <li v-for="(it, i) in items" :key="it.title" class="ev__item" :class="{ on: i === active }">
            <span class="ev__dot" aria-hidden="true" />
            <p class="ev__meta mono"><span class="muted">{{ it.when }}</span><span class="chip" :class="it.status">{{ it.status }}</span></p>
            <h3 class="ev__title">{{ it.title }}</h3>
            <p class="ev__by mono muted">{{ it.by }}</p>
            <p class="ev__body">{{ it.body }}</p>
            <p v-if="it.result" class="ev__result mono">{{ it.result }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const items = [
  {
    when: 'Aug 2026',
    status: 'verified',
    title: 'First three certifications',
    by: 'Cisco · IBM SkillsBuild',
    body: 'Introduction to Cybersecurity (Cisco), Cybersecurity Fundamentals and Working in a Digital World (IBM SkillsBuild).',
    result: '3 credentials, all verifiable',
    stat: { value: 3, suffix: ' verified', label: 'certifications earned from Cisco and IBM SkillsBuild' },
  },
  {
    when: '2026',
    status: 'live',
    title: 'RescueLink Taguig goes live',
    by: 'Command Center of Taguig · team of 4',
    body: 'An emergency response platform now in production for the Command Center of Taguig. I worked on the backend and the documentation.',
    result: 'In production at rescuelinktaguig.com',
    stat: { value: 4, suffix: ' agencies', label: 'Police, Fire, Medical and DRRMO, coordinated from one workspace' },
  },
  {
    when: '2026',
    status: 'pitched',
    title: 'AppBuildersPH Hackathon: Local AI',
    by: 'team of 3',
    body: 'Built and pitched Booklat, an offline reading-assessment app for Filipino teachers.',
    stat: { value: 3, suffix: ' of us', label: 'built and pitched Booklat' },
  },
  {
    when: 'next',
    status: 'target',
    title: 'ISC2 CC, then CompTIA Security+',
    by: 'roadmap to tier 1',
    body: 'The two entry-level credentials that tier 1 SOC job posts ask for most often.',
    result: 'Goal: tier 1 SOC analyst',
    stat: { value: 2, suffix: ' next', label: 'certifications on the roadmap to the SOC' },
  },
]

const active = ref(0)
const shown = ref(items[0].stat.value)
const steps = ref(null)
const fill = ref(null)

useMotion((motion) => {
  const counter = { v: shown.value }
  const lis = steps.value.querySelectorAll('.ev__item')

  // the item crossing the middle of the screen drives the readout
  lis.forEach((li, i) => {
    ScrollTrigger.create({
      trigger: li,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle(self) {
        if (!self.isActive) return
        active.value = i
        const to = items[i].stat.value
        if (!motion) { shown.value = to; return }
        gsap.to(counter, { v: to, duration: 0.8, ease: 'power3.out', overwrite: true, onUpdate: () => { shown.value = Math.round(counter.v) } })
      },
    })
  })

  if (!motion) return

  gsap.fromTo(fill.value, { scaleY: 0 }, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: steps.value, start: 'top 55%', end: 'bottom 55%', scrub: true },
  })

  lis.forEach((li) => {
    gsap.fromTo(li, { x: 48, opacity: 0 }, {
      x: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: li, start: 'top 85%' },
    })
  })
})
</script>

<style scoped>
/* items slide in from 48px right; keep that offset from widening the page */
.ev { padding-block: var(--section); overflow-x: clip; }
.ev__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: var(--gap) calc(var(--gap) * 3);
  align-items: start;
}

.ev__read { position: sticky; top: 90px; }
.ev__stat {
  padding: 1.2rem 0.9rem 0;
  font-size: clamp(3.5rem, 9vw, 9rem);
  font-weight: 700;
  letter-spacing: -0.07em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.ev__stat .muted { font-size: 0.35em; letter-spacing: -0.02em; }
.ev__label { padding: 0.6rem 0.9rem 1.1rem; color: var(--muted); max-width: 30ch; }

.ev__steps { position: relative; padding-left: 2rem; }
.ev__rail { position: absolute; left: 5px; top: 0.6rem; bottom: 0.6rem; width: 1px; background: var(--line); }
.ev__fill { position: absolute; inset: 0; background: var(--ok); transform-origin: 50% 0; }
ol { list-style: none; display: grid; gap: clamp(48px, 9vh, 112px); }

.ev__item { position: relative; transition: opacity 0.4s var(--ease); }
.ev__dot {
  position: absolute;
  left: calc(-2rem + 1px);
  top: 0.35rem;
  width: 9px;
  height: 9px;
  background: var(--bg);
  border: 1px solid var(--muted);
  transition: background-color 0.3s, border-color 0.3s;
}
.ev__item.on .ev__dot { background: var(--ok); border-color: var(--ok); }
.ev__meta { display: flex; align-items: center; gap: 0.8rem; font-size: 13px; }
.ev__title { margin-top: 0.8rem; font-size: var(--step-head); font-weight: 500; letter-spacing: -0.03em; line-height: 1.05; }
.ev__by { margin-top: 0.4rem; font-size: 13px; }
.ev__body { margin-top: 1rem; max-width: 52ch; }
.ev__result {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.35rem 0.6rem;
  border-left: 2px solid var(--ok);
  background: var(--panel);
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .ev__grid { grid-template-columns: minmax(0, 1fr); }
  .ev__read { top: 58px; z-index: 2; }
  .ev__stat { font-size: 3.2rem; padding-top: 0.7rem; }
  .ev__label { padding-bottom: 0.7rem; }
}
</style>
