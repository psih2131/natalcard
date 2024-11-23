<template>
    <header class="header" :class="{ 'header-bg': isScrolled }">
        <div class="header__content container">
            <div class="header__logo-wrapper">
            <NuxtLink to="/" class="header__logo">
                <img src="/assets/img/logo.png" alt="logo">                                                     
            </NuxtLink>
            
            </div>
            <nav class="header__nav">
            <ul class="header__nav-list">
                
                <li>
                    <NuxtLink to="/">
                        Главная                                                        
                    </NuxtLink>
                </li>

                <li>
                    <NuxtLink to="/our-blog/">
                        Блог                                                        
                    </NuxtLink>
                </li>


            </ul>
            </nav>
            <div class="header__btns-wrapper">
            <a href="#" class="login__btn main__btn">Вход</a>
            <a href="#" class="reg__btn">Регистрация</a>
            <div class="header__burger" :class="{ 'active': isBurgerActive }" 
            @click="toggleMenu">
                <span></span>
            </div>
            </div>
            <div class="header__mobile" :class="{ 'active': isBurgerActive }">
            <nav class="header__nav-mobile">
                <ul class="header__nav-list">
                <li><a href="#">Главная</a></li>
                <li><a href="#">Как работает</a></li>
                <li><a href="#">Отзывы</a></li>
                <li><a href="#">Ответы</a></li>
                <li><a href="post.html">Контакты</a></li>
                <li><a href="blog.html">Блог</a></li>
                </ul>
            </nav>
            </div>

        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isScrolled = ref(false);
const isBurgerActive = ref(false);

// Функция для переключения состояния бургерного меню
const toggleMenu = () => {
  isBurgerActive.value = !isBurgerActive.value;
  
  // Переключаем класс "lock" на body
  document.body.classList.toggle('lock', isBurgerActive.value);
};


// Функция для проверки прокрутки
const checkScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

onMounted(() => {
  // Добавляем обработчик события scroll
  window.addEventListener('scroll', checkScroll);
});

onBeforeUnmount(() => {
  // Убираем обработчик события при размонтировании компонента
  window.removeEventListener('scroll', checkScroll);
});
</script>