<template>
    <main class="account-main" v-if="pageViewStatus">
    
      <section class="account-natal-front-sec">
        <div class="container">
          <div class="account-natal-front-sec__info">
            <h1 class="account-natal-front-sec__title">Открой свое Истинное "Я" С помощью Звезд</h1>
            <p class="account-natal-front-sec__subtitle">Натальная карта — это астрологическая карта, созданная на основе даты, времени и места вашего рождения. Она отражает расположение планет в момент вашего появления на свет, что оказывает значительное влияние на вашу личность, цели, карьеру, отношения и многое другое. Каждый человек уникален, и ваша натальная карта — это ключ к пониманию своего внутреннего мира и потенциала</p>
          </div>
          <div class="account-natal-front-sec__img-wrapper">
            <div class="first__abs"><img src="/assets/img/head_abs.png" alt="abs"></div>
          </div>
        </div>
      </section>

      



      <section class="natal-chart-list" v-if="userNatalChartsTableListStatusView == true">
        <div class="container">
          <div class="natal-chart-list__wrapper">
            <div class="natal-chart-list__header">
              <h2 class="natal-chart-list__title">Ваши натальные карты</h2>
              <button class="natal-chart-list__btn-create" @click="userNatalChartsTableListStatusView = false, loadStatus = false">Расчитать новую карту</button>
            </div>
            <div class="natal-chart-list__table">
   
              <div  v-for="(item, index) in userNatalChartList" :key="index" :class="{'natal-chart-list__table-element-activ': userNatalChartListActivIndex == index}" class="natal-chart-list__table-element">
                <div class="natal-chart-list__table-element-row-data">
                  <div class="natal-chart-list__table-element-col-1 dt-col">
                    <p class="natal-chart-list__table-element-text-data">id: <span>{{item.id}}</span></p>
                  </div>
                  <div class="natal-chart-list__table-element-col-2 dt-col">
                    <p class="natal-chart-list__table-element-text-data">
                      дата рождения: <span v-if="item.acf.data_i_vremya">{{formatDateTime(item.acf.data_i_vremya)}}</span>
                    </p>
                  </div>
                  <div class="natal-chart-list__table-element-col-3 dt-col">
                    <p class="natal-chart-list__table-element-text-data">
                      долгота: <span v-if="item.acf.kordinaty && item.acf.kordinaty.lng">{{item.acf.kordinaty.lng}}</span>
                    </p>
                  </div>
                  <div class="natal-chart-list__table-element-col-3 dt-col">
                    <p class="natal-chart-list__table-element-text-data">
                      широта: <span v-if="item.acf.kordinaty && item.acf.kordinaty.lat">{{item.acf.kordinaty.lat}}</span>
                  </p>
                  </div>
                </div>
                <div class="natal-chart-list__table-element-btn-row">

                  <button v-if="userNatalChartListActivIndex == index" class="natal-chart-list__table-element-select-btn-activ">Активная</button>
                  <button v-else class="natal-chart-list__table-element-select-btn" @click="loadCurrentNatalChartSelected(index, item)">Загрузить</button>

                  <div class="natal-chart-list__table-element-del-btn" @click="deleteNatalChartServerRequest(item.id)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V6H18.9897C18.9959 5.99994 19.0021 5.99994 19.0083 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H19.9311L19.0638 20.1425C18.989 21.1891 18.1182 22 17.0689 22H6.93112C5.88184 22 5.01096 21.1891 4.9362 20.1425L4.06888 8H3C2.44772 8 2 7.55228 2 7C2 6.44772 2.44772 6 3 6H4.99174C4.99795 5.99994 5.00414 5.99994 5.01032 6H7V4ZM9 6H15V4H9V6ZM6.07398 8L6.93112 20H17.0689L17.926 8H6.07398ZM10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10Z" fill="#6F6AC3"/>
                    </svg>                      
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section id="natalChartMainData" class="account-natal-data-sec" v-else>
        <div class="container">
          <div class="account-natal-data-sec__icon-wrapper"></div>

          <div class="account-natal-data-sec__info-wrapper">

            <div class="account-natal-data-sec__form">
              <h2 class="account-natal-data-sec__title">Заполните данные для расчета</h2>
              <div class="account-natal-data-sec__data-wrapper">
                
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
  
                    <p class="error-text-form" v-if="dateBornErrorText">{{dateBornErrorText}}</p>
  
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
  
                    <p class="error-text-form" v-if="timeBornErrorText && forgetTime == false">{{timeBornErrorText}}</p>
  
                  </div>
  
                  <div class="account-natal-data-sec__forged-time" :class="{'forgetTimeChckbox': forgetTime == true}">
                    <p class="account-natal-data-sec__forget">Я не знаю точное время</p>
                    <label for="">
                      <input type="checkbox" v-model="forgetTime">
                    </label>
                  </div>
              
  
  
                  <!-- location born -->
                  <div class="account-natal-data-sec__location-wrapper location-wrapper">
  
                    <div class="location-wrapper__input-wrapper" v-if="locationCordinats == false">
                      <div class="location-wrapper__input-wrapper-search">
                        <div class="location-wrapper__input-wrapper-search-row">
                          <div class="location-wrapper__input-container">
                            <input
                              v-model="query"
                              @input="changeSearchLoation"
                              placeholder="Укажите место рождения"
                            /> 
                            <div class="location-wrapper__input-container-remove" v-if="query && query != ''" @click="clearAllText">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#0D0D0D"/>
                               </svg>
                                
                            </div>
                          </div>
                         
  
                          <div class="location-wrapper__input-wrapper-search-btn" :disabled="query == null || query == ''" @click="fetchLocations">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9056 14.3199C11.551 15.3729 9.84871 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#0D0D0D"/>
                            </svg>                            
                          </div>
                        </div>
  
                        <div class="location-wrapper__search-result" v-if="locations.length">
                          <p class="location-wrapper__search-result-title">Выберите ваш населенный пункт</p>
                            <ul class="location-wrapper__search-result-list">
                              <li class="location-wrapper__search-result-list-value" v-for="location in locations" :key="location.id" @click="setCurrentLocation(location)">
                                {{ location.name }} ({{ location.coords.lat }}, {{ location.coords.lon }})
                              </li>
                            </ul>
                          
                        </div>
  
                      </div>
  
                      <p class="error-text-form" v-if="locationTextError">{{locationTextError}}</p>
  
                    </div>
  
                    <div v-else class="location-wrapper__row-cordinats">
                      <div class="location-wrapper__current-cordinats-inp">
                        <input placeholder="Долгота" type="text" @input="validateInput($event)" v-model="longitudeLocation">
                      </div>
  
                      <div class="location-wrapper__current-cordinats-inp">
                        <input placeholder="Широта" type="text" @input="validateInput($event)" v-model="latitudeLocation">
                      </div>
  
                      <p class="error-text-form" v-if="locationTextError">{{locationTextError}}</p>
  
                    </div>
  
                    <div class="account-natal-data-sec__forged-time" :class="{'forgetTimeChckbox': locationCordinats == true}">
                      <p class="account-natal-data-sec__forget">Указать точные кординаты</p>
                      <label for="">
                        <input type="checkbox" v-model="locationCordinats" @change="changeTypeCordinats()">
                      </label>
                    </div>
  
             
                  </div>
  
                  <div class="account-natal-data-sec__btn">
                    <button @click="validationNatalChartData()">Произвести расчет</button>
                  </div>
                 
              </div>
            </div>

          </div>
          
          
          

         
          
        </div>
      </section>



      <section class="natal-chart-sec" v-if="loadStatus">
        <div class="container">
          <div class="natal-chart-sec__main-row">
            <div class="natal-chart-sec__main-info">
              <h2 class="natal-chart-sec__title">Положения планет</h2>

              <div class="planet-position-table">
                <div class="planet-position-table__row planet-position-table__header-row">
                  <div class="planet-position-table__col-planets">Планета</div>
                  <div class="planet-position-table__col-position">Положение</div>
                  <div class="planet-position-table__col-dome">Дом</div>
                </div>

                <div class="planet-position-table__row " v-for="item in planets " :key="item">
                  <div class="planet-position-table__col-planets">
                    <img :src="item.img">
                    <p class="planet-position-table__col-planets-name">{{item.name}}</p>
                  </div>
                  <div class="planet-position-table__col-position">
                    <p class="planet-position-table__col-position-text">
                      {{getZodiacV1(item.lon , item.name)}}  {{ item.lon.toFixed(1) }}°
                    </p>
                  </div>
                  <div class="planet-position-table__col-dome">
                    <p class="planet-position-table__col-dom-text">
                      10
                    </p>
                  </div>
                </div>
              </div>
            
            </div>
            <div class="natal-chart-sec__natal-chart-svg">
              
              <svg :width="width" :height="height" :viewBox="viewBox">
                <!-- Circle representing the zodiac -->
                <circle cx="250" cy="250" r="200" stroke="url(#gradient)" stroke-width="4" fill="transparent" />
              
                <!-- Gradients for lines and aspects -->
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color: #ff7e5f; stop-opacity: 1" />
                    <stop offset="100%" style="stop-color: #feb47b; stop-opacity: 1" />
                  </linearGradient>
                  <linearGradient id="aspect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color: #8e44ad; stop-opacity: 0.7" />
                    <stop offset="100%" style="stop-color: #f39c12; stop-opacity: 0.7" />
                  </linearGradient>
                </defs>
              
                <!-- Drawing the 12 zodiac signs -->
                <g v-for="(sign, index) in zodiacSigns" :key="index">
                  <line 
                    :x1="250" 
                    :y1="250" 
                    :x2="getX(index)" 
                    :y2="getY(index)" 
                    stroke="#ccc" 
                    stroke-width="1" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" />
                  
                  <!-- Replace text with icons -->

                  <circle 
                      :cx="getX(index)" 
                      :cy="getY(index)" 
                      r="15" 
                      fill="white" 
                      stroke="black" 
                      stroke-width="1" 
                    />
                  <image 
              
                    :x="getX(index) - 10" 
                    :y="getY(index) - 10" 
                    width="20" 
                    height="20" 
                    :href="zodiacIcons[sign]" />
                </g>
                
                <g v-for="(aspect, index) in aspects" :key="index">
                  <!-- Aspects -->
                  <line
                  class="aspect-line"
                  :key="index"
                  :x1="getPlanetX(aspect.planet1.lon)"
                  :y1="getPlanetY(aspect.planet1.lon)"
                  :x2="getPlanetX(aspect.planet2.lon)"
                  :y2="getPlanetY(aspect.planet2.lon)"
                  stroke="url(#aspect-gradient)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-opacity="0.8" />


                
                  
                  <text 
                    :x="(getPlanetX(aspect.planet1.lon) + getPlanetX(aspect.planet2.lon)) / 2"
                    :y="(getPlanetY(aspect.planet1.lon) + getPlanetY(aspect.planet2.lon)) / 2"
                    class="aspect-text"
                    text-anchor="middle" 
                 
                    font-family="'Arial', sans-serif" 
                    font-size="10" 
                    fill="#333" 
                    font-weight="400">
                    {{ aspect.planet1.name }} - {{ aspect.planet2.name }}<br>
                    тип связи: {{ aspect.type }}
                  </text>
                  

                </g>

                  
                <!-- Planets -->
                <g v-for="(planet, index) in planets" :key="index">
                  <circle 
                  :cx="getPlanetX(planet.lon)" 
                  :cy="getPlanetY(planet.lon)" 
                  r="12" :fill="planet.color" 
                  stroke="#fff" stroke-width="3"
                  class="planet-circle"
                  />
                  <text 
                    :x="getPlanetX(planet.lon)" 
                    :y="getPlanetY(planet.lon)" 
                    class="planet-text"
                    text-anchor="middle" 
                    dy="-20"
                    font-family="'Arial', sans-serif" 
                    font-size="14" 
                    fill="#333" 
                    font-weight="bold">
                    {{ planet.name }}
                  </text>
                </g>
              
              
              </svg>
              
              
            </div>
          </div>




          <div class="account-natal-data-sec__prognoz-container natal-prognoz">
            <ul class="natal-prognoz__nav">
              <li class="natal-prognoz__nav-element" @click="curentTabButon = 1" :class="{'natal-prognoz__nav-element_activ': curentTabButon == 1}">Планеты в Знаках</li>
              <li class="natal-prognoz__nav-element" @click="curentTabButon = 2" :class="{'natal-prognoz__nav-element_activ': curentTabButon == 2}">Планеты в домах</li>
            </ul>


            <template v-if="curentTabButon == 1">
              <div class="natal-prognoz__planets-list">
                <div class="natal-prognoz__planet-element" v-for="(item, index) in planets " :key="index" 
                :class="{'natal-prognoz__planet-element_activ': currentPlanetSelected == index}"
                @click="currentPlanetSelected = index">
                  <img :src="item.img" alt="" class="natal-prognoz__planet-element-img">
                  <p class="natal-prognoz__planet-element-title">{{item.name}}</p>
                  <p class="natal-prognoz__planet-element-subtitle">{{item.subname}}</p>
                </div>
              </div>

              <div class="natal-prognoz__value-container">
                <div class="natal-prognoz__value-container-header">
                  <div class="natal-prognoz__value-container-icon">
                    <img :src="planets[currentPlanetSelected].img" alt="" class="natal-prognoz__value-container-planet-icon">
                    <img src="https://yoomap.ru/images/zodiac/%D1%81%D0%BA%D0%BE%D1%80%D0%BF%D0%B8%D0%BE%D0%BD%D0%B5.png" alt="" class="natal-prognoz__value-container-zodiac-icon">
                  </div>
                  <div class="natal-prognoz__value-container-header-text">
                    <p class="natal-prognoz__value-container-header-title">{{ getZodiac(planets[currentPlanetSelected].lon, planets[currentPlanetSelected].name)}}</p>
                    <p class="natal-prognoz__value-container-header-subtitle">{{planets[currentPlanetSelected].subname}}</p>
                  </div>
                </div>


             

                <div class="natal-prognoz__value-container-body ">
                  <div class="wp-redactor" v-html="getCurrentZodiacData(planets[currentPlanetSelected].name, getZodiacV2(planets[currentPlanetSelected].lon, planets[currentPlanetSelected].name))">
                  </div>
                 
                </div>
              </div>
            </template>
            
          </div>
         


        </div>
      </section>


      
        <section class="account-main__front">
            <div class="container">

          <p>эфимериды</p>
          <ul v-if="loadStatus">
            <li v-for="item in planets " :key="item">
                {{ getZodiac(item.lon , item.name) }}
            </li>
          </ul>
          <br><br>

          <p>аспекты</p>
          <ul v-if="loadStatus">
            <li v-for="item in aspects " :key="item">
                {{ item.planet1.name }} - {{ item.planet2.name }} | тип связи: {{ item.type }} | {{ item.angleDifference }}  
            </li>
          </ul>

            </div>
        </section>

    </main>
</template>

<script>

definePageMeta({
  layout: 'admin',
//   middleware: 'auth', // Указываем middleware для защиты страницы
});

// import { isTokenValid, getTokenExpirationTime } from '@/plugins/tokenDecoderTimeStatus.js';
// import { Astronomy, Observer } from 'astronomy-engine';
import {SiderealTime,  SearchMoonQuarter, Equator, Observer, Vector, Ecliptic  } from 'astronomy-engine';
import { useCounterStore } from '@/stores/counter'
import moment from "moment-timezone";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


//zodiac img
import oven from '@/assets/img/zodiac/овен.svg';
import telec from '@/assets/img/zodiac/телец.svg';
import bliznec from '@/assets/img/zodiac/близнецы.svg';
import rak from '@/assets/img/zodiac/рак.svg';
import lev from '@/assets/img/zodiac/lev.svg';
import deva from '@/assets/img/zodiac/дева.svg';
import vesy from '@/assets/img/zodiac/весы.svg';
import scorpion from '@/assets/img/zodiac/скорпион.svg';
import strelec from '@/assets/img/zodiac/стрелец.svg';
import kozerog from '@/assets/img/zodiac/козерог.svg';
import vodoley from '@/assets/img/zodiac/водолей.svg';
import ryby from '@/assets/img/zodiac/рыби.svg';

//planets img
import imgSun from '@/assets/img/planets/sun.png';
import imgMoon from '@/assets/img/planets/moon.png';
import imgMercury from '@/assets/img/planets/mercury.png';
import imgVenera from '@/assets/img/planets/venera.png';
import imgMars from '@/assets/img/planets/mars.png';
import imgJupiter from '@/assets/img/planets/jupiter.png';
import imgSaturn from '@/assets/img/planets/saturn.png';
import imgUranus from '@/assets/img/planets/uranus.png';
import imgNeptun from '@/assets/img/planets/neptun.png';
import imgPluton from '@/assets/img/planets/pluton.png';

export default {

 
    data() {
        return {
            store: null,
            pageViewStatus: false,

            userData: null,

            titlePost: '',
            descriptionPost: '',
            userNatalChartList: [],
            userNatalChartListActivIndex: 0,

            dateBorn: null,
            dateBornErrorText: null,

            timeBorn: null,
            timeBornErrorText: null,
            forgetTime: false,

            longitudeLocation: null,
            latitudeLocation: null,
            locationCordinats: false,
            locationTextError: null,
            

            query: "",
            locations: [],
            locationValueForRequest: null,
            timer: null, // Для дебаунса
            apiKey: "3f39c994-7cf5-46f9-9a95-ead825d2a02c", // Замените на ваш API-ключ
            // ce4ac412-f055-467b-ada1-f968976fa1a4


            // dateBorn: '1990-06-15',
            // timeBorn: '1430',
            shirota: 51.5074,
            dolgota: -0.1278,



            sunPosition: null,
            observer: {
                latitude: 55.7558, // Широта
                longitude: 37.6173, // Долгота
                elevation: 0        // Высота над уровнем моря
            },
            date: '2023-12-11T12:00:00Z', // Время в формате UTC




            width: 500,
            height: 500,
            viewBox: "0 0 500 500",
            zodiacSigns: ["овен", "телец", "близнецы", "рак", "lev", "дева", "весы", "скорпион", "стрелец", "козерог", "водолей", "рыби"],
            planets: [],  // Сюда будем добавлять данные о планетах
            aspects: [], // Populated dynamically
            
            loadStatus:false,

            WP_STRING_CURENT_LOCATION: null,
            WP_STRING_CURENT_DATE_TIME: null,

            userNatalChartsTableListStatusView: false,

            curentTabButon: 1,
            currentPlanetSelected: 0,

            serverDataPrognozPlanetInZodiac: [],
            zodiacIcons: {
              овен: oven,
              телец: telec,
              близнецы: bliznec,
              рак: rak,
              lev: lev,
              дева: deva,
              весы: vesy,
              скорпион: scorpion,
              стрелец: strelec,
              козерог: kozerog,
              водолей: vodoley,
              рыби: ryby,
            }

      
            
        }
    },

    props: {

    },

    components: {
      VueDatePicker
    },

    methods: {
      loadCurrentNatalChartSelected(index,item){
        this.userNatalChartListActivIndex = index
        this.WP_STRING_CURENT_LOCATION = item.acf.kordinaty
        this.WP_STRING_CURENT_DATE_TIME = item.acf.data_i_vremya

        this.calculateEquatorialCoordinates(this.WP_STRING_CURENT_LOCATION, this.WP_STRING_CURENT_DATE_TIME)
      },

  


      //convert date and time
      formatDateTime(dateTime) {
        if (!dateTime) return ''; // Проверяем на пустое значение
        const date = new Date(dateTime); // Преобразуем строку в объект Date
        const formattedDate = date.toISOString().split('T')[0]; // Получаем дату в формате YYYY-MM-DD
        const hours = date.getHours(); // Часы
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Минуты с ведущим нулём
        return `${formattedDate} ${hours}:${minutes}`; // Возвращаем итоговую строку
      },


        validateInput(event) {
          const value = event.target.value;

        // Регулярное выражение: допустимы минус, точка и цифры
        const validValue = value.match(/^[-]?[0-9]*\.?[0-9]*$/);
        
        // Если введено некорректное значение, возвращаем только допустимые символы
        if (!validValue) {
          // Убираем все недопустимые символы из строки
          event.target.value = value.replace(/[^0-9.-]/g, '');
        } else {
          // Проверяем допустимость количества точек и минусов
          const parts = value.split('.');
          if (parts.length > 2) {
            // Если больше одной точки, оставляем только первую
            event.target.value = `${parts[0]}.${parts[1]}`;
          }

          if (value.indexOf('-') > 0) {
            // Если минус не в начале строки, убираем его
            event.target.value = value.replace(/-/g, '');
          }
        }
      },


      //validation form data
      validationNatalChartData(){
        if(!this.dateBorn || this.dateBorn == ''){
          this.dateBornErrorText = 'Выберите дату рождения'
        }
        else{
          this.dateBornErrorText = null
        }

        if(this.$dataforgetTime == true){
          this.timeBornErrorText = null
        }
        else{
          if(!this.timeBorn || this.timeBorn == ''){
            this.timeBornErrorText = 'Укажите время рождения'
          }
          else{
            this.timeBornErrorText = null
          }
        }


        if(this.locationCordinats == true){
          if(!this.longitudeLocation || this.longitudeLocation == '' || !this.latitudeLocation || this.latitudeLocation == ''){
            this.locationTextError = 'укажите коректные кординаты'
          }
          else{
            this.locationTextError = null
          }
        }
        else{
          if(!this.locationValueForRequest || this.locationValueForRequest == '' ){
              this.locationTextError = 'Введите место рождени нажмите на кнопку поиска и выберите его из списка предложенных что бы коректно обработать кординаты'
            }
            else{
              this.locationTextError = null
            }
        }



        if(!this.$optionsdateBornErrorText && !this.timeBornErrorText && !this.locationTextError){
          this.getDataForNatalRequest()
        }
       
      },

      clearAllText(){
        this.query = null
        this.locationValueForRequest = null
        this.locations = []
      },

      setCurrentLocation(data){
        this.query = data.name
        this.locationValueForRequest = data
        console.log(data)

        this.locations = []
      },


      changeTypeCordinats(){
        this.clearAllText()

        this.longitudeLocation = null
        this.latitudeLocation = null
        this.locationTextError = null
      },

      //load location variants
      async fetchLocations() {
        // Дебаунс для ограничения количества запросов
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          if (!this.query.trim()) {
            this.locations = [];
            return;
          }

          const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${this.apiKey}&format=json&geocode=${encodeURIComponent(
            this.query
          )}`;

          try {
            const response = await fetch(url);
            const data = await response.json();

            // Парсим результаты геокодера
            const results =
              data.response.GeoObjectCollection.featureMember.map((item) => {
                const geoObject = item.GeoObject;
                const coords = geoObject.Point.pos.split(" ");
                return {
                  id: geoObject.metaDataProperty.GeocoderMetaData.id,
                  name: geoObject.name,
                  coords: {
                    lon: parseFloat(coords[0]),
                    lat: parseFloat(coords[1]),
                  },
                };
              });

            this.locations = results;
          } catch (error) {
            console.error("Ошибка при запросе:", error);
          }
        }, 300); // Задержка в 300 мс
      },




      getDataForNatalRequest(){
        let curentLocation = {
          'lat': null,
          'lng': null
        }
        
        let currentDate = this.dateBorn
        let currentTime = null
        let dateAndTimeUTCConvert = null

        if(this.forgetTime == false){
          currentTime = `${this.timeBorn.hours}:${this.timeBorn.minutes}`
        }
        else{
          currentTime = `12:00`
        }
        

        if(this.locationCordinats == false){
          curentLocation.lat = this.locationValueForRequest.coords.lat
          curentLocation.lng = this.locationValueForRequest.coords.lon
        }
        else{
          curentLocation.lat = this.latitudeLocation
          curentLocation.lng = this.longitudeLocation
        }

        console.log(currentDate, currentTime)

        let inputDateTime = `${currentDate} ${currentTime}`

        dateAndTimeUTCConvert = this.calculateTimeInUTC(curentLocation.lng, inputDateTime )

        console.log('current coords',curentLocation)
        console.log('current grinvich time', dateAndTimeUTCConvert)


        this.WP_STRING_CURENT_LOCATION = curentLocation
        this.WP_STRING_CURENT_DATE_TIME = dateAndTimeUTCConvert

        this.calculateEquatorialCoordinates(curentLocation, dateAndTimeUTCConvert)

        

      },



      calculateTimeInUTC(longitude, inputDateTime) {
        // Рассчитываем смещение в минутах по долготе (15° долготы = 1 час)
        const offset = Math.floor(longitude / 15) * 60;

        // Преобразуем дату и время с учётом смещения и переводим в UTC
        return moment(inputDateTime)
          .utcOffset(offset) // Устанавливаем локальное смещение
          .utc() // Переводим в UTC
          .format("YYYY-MM-DDTHH:mm:ss[Z]"); // Форматируем в ISO 8601 с Z
      },


    

      calculateEquatorialCoordinates(curentLocation, dateCurrent) {
      // const observer = new Observer(48.5655, 38.9404, 0);
      // const date = new Date('2002-09-29T19:45:00Z');
      const observer = new Observer(+curentLocation.lat, +curentLocation.lng, 0);
      const date = new Date(dateCurrent);
      
      const equatorialSun = Equator('Sun', date, observer, true, true);
      const equatorialMoon = Equator('Moon', date, observer, true, true);
      const equatorialMercury = Equator('Mercury', date, observer, true, true);
      const equatorialVenus = Equator('Venus', date, observer, true, true);
      const equatorialMars = Equator('Mars', date, observer, true, true);
      const equatorialJupiter = Equator('Jupiter', date, observer, true, true);
      const equatorialSaturn = Equator('Saturn', date, observer, true, true);
      const equatorialUranus = Equator('Uranus', date, observer, true, true);
      const equatorialNeptune = Equator('Neptune', date, observer, true, true);
      const equatorialPluto = Equator('Pluto', date, observer, true, true);

      const sunEcliptic = this.calcEcliptic(equatorialSun);
      const moonEcliptic = this.calcEcliptic(equatorialMoon);
      const mercuryEcliptic = this.calcEcliptic(equatorialMercury);
      const venusEcliptic = this.calcEcliptic(equatorialVenus);
      const marsEcliptic = this.calcEcliptic(equatorialMars);
      const jupiterEcliptic = this.calcEcliptic(equatorialJupiter);
      const saturnEcliptic = this.calcEcliptic(equatorialSaturn);
      const uranusEcliptic = this.calcEcliptic(equatorialUranus);
      const neptuneEcliptic = this.calcEcliptic(equatorialNeptune);
      const plutoEcliptic = this.calcEcliptic(equatorialPluto);

      this.planets = [
        { name: "Солнце",subname:"Характер", lon: sunEcliptic.elon, color: "#FDB53A", img: imgSun },
        { name: "Луна",subname:"Эмоции", lon: moonEcliptic.elon, color: "#D0D0D0", img: imgMoon },
        { name: "Меркурий",subname:"Общение", lon: mercuryEcliptic.elon, color: "#F19440", img: imgMercury },
        { name: "Венера",subname:"Любовь", lon: venusEcliptic.elon, color: "#E1A853", img: imgVenera },
        { name: "Марс",subname:"Энергия", lon: marsEcliptic.elon, color: "#F9795C", img: imgMars },
        { name: "Юпитер",subname:"Стабильность", lon: jupiterEcliptic.elon, color: "#D78766", img: imgJupiter },
        { name: "Сатурн",subname:"Общество", lon: saturnEcliptic.elon, color: "#F9D5A6", img: imgSaturn },
        { name: "Уран",subname:"Перемены", lon: uranusEcliptic.elon, color: "#38CEBF", img: imgUranus },
        { name: "Нептун",subname:"Мечты", lon: neptuneEcliptic.elon, color: "#6F6AC3", img: imgNeptun },
        { name: "Плутон",subname:"Поколение", lon: plutoEcliptic.elon, color: "brown", img: imgPluton },
      ];

      this.calculateAspects(); // Расчет аспектов после получения данных планет

     
    },


        calcEcliptic(data){
            const vectorData = data.vec;
            const currentEclipticData = Ecliptic(vectorData);
            return currentEclipticData;
        },

        getZodiac(elon, planetName) {
        const signs = ["Овне", "Тельце", "Близнецах", "Раке", "Льве", "Деве", "Весах", "Скорпионе", "Стрелеце", "Козероге", "Водолее", "Рыбах"];
        const zodiacSign = signs[Math.floor(+elon / 30)];
        console.log(`Planet is in ${zodiacSign}`);
        return `${planetName} в ${zodiacSign}`;
        },


        getZodiacV1(elon, planetName) {
        const signs = ["Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"];
        const zodiacSign = signs[Math.floor(+elon / 30)];
        console.log(`Planet is in ${zodiacSign}`);
        return `${zodiacSign}`;
        },

        getZodiacV2(elon, planetName) {
        const signs = ["oven", "telecz", "blizneczy", "rak", "lev", "deva", "vesy", "skorpion", "strelecz", "kozerog", "vodolej", "ryby"];
        const zodiacSign = signs[Math.floor(+elon / 30)];
        console.log(`Planet is in ${zodiacSign}`);
        return `${zodiacSign}`;
        },

        //calculate aspects
        calculateAspects() {
        const aspects = [];
        const aspectTypes = [
          { name: "Соединение", angle: 0, orb: 8 },
          { name: "Оппозиция", angle: 180, orb: 8 },
          { name: "Трин", angle: 120, orb: 6 },
          { name: "Квадрат", angle: 90, orb: 6 },
          { name: "Секстиль", angle: 60, orb: 6 },
          { name: "Квинтиль", angle: 72, orb: 2.5 }
        ];

        for (let i = 0; i < this.planets.length; i++) {
          for (let j = i + 1; j < this.planets.length; j++) {
            const planet1 = this.planets[i];
            const planet2 = this.planets[j];
            let diff = Math.abs(planet1.lon - planet2.lon) % 360;

            // Корректируем, чтобы угол не превышал 180°
            if (diff > 180) {
              diff = 360 - diff;
            }

            aspectTypes.forEach(aspect => {
              if (Math.abs(diff - aspect.angle) <= aspect.orb) {
                aspects.push({
                  planet1,
                  planet2,
                  type: aspect.name,
                  angleDifference: diff // Добавляем угловое различие
                });
              }
            });
          }
        }

        this.aspects = aspects;


        this.loadStatus = true;
        this.calculateAscendant()

        if(this.loadStatus == true && this.userNatalChartsTableListStatusView == false){
          this.createNatalChartServerRequest()
        }

      },


    getAspectColor(type) {
      const colors = {
        "Соединение": "blue",
        "Оппозиция": "red",
        "Трин": "green",
        "Квадрат": "orange",
        "Секстиль": "purple",
      };
      return colors[type] || "black";
    },



        getX(index) {
        // Получаем угол для текущего знака
        const angle = (index * 30) * (Math.PI / 180); // каждый знак по 30 градусов
        const radius = 200; // Радиус кольца
        const offset = 30; // Дополнительное смещение для размещения за пределами кольца

        return 250 + (radius + offset) * Math.cos(angle);
        },

        getY(index) {
          // Получаем угол для текущего знака
        const angle = (index * 30) * (Math.PI / 180); // каждый знак по 30 градусов
        const radius = 200; // Радиус кольца
        const offset = 30; // Дополнительное смещение для размещения за пределами кольца

        return 250 + (radius + offset) * Math.sin(angle);
        },

        getTextOffset(index) {
        return (index % 2 === 0) ? -20 : 20;
        },

        getPlanetX(lon) {
        const angle = lon * (Math.PI / 180);
        return 250 + 200 * Math.cos(angle);
        },

        getPlanetY(lon) {
        const angle = lon * (Math.PI / 180);
        return 250 + 200 * Math.sin(angle);
        },



       // Функция для расчета асцендента
       // Функция для расчета асцендента
          calculateAscendant() {
      // Ваши переменные
      const dateTime = this.WP_STRING_CURENT_DATE_TIME;
      const latitude = this.WP_STRING_CURENT_LOCATION.lat;
      const longitude = this.WP_STRING_CURENT_LOCATION.lng;

      // Проверка на наличие данных
      if (!dateTime || latitude === undefined || longitude === undefined) {
        console.error("Пожалуйста, укажите дату, широту и долготу.");
        return;
      }

      // Преобразуем строку даты в объект Date
      const date = new Date(dateTime);

      // 1. Получаем Гринвичское звездное время (GST)
      const gst = SiderealTime(date);

      // 2. Рассчитываем местное звездное время (LST)
      const lst = (gst + longitude / 15) % 24;

      console.log('star time',this.convertToStandardTime(lst))

      // 3. Получаем экваториальные координаты для Солнца (или другого объекта)
      let observer = new Observer(+latitude, +longitude, 0);
      const sunCoordinates = Equator("Sun", date, observer, true, true);

      console.log(observer,sunCoordinates)

      const ra = sunCoordinates.ra; // Прямое восхождение в часах
      const ascendant = (lst - ra) % 24; // Рассчитываем асцидент на основе LST и RA

      // Переводим асцидент в градусы
      let ascendantCurrent = (ascendant * 15 + 360) % 360; // Преобразуем асцидент в градусы, всегда положительное значение
      console.log(ascendant, ascendantCurrent)

      // 5. Рассчитываем знак асцидента
    
      let ascendantSign = this.getZodiacSign(ascendantCurrent); // Получаем знак асцидента по долготе асцидента

      console.log(ascendant, ascendantSign)


      



    },

    // Функция для определения знака зодиака по долготе
    getZodiacSign(longitude) {
      const signs = [
        "Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева",
        "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"
      ];
      const index = Math.floor(longitude / 30); // Каждый знак зодиака охватывает 30°
      return signs[index];
    },


     convertToStandardTime(starTime) {
  const hours = Math.floor(starTime); // Часы
  const minutes = Math.floor((starTime - hours) * 60); // Минуты
  const seconds = Math.round(((starTime - hours) * 60 - minutes) * 60); // Секунды

  return `${ hours}:${minutes}:${seconds}`;
},






        statusAuthChech(){
            this.pageViewStatus = this.store.checkTokenAutorisation()
            if(this.pageViewStatus == false){
                this.$router.push('/')
            }
            else{
                this.getUserDataServerQuery()
            }
        },

        logout(){
          this.store.changeAutorisationStatus(false)
            localStorage.setItem('jwtToken', '')
            this.$router.push('/')
            
        },


        //get user data
        getUserDataServerQuery(){
            const url = this.store.urlQuery + '/wp-json/wp/v2/users/me'
            let authToken = localStorage.getItem('jwtToken')

            fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        
            })
            .then(response => response.json())
            .then(result => {
                console.log('Успешный ответ:', result);

                this.userData = result
                this.getPrognozDataList()
                

            })
            .catch(error => {
                console.error('Ошибка:', error);
            
    
                // Обработка ошибки
            });
        },


        //create chart 
        createNatalChartServerRequest(){
            const url = this.store.urlQuery + '/wp-json/wp/v2/user-natal-chart'
            let authToken = localStorage.getItem('jwtToken')
       
            let natalChartDataCreate = {
                "title": JSON.stringify(this.WP_STRING_CURENT_DATE_TIME) ,
                "content": 'test',
                "status": "publish",
                "author": +this.userData.id,
                "acf": {
                    "data_i_vremya": this.WP_STRING_CURENT_DATE_TIME ,
                    "kordinaty": this.WP_STRING_CURENT_LOCATION,
                }
            }

            console.log('Server Data befor create natal chart',natalChartDataCreate)
            console.log('Server Data befor create natal chart',this.WP_STRING_CURENT_DATE_TIME, this.WP_STRING_CURENT_LOCATION)

            fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(natalChartDataCreate) // Преобразование данных в формат JSON
            })
            .then(response => response.json())
            .then(result => {
                console.log('Успешный ответ:', result);
              
                this.titlePost = null
                this.descriptionPost = null
                
                this.getNatalChartListServerQuery()
               

            })
            .catch(error => {
                console.error('Ошибка:', error);
                // Обработка ошибки
                alert('чтото пошло не так')
            });
        },


        //delete natal chart
        deleteNatalChartServerRequest(postId) {
            const url = `${this.store.urlQuery}/wp-json/wp/v2/user-natal-chart/${postId}`;
            const authToken = localStorage.getItem('jwtToken');  // JWT токен для аутентификации

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,  // Передаем авторизационный токен
                    'Accept': 'application/json',
                },
            })
            .then(response => response.json())
            .then(result => {
                console.log('Успешно удалено:', result);


                if(this.userNatalChartList.length <= 1){
                  this.loadStatus = false
                }
              
                this.getNatalChartListServerQuery();
               
            })
            .catch(error => {
                console.error('Ошибка удаления:', error);
                alert('Ошибка при удалении поста');
            });
        },
        

        //get user natal chart list
        getNatalChartListServerQuery(){
   
            const url = this.store.urlQuery + '/wp-json/wp/v2/user-natal-chart?author='+this.userData.id
            let authToken = localStorage.getItem('jwtToken')
            console.log('current url user natal charts', url)
            fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        
            })
            .then(response => response.json())
            .then(result => {
                console.log('Успешный ответ:', result);
                this.userNatalChartList = result
                

                if(this.userNatalChartList && this.userNatalChartList.length > 0){
                  this.userNatalChartsTableListStatusView = true

                  this.WP_STRING_CURENT_LOCATION = this.userNatalChartList[0].acf.kordinaty
                  this.WP_STRING_CURENT_DATE_TIME = this.userNatalChartList[0].acf.data_i_vremya
                  this.userNatalChartListActivIndex = 0
                  this.calculateEquatorialCoordinates(this.WP_STRING_CURENT_LOCATION, this.WP_STRING_CURENT_DATE_TIME)
                }
                else{
                  this.userNatalChartsTableListStatusView = false
                }

            })
            .catch(error => {
                console.error('Ошибка:', error);
            
    
                // Обработка ошибки
            });
        },





        //get user natal chart list
        getPrognozDataList(){
            const url = this.store.urlQuery + '/wp-json/acf/v3/options'
            // let authToken = localStorage.getItem('jwtToken')

            fetch(url, {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        
            })
            .then(response => response.json())
            .then(result => {
                console.log('Успешный ответ прогноз:', result);

                this.serverDataPrognozPlanetInZodiac = result.traktovka_planet_v_znakah
                this.getNatalChartListServerQuery()

            })
            .catch(error => {
                console.error('Ошибка:', error);
            
    
                // Обработка ошибки
            });
        },


        

        getCurrentZodiacData(planetName, currentZodiac){

          const targetPlanet = this.serverDataPrognozPlanetInZodiac.find(planet => planet.nazvanie_planety == planetName);

          return targetPlanet.znaki_zodiaka[currentZodiac].traktovka
        },

    },

    computed: {

    },

    watch: {

    },

    mounted(){
        this.store = useCounterStore()
        this.statusAuthChech()  
    },

}
</script>

<style scoped>
.natal-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}
</style>