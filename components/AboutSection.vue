<template>
  <section id="about" class="about wrap">
    <div class="section-head" data-reveal>
      <span class="prompt">&gt;</span><h2>whoami</h2>
    </div>

    <div class="about__grid">
      <div v-tilt class="panel about__card" data-reveal style="--i: 1">
        <div class="panel__bar"><span>analyst profile</span><span class="ok">● online</span></div>
        <dl class="about__facts mono">
          <div v-for="f in facts" :key="f.k"><dt>{{ f.k }}</dt><dd>{{ f.v }}</dd></div>
        </dl>
      </div>

      <div class="about__text">
        <p ref="lead"><span v-for="(w, i) in words" :key="i">{{ w + ' ' }}</span></p>
        <p data-reveal style="--i: 3">
          I've earned my first certifications from Cisco and IBM SkillsBuild, I study how attackers
          move so I can recognise their footprints, and I build things with my team, like
          RescueLink Taguig for the city's Command Center. The code lives on
          <a class="link" href="https://github.com/deeihen" target="_blank" rel="noopener">GitHub</a>
          and I post progress on
          <a class="link" href="https://linkedin.com/in/mark-dennis-concha-2ab10a316/" target="_blank" rel="noopener">LinkedIn</a>.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from 'gsap'

const words = (
  "I'm a computer science student at Taguig City University, training for the security " +
  'operations centre: the room where analysts watch the alert queue, read logs and decide ' +
  'in minutes whether something is an attack.'
).split(' ')

const lead = ref(null)
// words light up one by one as the paragraph scrolls through the viewport
useMotion((motion) => {
  if (!motion) return
  gsap.fromTo(lead.value.children, { opacity: 0.15 }, {
    opacity: 1,
    stagger: 0.1,
    ease: 'none',
    scrollTrigger: { trigger: lead.value, start: 'top 80%', end: 'bottom 40%', scrub: true },
  })
})

const facts = [
  { k: 'name', v: 'Mark Dennis Concha' },
  { k: 'handle', v: 'deeihen' },
  { k: 'school', v: 'BS CS, Taguig City University' },
  { k: 'location', v: 'Taguig City, Metro Manila' },
  { k: 'target', v: 'SOC analyst, tier 1' },
  { k: 'focus', v: 'blue team, detection' },
]
</script>

<style scoped>
.about { padding-block: var(--section); }
.about__grid {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: var(--gap) calc(var(--gap) * 3);
  align-items: start;
}

.about__facts { padding: 0.9rem; font-size: 13px; min-width: 0; }
.about__card dl div { display: grid; grid-template-columns: 5.5em 1fr; padding: 0.15rem 0; }
.about__card dt { color: var(--muted); }

.about__text { font-size: var(--step-lead); line-height: 1.35; max-width: 34em; }
.about__text p + p { margin-top: 1.2em; }

@media (max-width: 900px) {
  .about__grid { grid-template-columns: minmax(0, 1fr); }
  .about__card { max-width: 420px; }
}
</style>
