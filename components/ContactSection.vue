<template>
  <section id="contact" ref="root" class="contact wrap">
    <p class="contact__cmd mono muted" data-reveal>
      <span class="ok">mark@soc</span>:~$ ./contact --role "SOC analyst"
    </p>
    <p class="contact__ask" data-reveal style="--i: 1">
      Building a SOC team, or running a lab I should join? Write to me.
    </p>
    <a ref="addr" class="contact__mail mono" :href="mail">
      markdennisconcha14@<br />gmail.com<span class="ok blink" aria-hidden="true">_</span>
    </a>
    <ul class="contact__links mono" data-reveal style="--i: 3">
      <li><a class="link" href="https://github.com/deeihen" target="_blank" rel="noopener">github</a></li>
      <li><a class="link" href="https://linkedin.com/in/mark-dennis-concha-2ab10a316/" target="_blank" rel="noopener">linkedin</a></li>
      <li><a class="link" href="https://facebook.com/deeihen" target="_blank" rel="noopener">facebook</a></li>
    </ul>
  </section>
</template>

<script setup>
import { gsap } from 'gsap'

const root = ref(null)
const addr = ref(null)
useMotion((motion) => {
  if (!motion) return
  gsap.fromTo(addr.value, { xPercent: 18, opacity: 0.2 }, {
    xPercent: 0,
    opacity: 1,
    ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top 85%', end: 'center 60%', scrub: true },
  })
})

const mail = 'mailto:markdennisconcha14@gmail.com?subject=SOC%20role%20for%20Mark'
</script>

<style scoped>
.contact {
  padding-block: var(--section);
  border-top: 1px solid var(--line);
  overflow: clip;
}
.contact__cmd { font-size: 14px; }
.contact__ask { margin-top: 1.5rem; max-width: 30ch; font-size: var(--step-lead); line-height: 1.3; }
.contact__mail {
  display: inline-block;
  margin-top: 2rem;
  font-size: 7vw;
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 0.95;
  transition: color 0.25s;
}
.contact__mail:hover { color: var(--ok); }
.contact__links { display: flex; gap: 1.5rem; margin-top: 2.5rem; list-style: none; font-size: 15px; }

@media (max-width: 760px) {
  .contact__mail { font-size: 8.6vw; }
}
</style>
