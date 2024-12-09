// utils/jwtUtils.js
export function decodeJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        return null;
    }
}

export function isTokenValid(token) {
    const decoded = decodeJwt(token);
    if (!decoded || !decoded.exp) {
        return false;
    }

    const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
    return decoded.exp > currentTime;
}

export function getTokenExpirationTime(token) {
    const decoded = decodeJwt(token);
    if (decoded && decoded.exp) {
        return decoded.exp - Math.floor(Date.now() / 1000);
    }
    return null;
}


// import { isTokenValid, getTokenExpirationTime } from './plugins/tokenDecoderTimeStatus.js';

// checkAuth() {
//     const token = localStorage.getItem('jwtToken'); // Получаем токен из localStorage
//     if (token && isTokenValid(token)) {
//       this.isAuthenticated = true;
//       this.tokenTimeLeft = getTokenExpirationTime(token);
//     } else {
//       this.isAuthenticated = false;
//       this.tokenTimeLeft = 0;
//     }
//   },