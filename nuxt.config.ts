import fs from 'fs';
import path from 'path';

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
      ]
    },
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: ['@pinia/nuxt'],
  serverHandlers: [
    { route: '/api', handler: '~/middleware/security.ts' },
  ],
});
