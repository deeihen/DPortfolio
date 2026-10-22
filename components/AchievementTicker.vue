<template>
  <section class="ticker" aria-label="Credentials and results">
    <div ref="track" class="ticker__track">
      <ul v-for="n in 2" :key="n" class="ticker__set" :aria-hidden="n === 2 ? 'true' : undefined">
        <li v-for="t in items" :key="t.text">
          <span class="chip" :class="t.status">{{ t.status }}</span>
          <span class="ticker__text">{{ t.text }}</span>
          <span class="ticker__by mono">{{ t.by }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const items = [
  { status: 'verified', text: 'Introduction to Cybersecurity', by: 'Cisco' },
  { status: 'verified', text: 'Cybersecurity Fundamentals', by: 'IBM SkillsBuild' },
  { status: 'studying', text: 'BS Computer Science', by: 'Taguig City University' },
  { status: 'verified', text: 'Working in a Digital World', by: 'IBM SkillsBuild' },
  { status: 'target', text: 'Certified in Cybersecurity', by: 'ISC2' },
  { status: 'target', text: 'Security+', by: 'CompTIA' },
]

const track = ref(null)

// endless drift; scrolling speeds it up and turns it the way you scroll
useMotion((motion) => {
  if (!motion) return
  const loop = gsap.to(track.value, { xPercent: -50, duration: 45, ease: 'none', repeat: -1 })
  ScrollTrigger.create({
    onUpdate(self) {
      const dir = self.direction
      const boost = gsap.utils.clamp(1, 6, Math.abs(self.getVelocity()) / 250)
      gsap.to(loop, {
        timeScale: dir * boost,
        duration: 0.2,
        overwrite: true,
        onComplete: () => gsap.to(loop, { timeScale: dir, duration: 1.2 }),
      })
    },
  })
})
</script>

<style scoped>
.ticker {
  overflow: hidden;
  border-block: 1px solid var(--line);
  background: var(--panel);
}
.ticker__track { display: flex; width: max-content; }
.ticker__set { display: flex; list-style: none; }
li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.2rem;
  border-right: 1px solid var(--line);
  white-space: nowrap;
}
.ticker__text { font-size: var(--step-lead); letter-spacing: -0.02em; }
.ticker__by { font-size: 13px; color: var(--muted); }

/* no drift: show every item once, wrapped */
@media (prefers-reduced-motion: reduce) {
  .ticker__track, .ticker__set { width: auto; flex-wrap: wrap; }
  .ticker__set[aria-hidden] { display: none; }
}
</style>
