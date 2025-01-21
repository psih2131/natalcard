import fs from 'fs';
import path from 'path';

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },

      ],

    },
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["*"],

        'default-src': [
          "https://google.com",
          "https://www.google.com",
          "https://pay.yandex.ru",
          "https://api-statist.dev-tcsgroup.io",
          "https://api-statist.tinkoff.ru",
          "https://forma.tinkoff.ru",
        ],
        'connect-src': [
          "'self'", // Разрешает текущий домен
          "https://api.cloudpayments.ru", // Добавляем домен CloudPayments
          'https://widget.cloudpayments.ru/feature-api/config',  // Правильный путь к API
          'https://widget.cloudpayments.ru',
          "https://natalbase.ru",
          "https://autofill.yandex.ru",
          "https://google.com",
          "https://www.google.com",
          "https://pay.yandex.ru",
          "https://api-statist.dev-tcsgroup.io",
          "https://api-statist.tinkoff.ru",
          "https://forma.tinkoff.ru",
        ],

        'frame-src': [
          "'self'",
          'https://widget.cloudpayments.ru', // Разрешаем загрузку фреймов с этого домена
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