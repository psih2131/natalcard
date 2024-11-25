<template>
    <header class="header" :class="{ 'header-bg': isScrolled }">
        <div class="header__content container">
            <div class="header__logo-wrapper">
            <NuxtLink to="/" class="header__logo">
                <img :src="mainData.logo" alt="logo">                                                     
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

                <li>
                  <a  @click="scrollToSection('reviews')">Отзывы  </a>  
                </li>

                <li>
                  <a  @click="scrollToSection('how-work')">Как работает</a>  
                </li>

                <li>
                  <a  @click="scrollToSection('about-us')">О нас</a>  
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
                  <li>
                    <NuxtLink to="/" @click="closeMeny()">
                          Главная                                                        
                      </NuxtLink>
                  </li>

                  <li>
                      <NuxtLink to="/our-blog/" @click="closeMeny()">
                          Блог                                                        
                      </NuxtLink>
                  </li>

                  <li>
                    <a  @click="scrollToSection('reviews') , closeMeny()">Отзывы  </a>  
                  </li>

                  <li>
                    <a  @click="scrollToSection('how-work'), closeMeny()">Как работает</a>  
                  </li>

                  <li>
                    <a  @click="scrollToSection('about-us'), closeMeny()">О нас</a>  
                  </li>
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

function closeMeny(){
  isBurgerActive.value = false
  document.body.classList.toggle('lock', isBurgerActive.value);
}


// Функция для проверки прокрутки
const checkScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};


function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // Плавный скроллинг
    }
  }

onMounted(() => {
  // Добавляем обработчик события scroll
  window.addEventListener('scroll', checkScroll);
});

onBeforeUnmount(() => {
  // Убираем обработчик события при размонтировании компонента
  window.removeEventListener('scroll', checkScroll);
});



 // props
 const props = defineProps({
  mainData: Object,
      // postAllCategory: Object,
  })
</script>