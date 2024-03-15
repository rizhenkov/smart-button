// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxtjs/eslint-module', '@vueuse/nuxt', '@nuxt/ui'],
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
