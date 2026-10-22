import { gsap } from 'gsap'

// Runs GSAP setup after mount. `motion` is false under prefers-reduced-motion, so setup can
// skip decorative tweens but keep scroll-state logic. Re-runs if the OS setting flips;
// everything it creates is reverted on unmount.
export function useMotion(setup: (motion: boolean) => void) {
  let mm: gsap.MatchMedia | undefined
  onMounted(() => {
    mm = gsap.matchMedia()
    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', any: 'all' },
      (ctx) => setup(!!ctx.conditions?.motion),
    )
  })
  onBeforeUnmount(() => mm?.revert())
}
