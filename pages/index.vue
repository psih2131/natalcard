<template>
    <main class="main" v-if="loadStatus == true">

        <!-- first section -->
        <section class="first">
            <div class="first__content container">
                <div class="first__bg">
                    <picture>
                    <source media="(max-width:1200px)" srcset="/assets/img/head_bg-small.jpg">
                    <img src="/assets/img/head_bg.jpg" alt="Flowers" style="width:auto;">
                    </picture>
                </div>
                <div class="first__info">
                    <h1 class="first__title">{{homePageData.value[0].acf.первая_секция.заголовок}}</h1>
                    <p class="first__text">{{homePageData.value[0].acf.первая_секция.текст}}</p>
                    <a href="#" class="first__btn main__btn">{{homePageData.value[0].acf.первая_секция.текст_кнопки}}</a>
                </div>
                <div class="first__abs"><img src="/assets/img/head_abs.png" alt="abs"></div>
            </div>
        </section>


        <!-- second section -->
        <section class="born sec">
            <div class="born__content container">
            <h3 class="born__title main__title">{{homePageData.value[0].acf.sekcziya_2_vse_zalozheno.zagolovok}}</h3>

            <!-- pc -->
            <div class="born__items">

                <div class="born__item" v-for="item in homePageData.value[0].acf.sekcziya_2_vse_zalozheno.spisok_kartochek" :key="item">
                    <div class="born__item-info">
                        <h4 class="born__item-title">{{item.zagolovok}}</h4>
                        <p class="born__item-text">{{item.podzagolovok}}</p>
                    </div>
                    <div class="born__item-img"><img :src="item.kartinka" alt="img"></div>
                </div>

            </div>

            <!-- mob -->
            <div class="born__slider-mob-wrapper">
                <swiper
                    :slidesPerView="2"
                    :spaceBetween="10"
                    :scrollbar="{
                    hide: false,
                    draggable: true,
                    el: '.swiper-scrollbar',
                    }"
            
                    :breakpoints="breakpoints"
                    :modules="modules"
                    class="swiper-container born__slider"
                    >

                    <swiper-slide class="born__item" v-for="item in homePageData.value[0].acf.sekcziya_2_vse_zalozheno.spisok_kartochek" :key="item">
                        <div class="born__item-info">
                        <h4 class="born__item-title">{{item.zagolovok}}</h4>
                        <p class="born__item-text">{{item.podzagolovok}}</p>
                        </div>
                        <div class="born__item-img"><img :src="item.kartinka" alt="img"></div>
                    </swiper-slide>

                    <!-- Это элемент, который будет использоваться как скроллер -->
                    <div class="swiper-scrollbar"></div>

                </swiper>
            </div>
            
            </div>
        </section>


        <!-- sec 3 work  -->
        <section class="work">
            <div class="work__content container">
            <div class="work__abs"><img src="/assets/img/born_img-1.png" alt="img"></div>
            <h3 class="work__title main__title">{{homePageData.value[0].acf.sekcziya_3_kak_eto_rabotaet.zagolovok}}</h3>

            <swiper
                :slidesPerView="1"
                :spaceBetween="0"
                :navigation="true"
                :loop="true"
                :autoHeight="false"
            
                :pagination="paginationWork"
                
                :modules="modules"
                
                :breakpoints="breakpointsWorkSlider"
                class="work__slider"
                >
                <swiper-slide class="work__slider-item" v-for="item in homePageData.value[0].acf.sekcziya_3_kak_eto_rabotaet.slajder" :key="item">
                    <div class="work__slider-item-wrapper">
                        <p class="work__slider-item-text">{{item.tekst}}</p>
                        <div class="work__slider-item-img"><img :src="item.kartinka" alt="img"></div>
                    </div>
                </swiper-slide>


                <div class="work__slider-pagination swiper-pagination"></div>

            </swiper>

            </div>
        </section>






    <section class="card sec" :style="{ backgroundImage: `url(${homePageData.value[0].acf.sekcziya_4_forma.fon})`, backgroundSize: '0px' }">

        <div class="card__wrapper">
          <div class="card__abs"><img src="/assets/img/form_abs.png" alt="img"></div>
          <div class="card__content container" :style="{ backgroundImage: `url(${homePageData.value[0].acf.sekcziya_4_forma.fon})`, backgroundSize: 'cover' }">

            <div class="card__form">
              <h4 class="card__form-title">Бесплатный расчёт натальной карты</h4>
              <div class="card__form-item">
                <input type="text" placeholder="Дата рождения">
                <div class="card__form-abs"><img src="/assets/img/svg/date-icon.svg" alt=""></div>
              </div>
              <div class="card__form-item">
                <input type="text" placeholder="Время рождения">
                <div class="card__form-abs"><img src="/assets/img/svg/time-icon.svg" alt=""></div>
              </div>
              <div class="card__form-item">
                <input type="text" placeholder="Незнаю время рождения">
              </div>
              <div class="card__form-item">
                <input type="text" placeholder="Город рождения">
                <div class="card__form-abs"><img src="/assets/img/svg/pin-icon.svg" alt=""></div>
              </div>
              <div class="card__form-item"><input type="submit" value="Рассчитать Натальную карту"></div>
            </div>
          </div>
        </div>
      </section>



    <section class="review sec">
        <div class="review__content container">

        <div class="review__abs"><img src="/assets/img/born_img-4.png" alt="img"></div>

        <div class="review__wrapper">
            <div class="review__title-wrapper">
            <h3 class="review__title">{{homePageData.value[0].acf.sekcziya_5_otzyvy.zagolovok}}</h3>
            </div>

            <div class="review__abs-wrapper">

            <div class="test">


                <swiper
                    :slidesPerView="1"
                    :spaceBetween="0"
                    :navigation="{
                        nextEl: '.swiper-button-next',  // Привязываем кастомные стрелки
                        prevEl: '.swiper-button-prev',
                    }"
                    :loop="true"
                    :autoHeight="false"
                    
                
                    :pagination="paginationReviews"
                    
                    :modules="modules"
                    
                    :breakpoints="breakpointsReviews"
                    class="swiper-container review__slider-wrapper"
                    >
                    <swiper-slide class="review__slide" v-for="item in homePageData.value[0].acf.sekcziya_5_otzyvy.spisok_otzyvov" :key="item">
                        <div class="review__qoute"><img src="/assets/img/review_abs.jpg" alt="img"></div>
                        <div class="review__slide-wrapper">
                            <div class="review__slide-info">
                            <p class="review__slide-name">{{item.avtor}}</p>
                            <p class="review__slide-subtitle">{{item.dolzhnost}}</p>
                            </div>
                            <div class="review__img"><img :src="item.foto" alt="img"></div>
                        </div>
                        <p class="review__text" v-html="item.tekst_otzyv">
                         
                        </p>
                    </swiper-slide>

                   

                    <div class="work__slider-pagination swiper-pagination"></div>

                </swiper>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev review__slider-prev"></div>


        
               

      


                   



               
            </div>

            </div>
        </div>

        </div>
    </section>

    <section class="question sec">
        <div class="q__abs"><img src="/assets/img/born_img-2.png" alt="img"></div>
        <div class="question__content container">
        <div class="question__wrapper">
            <div class="question__abs"><img src="/assets/img/born_img-1.png" alt="img"></div>
            <div class="question__info">
            <h4 class="question__info-title">{{homePageData.value[0].acf.sekcziya_6_voprosy.zagolovok}}</h4>
            <div class="question__info-items">

                <div class="question__info-item" v-for="item in homePageData.value[0].acf.sekcziya_6_voprosy.spisok_voprosov" :key="item">
                    <div class="question__info-wrapper">
                        <div class="question__info-item-dot"><img src="/assets/img/svg/dot-icon.svg" alt="icon"></div>
                        <p>{{item.tekst_voprosa}}</p>
                    </div>
                </div>
            
            </div>
            </div>
            <div class="question__img"><img :src="homePageData.value[0].acf.sekcziya_6_voprosy.kartinka" alt="img"></div>
        </div>
        </div>
    </section>



        <section class="mission sec">
            <div class="mission__content container">
            <div class="mission__img"><img :src="homePageData.value[0].acf.sekcziya_7_missiya_proekta.izobrazhenie" alt="img"></div>
            <div class="mission__info">
                <div class="mission__info-abs"><img src="/assets/img/mission_abs.png" alt="img"></div>
                <div class="wp-redactor" v-html="homePageData.value[0].acf.sekcziya_7_missiya_proekta.tekst">
                
                </div>
            </div>
            </div>
        </section>
    </main>
</template>

<!-- @/assets/images/logo.png -->
<script>
 // Import Swiper Vue.js components
 import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


// import required modules
import { Scrollbar, Pagination, Navigation } from 'swiper/modules';


export default {
  data(){
    return{
        breakpoints: {
        250: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        750: {
          slidesPerView: 3,
          spaceBetween: 25
        },
      },
      breakpointsWorkSlider: {
        100: {
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: true,
        },
        750: {
            slidesPerView: 2,
            spaceBetween: 25,
            autoHeight: false,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 34,
            autoHeight: false,
        },
      }
      ,
      breakpointsReviews: {
        100: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        750: {
            slidesPerView: 2,
            spaceBetween: 50,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 0,
        },
      },

    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const loadStatus = ref(false);
    const homePageData = ref([]); // Реактивная переменная для хранения данных страницы

    // Асинхронная операция для получения данных
    const fetchPosts = async () => {
      const { data } = await useFetch('https://natalbase.ru/wp-json/wp/v2/pages?slug=glavnaya');
      homePageData.value = data; // Присваиваем полученные данные в реактивную переменную
        
      console.log(homePageData.value); // Выводим данные в консоль
      loadStatus.value = true
    };

    // Вызываем функцию для получения данных
    fetchPosts();



    // Конфигурация пагинации
    const paginationWork = {
      el: '.swiper-pagination',
      clickable: true,
      type: 'fraction',  // Тип пагинации - 'fraction'
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
               '<span class="slide-trait"></span>' + // Кастомная линия между номерами
               '<span class="' + totalClass + '"></span>';
      }
    };

    // Конфигурация пагинации
    const paginationReviews = {
      el: '.swiper-pagination',
      clickable: true,
      type: 'fraction',  // Тип пагинации - 'fraction'
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
               '<span class="slide-trait"></span>' + // Кастомная линия между номерами
               '<span class="' + totalClass + '"></span>';
      }
    };
      

    return {
      homePageData,
      loadStatus,
    
      modules: [Scrollbar, Pagination, Navigation],
      paginationWork,
      paginationReviews,
    };
  },
};
</script>