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

      <section class="account-natal-data-sec">
        <div class="container">
          <div class="account-natal-data-sec__icon-wrapper"></div>

          <div class="account-natal-data-sec__info-wrapper">
            <div class="account-natal-data-sec__natal-history natal-history">
              <h2 class="natal-history__title">Ваши натальные карты</h2>

              <ul class="natal-history__list">
                <li class="natal-history__list-val" v-for="item in userNatalChartList" :key="item">
                  {{item.id}} {{ item.date }}
                </li>
              </ul>

              
            </div>
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


      
        <section class="account-main__front">
            <div class="container">


              <div class="natal-chart" v-if="loadStatus">
                 
                <svg :width="width" :height="height" :viewBox="viewBox">
                  <!-- Circle representing the zodiac -->
                  <circle cx="250" cy="250" r="200" stroke="black" stroke-width="2" fill="transparent"/>
              
                  <!-- Drawing the 12 zodiac signs -->
                  <g v-for="(sign, index) in zodiacSigns" :key="index">
                    <line 
                      :x1="250" 
                      :y1="250" 
                      :x2="getX(index)" 
                      :y2="getY(index)" 
                      stroke="black" 
                      stroke-width="1"/>
                    <text 
                      :x="getX(index)" 
                      :y="getY(index)" 
                      text-anchor="middle" 
                      :dy="getTextOffset(index)">
                      {{ sign }}
                    </text>
                  </g>
              
                  <!-- Planets -->
                  <g v-for="(planet, index) in planets" :key="index">
                    <circle :cx="getPlanetX(planet.lon)" :cy="getPlanetY(planet.lon)" r="10" :fill="planet.color" />
                    <text 
                      :x="getPlanetX(planet.lon)" 
                      :y="getPlanetY(planet.lon)" 
                      text-anchor="middle" 
                      dy="-15">
                      {{ planet.name }}
                    </text>
                  </g>
              
                  <!-- Aspects -->
                  <line
                    v-for="(aspect, index) in aspects"
                    :key="index"
                    :x1="getPlanetX(aspect.planet1.lon)"
                    :y1="getPlanetY(aspect.planet1.lon)"
                    :x2="getPlanetX(aspect.planet2.lon)"
                    :y2="getPlanetY(aspect.planet2.lon)"
                    :stroke="getAspectColor(aspect.type)"
                    stroke-width="2"
                  />
                </svg>
          </div>

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



          

                <NuxtLink to="/account/user-settings">
                  настройки пользывателя                                                        
                </NuxtLink>





                <hr>
                <br>
                <h3>Создать прогноз</h3>
                <br>
                <input type="text" placeholder="title chart" v-model="titlePost">
                <br>
                <textarea name="description chart" id="" v-model="descriptionPost"></textarea>
                <br>
                <button @click="createNatalChartServerRequest">Создать прогноз</button>

                <br>
                <br>

                <hr>
                <br>
                <h3>Мои прогнозы</h3>
                <ul>
                    <li v-for="item in userNatalChartList" :key="item">
                        {{ item.id }}<br>
                        {{ item.title.rendered }}<br>
                        {{ item.content.rendered }}
                        <br><br>
                    </li>
                </ul>

                <br>
                <hr>

                <br><br>
                <br>

                <hr>

                <div class="form-create-natal-chart">
                    <h2 class="form-create-natal-chart__title">Расчитать натальную карту</h2>
                    <div class="form-create-natal-chart__form-row">
                        <div class="form-create-natal-chart__input-wrapper">
                            <p class="form-create-natal-chart__input-wrapper-title">Дата рождения</p>
                            <input type="text" v-model="dateBorn">
                        </div>

                        <div class="form-create-natal-chart__input-wrapper">
                            <p class="form-create-natal-chart__input-wrapper-title">Время рождения</p>
                            <input type="text" v-model="timeBorn">
                        </div>
                      
                    </div>
                    <div class="form-create-natal-chart__form-row">
                        <div class="form-create-natal-chart__input-wrapper">
                            <p class="form-create-natal-chart__input-wrapper-title">Место рождения долгота</p>
                            <input type="text" v-model="dolgota">
                        </div>

                        <div class="form-create-natal-chart__input-wrapper">
                            <p class="form-create-natal-chart__input-wrapper-title">Место рождения широта</p>
                            <input type="text" v-model="shirota">
                        </div>
                    </div>

                    <!-- <button @click="getEphimerids()">расчитать натальную карту</button> -->
                </div>


                <button @click="calculateEquatorialCoordinates()">adasdasasd</button>





               



                <br>
                <br>
                <button @click="logout()">выйти из аккаунта</button>
                
                <br><br><br><br><br>
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
import { SearchMoonQuarter, Equator, Observer, Vector, Ecliptic  } from 'astronomy-engine';
import { useCounterStore } from '@/stores/counter'
import moment from "moment-timezone";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


export default {

 
    data() {
        return {
            store: null,
            pageViewStatus: false,

            userData: null,

            titlePost: '',
            descriptionPost: '',
            userNatalChartList: [],

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
            zodiacSigns: ["Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"],
            planets: [],  // Сюда будем добавлять данные о планетах
            aspects: [], // Populated dynamically
            
            loadStatus:false,
            
        }
    },

    props: {

    },

    components: {
      VueDatePicker
    },

    methods: {

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
          this.curentLocation.lng = this.longitudeLocation
        }

        console.log(currentDate, currentTime)

        let inputDateTime = `${currentDate} ${currentTime}`

        dateAndTimeUTCConvert = this.calculateTimeInUTC(curentLocation.lng, inputDateTime )

        console.log('current coords',curentLocation)
        console.log('current grinvich time', dateAndTimeUTCConvert)

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
        { name: "Солнце", lon: sunEcliptic.elon, color: "yellow" },
        { name: "Луна", lon: moonEcliptic.elon, color: "silver" },
        { name: "Меркурий", lon: mercuryEcliptic.elon, color: "gray" },
        { name: "Венера", lon: venusEcliptic.elon, color: "yellow" },
        { name: "Марс", lon: marsEcliptic.elon, color: "red" },
        { name: "Юпитер", lon: jupiterEcliptic.elon, color: "orange" },
        { name: "Сатурн", lon: saturnEcliptic.elon, color: "gold" },
        { name: "Уран", lon: uranusEcliptic.elon, color: "lightblue" },
        { name: "Нептун", lon: neptuneEcliptic.elon, color: "blue" },
        { name: "Плутон", lon: plutoEcliptic.elon, color: "brown" },
      ];

      this.calculateAspects(); // Расчет аспектов после получения данных планет
      this.loadStatus = true;
    },


        calcEcliptic(data){
            const vectorData = data.vec;
            const currentEclipticData = Ecliptic(vectorData);
            return currentEclipticData;
        },

        getZodiac(elon, planetName) {
        const signs = ["Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"];
        const zodiacSign = signs[Math.floor(+elon / 30)];
        console.log(`Planet is in ${zodiacSign}`);
        return `${planetName} в ${zodiacSign}`;
        },


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
        const angle = (index * 30 + 15) * (Math.PI / 180);  // 30 градусов на знак
        return 250 + 200 * Math.cos(angle);  // 250 - центр, 200 - радиус
        },

        getY(index) {
        const angle = (index * 30 + 15) * (Math.PI / 180);
        return 250 + 200 * Math.sin(angle);
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

                this.getNatalChartListServerQuery()

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
                "title": this.titlePost,
                "content": this.descriptionPost,
                "status": "publish",
                "author": +this.userData.id,
            }

            console.log(natalChartDataCreate)

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
                alert('прогноз готов')

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
        

        //get user natal chart list
        getNatalChartListServerQuery(){
            const url = this.store.urlQuery + '/wp-json/wp/v2/user-natal-chart?author='+this.userData.id
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
                this.userNatalChartList = result

                

            })
            .catch(error => {
                console.error('Ошибка:', error);
            
    
                // Обработка ошибки
            });
        },




        //create post
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