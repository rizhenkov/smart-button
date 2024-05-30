// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' }
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'Smart Button' },
        { name: 'application-name', content: 'Smart Button' },
        { name: 'msapplication-TileColor', content: '#2f2f2f' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxtjs/eslint-module', '@vueuse/nuxt', '@nuxt/ui', '@nuxtjs/i18n'],
  runtimeConfig: {
    smartThingsApiUrl: '',
    smartThingsApiToken: '',
    smartThingsSceneId: '',
    additionalPushPause: 0,
    pinCode: ''
  },
  nitro: {
    preset: 'vercel'
  }
})
