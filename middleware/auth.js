// middleware/auth.js

export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem('jwtToken'); // Получаем токен из localStorage
    console.log('Токен:', token); // Логируем токен
    if (!token) {
        // Перенаправляем на страницу логина, если токен отсутствует
        console.log('Токен отсутствует, редирект на /');
        return navigateTo('/');
    }

});