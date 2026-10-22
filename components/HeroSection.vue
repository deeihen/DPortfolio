<template>
  <section id="top" class="hero wrap">
    <div ref="globe" class="hero__globe" aria-hidden="true"><ThreatGlobe /></div>

    <div class="hero__id">
      <h1 class="hero__name mono">
        <span data-reveal>mark dennis</span>
        <span data-reveal style="--i: 1">concha<span class="ok blink" aria-hidden="true">_</span></span>
      </h1>
      <p class="hero__role" data-reveal style="--i: 2">
        A <strong>BS Computer Science student at Taguig City University</strong>, training in
        <strong>SOC analysis</strong>, threat detection and network security.
      </p>
      <div class="hero__cta" data-reveal style="--i: 3">
        <a href="#evidence" class="button">see achievements</a>
        <a href="#work" class="button button--ghost">view projects</a>
      </div>
      <div class="hero__docs" data-reveal style="--i: 4">
        <a class="button button--ghost" href="/mark-dennis-concha-resume.pdf" download>↓ résumé (pdf)</a>
        <a class="button button--ghost" href="/mark-dennis-concha-cv.pdf" download>↓ cv (pdf)</a>
      </div>
      <p class="hero__status mono" data-reveal style="--i: 4">
        <span class="ok">●</span> status: open to tier 1 SOC roles
      </p>
    </div>

    <div class="hero__visual">
      <div class="hero__photo" data-reveal style="--i: 2"><ProfilePhoto /></div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from 'gsap'

const globe = ref(null)
useMotion((motion) => {
  if (!motion) return
  gsap.to(globe.value, {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: globe.value, start: 'top top', end: 'bottom top', scrub: true },
  })
})
</script>

<style scoped>
.hero {
  position: relative;
  overflow: clip;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: var(--gap);
  min-height: calc(100svh - 58px);
  padding-block: clamp(32px, 6svh, 72px);
}

.hero__id { grid-column: 1 / 8; grid-row: 1; align-self: center; position: relative; z-index: 1; }
.hero__visual { grid-column: 8 / 13; grid-row: 1; align-self: center; position: relative; z-index: 1; display: grid; place-items: center; }
.hero__photo { width: min(100%, 52svh); }
/* the globe is backdrop: huge, dim, behind everything */
.hero__globe { position: absolute; z-index: 0; width: max(110svh, 60vw); right: -14%; top: 50%; translate: 0 -50%; opacity: 0.35; pointer-events: none; }
/* backdrop only: its location caption would float mid-hero */
.hero__globe :deep(.globe__caption) { display: none; }
.hero__role strong { font-weight: 500; color: var(--ok); }
.hero__name {
  font-size: var(--step-display);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 0.9;
}
.hero__name > span { display: block; }
.hero__role { max-width: 48ch; margin-top: 1.5rem; font-size: var(--step-lead); line-height: 1.3; }
.hero__cta { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2rem; }
.hero__cta .button { min-height: 48px; padding: 0 1.4em; font-size: 14px; }
.hero__docs { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.75rem; }
.hero__docs .button { min-height: 44px; padding: 0 1.2em; font-size: 13px; }
.hero__status { margin-top: 1rem; font-size: 14px; color: var(--muted); }

@media (max-width: 900px) {
  .hero { min-height: 0; }
  .hero__id { grid-column: 1 / -1; grid-row: 2; }
  .hero__visual { grid-column: 1 / -1; grid-row: 1; margin-bottom: 2rem; }
  .hero__photo { width: min(72vw, 340px); }
  .hero__globe { width: 150vw; right: -25vw; top: 30%; }
  .hero__name { font-size: 13vw; }
}
</style>
