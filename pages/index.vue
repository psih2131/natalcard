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
                    <button @click="scrollToSection('form')" class="first__btn main__btn">{{homePageData.value[0].acf.первая_секция.текст_кнопки}}</button>
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
        <section class="work" id="how-work">
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




        <!-- sec 4 form -->

        <section id="form" class="card sec" :style="{ backgroundImage: `url(${homePageData.value[0].acf.sekcziya_4_forma.fon})`, backgroundSize: '0px' }">

            <div class="card__wrapper">
              <div class="card__abs"><img src="/assets/img/form_abs.png" alt="img"></div>
              <div class="card__content container" :style="{ backgroundImage: `url(${homePageData.value[0].acf.sekcziya_4_forma.fon})`, backgroundSize: 'cover' }">

                <div class="card__form card__form-home">

                    <div v-if="registFormStatus == false" class="card__form-wrapper-def">
                        <h4 class="card__form-title">Бесплатный расчёт натальной карты</h4>
                        <div class="account-natal-data-sec__data-wrapper form-home-page">
                
                          <!-- date born -->
                          <div class="account-natal-data-sec__time-wrapper">
          
                            <VueDatePicker
                            ref="dateComponent" 
                            v-model="dateBorn" 
                            model-type="yyyy-MM-dd"
                            :enable-time-picker="false"
                            :placeholder="'Выберите дату рождения'"
                            locale="ru" 
                            cancelText="отменить" 
                            selectText="выбрать"
                  
                            ></VueDatePicker>
          
                            
          
                          </div>
          
                          <!-- time born -->
                          <div class="account-natal-data-sec__time-wrapper" :class="{'forgetTime': forgetTime == true}">
                        
                            <VueDatePicker 
                            v-model="timeBorn" 
                            time-picker
                            :placeholder="'Выберите время рождения'"
                            locale="ru"
                            cancelText="отменить" 
                            selectText="выбрать"  />
          
                           
          
                          </div>
          
                          <div class="account-natal-data-sec__forged-time" :class="{'forgetTimeChckbox': forgetTime == true}">
                            <p class="account-natal-data-sec__forget">Я не знаю точное время</p>
                            <label for="">
                              <input type="checkbox" v-model="forgetTime">
                            </label>
                          </div>
                      
          
          
                          <!-- location born -->
                          <div class="account-natal-data-sec__location-wrapper location-wrapper">
          
                            <div class="location-wrapper__input-wrapper">
                              <div class="location-wrapper__input-wrapper-search">
                                <div class="location-wrapper__input-wrapper-search-row">
                                  <div class="location-wrapper__input-container">
                                    <input
                                      placeholder="Укажите место рождения"
                                    /> 
                   
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
          
                          <div class="account-natal-data-sec__btn">
                            <button  @click="registFormStatus = true">Произвести расчет</button>
                          </div>
                         
                      </div>
                    </div> 




                   
                    <div class="card__form-wrapper-activ form-wrapper-activ" v-else>

                      <div class="form-wrapper-activ__img-wrapper">
                        <img src="@/assets/img/born_img-2.png" alt="" class="form-wrapper-activ__img">
                      </div>
                      <h4 class="form-wrapper-activ__title">Войдите в аккаунт для расчета натальной карты</h4>

                      <div class="form-wrapper-activ__btn-wrapper">
                        <a class="btn-secform login__btn main__btn"  @click="openLogin()">Вход</a>
                        <a class="btn-secform reg__btn" @click="openRegistration()">Регистрация</a>
                      </div>
                      
                    </div>

                    </div>  
              
                 
              </div>
            </div>
          </section>


      <!-- reciews sec -->
    <section class="review sec" id="reviews">
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



        <section class="mission sec" id="about-us">
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


// import required modules
import { Scrollbar, Pagination, Navigation } from 'swiper/modules';
import { useCounterStore } from '@/stores/counter'


export default {
  data(){
    return{
      store: null,

      

      registFormStatus: false,
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
    VueDatePicker
  },
  methods: {

   openRegistration(){
    this.store.changePopupStatus(true)
    this.store.changePopupName('popup-registration')
  },

    openLogin(){
      this.store.changePopupStatus(true)
      this.store.changePopupName('popup-login')
    },


    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Плавный скроллинг
      }
    }
  },
  setup() {

    let dateBorn  = ref(null);
    let timeBorn = ref(null); 
    let forgetTime = ref(false); 

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
      dateBorn,
      timeBorn,
      forgetTime,
    
      modules: [Scrollbar, Pagination, Navigation],
      paginationWork,
      paginationReviews,
    };
  },

  mounted() {
    this.store = useCounterStore()
    console.log('component data',this.VueDatePicker)
  },
};
</script>