import fs from 'fs';
import path from 'path';

export default defineNuxtConfig({
  app: {
    head: {


    },
  },

  security: {


    headers: {
      contentSecurityPolicy: {

        'img-src': ["*", 'data:', 'https://widget.cloudpayments.ru'],


        // 'default-src': [

        //   "https://google.com",
        //   "https://www.google.com",
        //   "https://pay.yandex.ru",
        //   "https://api-statist.dev-tcsgroup.io",
        //   "https://api-statist.tinkoff.ru",
        //   "https://forma.tinkoff.ru",
        // ],
        'connect-src': [
          "self",
          "https:",

          "https://google.com",
          "https://www.google.com",
          "https://pay.yandex.ru",
          "https://api-statist.dev-tcsgroup.io",
          "https://api-statist.tinkoff.ru",
          "https://forma.tinkoff.ru",

          "http://localhost:3000",
          "ws://localhost:3000",
          "https://natalnaya-karta-online.ru/",
          "ws://natalnaya-karta-online.ru/",

          "https://widget.cloudpayments.ru",
          "https://api.cloudpayments.ru",
          "https://widget.cloudpayments.ru/monitoring-api/metric",
          "https://widget.cloudpayments.ru/feature-api/config"
        ],

        'frame-src': ["*", "https://widget.cloudpayments.ru", "https://api.cloudpayments.ru"],

        'frame-ancestors': [
          "'self'",
          "https://widget.cloudpayments.ru", "https://api.cloudpayments.ru"
        ],


      },

    },



  },



  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: ['@pinia/nuxt', 'nuxt-security'],
  // serverHandlers: [
  //   { route: '/api', handler: '~/middleware/security.ts' },
  // ],


});