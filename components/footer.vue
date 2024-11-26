<template>
    <footer class="footer">
        <div class="footer__content container">
          <div class="footer__up">
            <div class="footer__logo-wrapper">
              <a href="#" class="footer__logo"><img :src="mainData.logo" alt="logo"></a>
              <p class="footer__logo-text">{{mainData.futer_opisanie }}
              </p>
            </div>
            <div class="footer__info">
              <div class="footer__nav-wrapper">
                <h4 class="footer__title">Навигация</h4>
                <nav class="footer__nav">
                  <ul class="footer__nav-list">
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
              </div>
              <div class="footer__contacts">
                <h4 class="footer__title">Контакты</h4>

                <div class="footer__item" v-for="item in mainData.kontakty" :key="item">
                  <p class="footer__item-title">{{item.nazvanie}}</p>
                  <a :href="item.bek" class="footer__item-link">{{item.vizual}}</a>
                </div>

 
                <div class="footer__btns-wrapper">
                  <a href="#" class="footer__login-btn main__btn">Вход</a>
                  <a href="#" class="footer__reg-btn main__btn">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
          <div class="footer__down">
            <p class="footer__razrab">© 2024 | nordface</p>
            <div class="footer__links">
              
                <NuxtLink v-for="item in currentList(pagesList)" :key="item" :to="`/docs/${item.slug}`" class="footer__link" >
                  {{item.title.rendered}}                                                        
                </NuxtLink>
     
              
              

            </div>
          </div>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // Плавный скроллинг
    }
  }

 // props
 const props = defineProps({
  mainData: Object,
  pagesList: Object,
      // postAllCategory: Object,
  })


  function currentList(data){
    let newPageList = []
    for(let i = 0; i < data.length; i++){
      if(data[i].template == "pages/tipus.php"){
        newPageList.push(data[i])
      }
    }
    return newPageList
  }
</script>