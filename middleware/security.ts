export default defineEventHandler((event) => {
    appendHeader(event, 'Content-Security-Policy', [
        "default-src 'self';",
        "script-src 'self' https://yandex.ru https://*.yandex.ru https://widget.cloudpayments.ru;",
        "frame-ancestors 'self' https://yandex.ru https://*.yandex.ru;",
        "connect-src 'self' https://yandex.ru https://*.yandex.ru https://widget.cloudpayments.ru;",
        "style-src 'self' 'unsafe-inline';",
        "img-src 'self' data: https://yandex.ru https://*.yandex.ru https://natalbase.ru/;",
    ].join(' '));
});