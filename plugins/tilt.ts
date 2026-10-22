// v-tilt: panels lean toward the pointer in 3D, then settle back when it leaves.
// Fine pointers only; skipped entirely under prefers-reduced-motion.
const MAX = 5 // degrees

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tilt', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement) {
      if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

      let frame = 0
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width - 0.5
          const y = (e.clientY - r.top) / r.height - 0.5
          el.style.transition = 'transform 120ms linear'
          el.style.transform = `perspective(1000px) rotateX(${(-y * MAX).toFixed(2)}deg) rotateY(${(x * MAX).toFixed(2)}deg)`
        })
      }
      const leave = () => {
        cancelAnimationFrame(frame)
        el.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)'
        el.style.transform = ''
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
    },
  })
})
