<template>
  <figure ref="shot" class="shot">
    <img src="/mephoto.jpg" alt="Mark Dennis Concha" width="960" height="960" fetchpriority="high" />
    <span class="shot__scan" aria-hidden="true" />
    <figcaption class="mono"><span class="ok">■</span> id verified · deeihen</figcaption>
  </figure>
</template>

<script setup>
import { gsap } from 'gsap'

const shot = ref(null)
// on load the photo wipes up from the bottom while a scan line sweeps down it
useMotion((motion) => {
  if (!motion) return
  const img = shot.value.querySelector('img')
  const scan = shot.value.querySelector('.shot__scan')
  gsap.timeline({ delay: 0.3 })
    .fromTo(img, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power3.inOut' })
    .fromTo(scan, { top: '0%', opacity: 1 }, { top: '100%', duration: 1.4, ease: 'power1.inOut' }, 0.5)
    .to(scan, { opacity: 0, duration: 0.3 })
})
</script>

<style scoped>
/* tight crop on the face, green duotone + scanlines; hover shows the real colour */
.shot {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--panel-2);
  border: 1px solid var(--line);
}
.shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 31% 0;
  /* scaling from near the top pushes the face (31%, 31%) down toward the middle of the frame */
  transform: scale(1.45);
  transform-origin: 31% 10%;
  filter: grayscale(1) contrast(1.2) brightness(0.9);
  transition: filter 0.6s var(--ease), transform 0.8s var(--ease);
}
.shot::before,
.shot::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 0.6s var(--ease);
}
.shot::before { background: var(--ok); mix-blend-mode: color; opacity: 0.55; }
.shot::after {
  background:
    repeating-linear-gradient(0deg, rgb(0 0 0 / 0.22) 0 1px, transparent 1px 3px),
    radial-gradient(ellipse at 50% 40%, transparent 45%, color-mix(in srgb, var(--bg) 75%, transparent));
}
.shot:hover img { filter: none; transform: scale(1.35); }
.shot:hover::before { opacity: 0; }
.shot__scan {
  position: absolute;
  inset-inline: 0;
  top: 0;
  z-index: 1;
  height: 2px;
  background: var(--ok);
  box-shadow: 0 0 14px 2px var(--ok);
  opacity: 0;
}
figcaption {
  position: absolute;
  left: 0.9rem;
  bottom: 0.9rem;
  z-index: 1;
  padding: 0.25rem 0.55rem;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  font-size: 12px;
}
</style>
