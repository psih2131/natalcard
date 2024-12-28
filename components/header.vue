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
              <template v-if="store.autorisationStatus ">
                <div class="header__accoutn header-account" @click="openUserNavStatus = true">
                  <p class="header-account__name">Аккаунт</p>
                  <div class="header-account__photo-wrapper">
                   <img src="@/assets/img/account.png" alt="">
                  </div>
                </div>
              </template>

              <template v-else>
                <a  class="aut-header-btn login__btn main__btn"  @click="openLogin()">Вход</a>
                <a  class="aut-header-btn reg__btn" @click="openRegistration()">Регистрация</a>
              </template>
              


            <div class="header__burger"  :class="{ 'active': isBurgerActive }" 
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

        <template v-if="store.autorisationStatus">
          <component__user_panel v-if="openUserNavStatus == true " @closeUserPanel="openUserNavStatus = false" />
        </template>
        
    </header>
   
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
import { ref, onMounted, onBeforeUnmount, computed, watch  } from 'vue';
import component__user_panel from '@/components/user-panel.vue'




//DATA
const isScrolled = ref(false);
const isBurgerActive = ref(false);
const openUserNavStatus = ref(false)
const store = useCounterStore()


//METHODS 
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

function openRegistration(){
  store.changePopupStatus(true)
  store.changePopupName('popup-registration')
}

function openLogin(){
  store.changePopupStatus(true)
  store.changePopupName('popup-login')
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



//HOOKS
onMounted(() => {
  // Добавляем обработчик события scroll
  window.addEventListener('scroll', checkScroll);
  let tokenStatusStore = localStorage.getItem('jwtToken')
  if(tokenStatusStore && tokenStatusStore != ''){
    store.changeAutorisationStatus(true)
  }


  // Динамическая загрузка скрипта Яндекса
  const script = document.createElement('script');
  script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
  // script.onload = this.initializeYandexSuggest;
  script.onerror = () => {
  this.error = 'Не удалось загрузить SDK Яндекса.';
  };
  document.head.appendChild(script);

  
  
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