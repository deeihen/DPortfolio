<template>
  <section id="education" ref="root" class="edu wrap">
    <div class="section-head" data-reveal>
      <span class="prompt">&gt;</span><h2>education</h2>
    </div>

    <ol class="edu__list">
      <li v-for="e in schools" :key="e.level" class="panel edu__item">
        <p class="edu__years mono"><span>{{ e.from }}</span><span class="edu__dash" aria-hidden="true" /><span :class="{ ok: e.current }">{{ e.to }}</span></p>
        <div class="edu__text">
          <img class="edu__logo" src="/icons/tcu.png" alt="Taguig City University seal" width="330" height="330" loading="lazy" />
          <p class="edu__level mono muted">{{ e.level }}<span v-if="e.current" class="chip studying">current</span></p>
          <h3 class="edu__program">{{ e.program }}</h3>
          <p class="edu__school">Taguig City University <span class="muted">· Taguig City</span></p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { gsap } from 'gsap'

const schools = [
  { level: 'college', program: 'BS Computer Science', from: '2023', to: '2027', current: true },
  { level: 'senior high school', program: 'STEM-PTECH strand', from: '2021', to: '2023' },
]

const root = ref(null)

useMotion((motion) => {
  if (!motion) return
  // each row wipes in from the left, then its year line draws across
  root.value.querySelectorAll('.edu__item').forEach((item) => {
    gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 85%' } })
      .fromTo(item, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut' })
      .fromTo(item.querySelector('.edu__dash'), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 0.6)
  })
})
</script>

<style scoped>
.edu { padding-block: var(--section); }
.edu__list { display: grid; gap: var(--gap); list-style: none; }

.edu__item {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: var(--gap) calc(var(--gap) * 2);
  align-items: center;
  padding: clamp(20px, 3vw, 40px) 0.9rem;
}
.edu__years {
  display: flex;
  align-items: center;
  gap: 0.35em;
  font-size: clamp(2.4rem, 6vw, 5.5rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.edu__dash { width: 0.7em; height: 0.08em; background: var(--muted); transform-origin: 0 50%; }

.edu__text {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: clamp(16px, 2vw, 28px);
  align-items: center;
}
.edu__text > :not(.edu__logo) { grid-column: 2; }
.edu__logo { grid-row: 1 / span 3; width: clamp(64px, 7vw, 96px); height: auto; }
.edu__level { display: flex; align-items: center; gap: 0.8rem; font-size: 13px; }
.edu__program { margin-top: 0.6rem; font-size: var(--step-head); font-weight: 500; letter-spacing: -0.03em; line-height: 1.05; }
.edu__school { margin-top: 0.5rem; font-size: var(--step-lead); }

@media (max-width: 760px) {
  .edu__item { grid-template-columns: minmax(0, 1fr); }
}
</style>
