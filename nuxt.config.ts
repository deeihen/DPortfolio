// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/google-fonts', '@vueuse/nuxt'],
  googleFonts: {
    families: {
      'Space Mono': [400, 700],
      'Syne': [400, 700, 800],
      'Bebas Neue': true,
    },
    display: 'swap',
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'My Portfolio',
      meta: [
        { name: 'description', content: 'Personal portfolio — creative developer' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  nitro: {
    preset: 'vercel',
  },
})
