import fs from 'fs';
import path from 'path';

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'Content-Security-Policy', content: `default-src https://google.com https://www.google.com https://pay.yandex.ru https://api-statist.dev-tcsgroup.io https://api-statist.tinkoff.ru https://forma.tinkoff.ru; connect-src https://google.com https://www.google.com https://pay.yandex.ru https://api-statist.dev-tcsgroup.io https://api-statist.tinkoff.ru https://forma.tinkoff.ru https://widget.cloudpayments.ru; frame-ancestors 'self' https://widget.cloudpayments.ru;` },
      ],

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
