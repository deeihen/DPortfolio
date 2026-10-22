export default defineNuxtPlugin((nuxtApp) => {
  // after the page has hydrated: adding .in earlier makes Vue report a class mismatch
  nuxtApp.hook('app:suspense:resolve', () => {
    (window as any).__reveal = true
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('in')
        io.unobserve(e.target)
      }
    }, { rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))
  })
})
