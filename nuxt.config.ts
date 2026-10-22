// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/google-fonts', '@vueuse/nuxt'],
  googleFonts: {
    families: {
      'JetBrains Mono': [400, 700],
      Onest: [400, 500],
    },
    display: 'swap',
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Mark Dennis Concha',
      meta: [
        { name: 'description', content: 'Mark Dennis Concha, aspiring SOC analyst in the Philippines.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#07090c' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      // entrance animations only hide content once we know scripts run
      script: [{ innerHTML: "try{var t=localStorage.getItem('theme')}catch(e){}document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.classList.add('js');setTimeout(function(){if(!window.__reveal)document.documentElement.classList.remove('js')},3000)" }],
    },
  },
  nitro: {
    preset: 'vercel',
  },
})
