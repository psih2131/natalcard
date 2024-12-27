<template>
    <div class="popup popup-registration">
        <div class="popup__close-btn" @click="closePopupStatus">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#fff"/>
            </svg>
                 
        </div>

        <p class="popup-registration__title">Вход в акаунт</p>
        <p class="popup-registration__subtitle">Добро пожаловать</p>

        <component__input_field 
        :titleInput="'Логин'"
        :placeholderSet="'Укаэите ваш логин'"
        :setValue="userName"
        @getValue="userName = $event"
        />


        <component__input_field 
        :titleInput="'Пароль'"
        :placeholderSet="'Введите пароль'"
        :setValue="password"
        :typeInp="'password'"
        @getValue="password = $event"
        />
    
 
      <div class="button-popup-wrapper">
        <button class="button-popup" @click="autorisationServerRequest">Авторизация</button>
      </div>

      <div class="button-popup-wrapper-yandex">
        <button class="yandex-id-btn" @click="YandexIdAutorisation()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="12" fill="#FC3F1D"/>
                <path d="M15.5464 18.0546H13.431V7.58375H12.4863C10.7567 7.58375 9.85201 8.44855 9.85201 9.73911C9.85201 11.2026 10.4773 11.8812 11.7679 12.746L12.8323 13.4644L9.77218 18.0546H7.49707L10.2511 13.9567C8.66789 12.8258 7.77647 11.7215 7.77647 9.85885C7.77647 7.53053 9.39964 5.94727 12.473 5.94727H15.5331V18.0546H15.5464Z" fill="white"/>
            </svg>
            Войти с Яндекс ID    
        </button>

        <div id="container"></div>
        <div v-if="tokenData" class="token-data">
        <p>Сообщение с токеном:</p>
        <pre>{{ tokenData }}</pre>
        </div>
        <div v-if="error" class="error">
        <p>Что-то пошло не так:</p>
        <pre>{{ error }}</pre>
        </div>
      </div>


      <p class="popup-registration__error" v-if="errorText">{{errorText}}</p>

      <div class="popup-registration__popup-link">
        <div class="popup-registration__popup-link-litle" @click="goToRegistrAccount()">У мeня нет акаунта, хочу зарегистрирыватся</div>
      </div>


    </div>
</template>


<script>

import { useCounterStore } from '@/stores/counter'
import component__input_field from '@/components/input-field.vue'





export default {

data() {
    return {
        store: null,
        userName: null,
        password: null,
        errorText: null,
        tokenData: null,
    }
},

props: {

},

components: {
    component__input_field
},

methods: {
    closePopupStatus(){
      
       this.store.changePopupStatus(false)
    },

    goToRegistrAccount(){
        this.store.changePopupName('popup-registration')
    },




    autorisationServerRequest(){
        const url = this.store.urlQuery + '/wp-json/jwt-auth/v1/token'


        let autorisationData = {
            "username": this.userName,
            "password": this.password,
        }

        console.log(autorisationData)



        fetch(url, {
        method: 'POST',
        headers: {
            // 'Authorization': `Bearer ${token}`,
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autorisationData) // Преобразование данных в формат JSON
        })
        .then(response => response.json())
        .then(result => {
            console.log('Успешный ответ:', result);
            console.log(result.token)

            if(result.user_nicename){
               
                let nameUser = result.user_display_name

                localStorage.setItem('jwtToken', result.token);
                this.store.changeAutorisationStatus(true)
                this.$router.push('/account')
                alert('Успешная авторизация user:', nameUser)
                this.closePopupStatus()
                this.errorText = null
            }
            else{
                alert('ошибка при авторизации')
                this.errorText = 'ошибка при авторизации, проверте введенные данные'
            }

        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('ошибка при авторизации')
   
            // Обработка ошибки
        });
    },



    YandexIdAutorisation(){

    },

    initializeYandexSuggest() {
      if (window.YaAuthSuggest) {
        window.YaAuthSuggest
          .init(
            {
              client_id: '981e67812f0a4543bf818fde759d3069',
              response_type: 'token',
              redirect_uri: 'https://natalnaya-karta-online.ru/test',
            },
            'https://natalnaya-karta-online.ru',
            {
              view: 'button',
              parentId: 'container',
              buttonView: 'main',
              buttonTheme: 'light',
              buttonSize: 'm',
              buttonBorderRadius: 0,
            }
          )
          .then((result) => result.handler())
          .then((data) => {
            console.log('Сообщение с токеном: ', data);
            this.tokenData = data;
            this.getYandexData()
          })
          .catch((error) => {
            console.log('Что-то пошло не так: ', error);
            this.error = JSON.stringify(error, null, 2);
          });
      } else {
        this.error = 'YaAuthSuggest не доступен.';
      }
    },



    getYandexData(){
        const oauthToken = this.tokenData.access_token ; // Замените на свой OAuth токен
        const jwtSecret = '81e67ad964d0462b9d5c3db552bf10b0'; // Если необходимо, замените на ваш секретный ключ
        const format = 'json'; // Вы можете заменить на 'xml' или 'jwt' в зависимости от формата ответа

        const url = `https://login.yandex.ru/info?format=${format}&jwt_secret=${jwtSecret}`;

        fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `OAuth ${oauthToken}`,  // Используйте ваш OAuth токен
            'Content-Type': 'application/json'       // Указываем тип контента
        }
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
            }
            return response.json();  // Преобразуем ответ в JSON
        })
        .then(data => {
            console.log('Ответ от API:', data);
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });
    },


},

computed: {

},

watch: {

},

mounted(){
    this.store = useCounterStore()


     // Динамическая загрузка скрипта Яндекса
     const script = document.createElement('script');
        script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
        script.onload = this.initializeYandexSuggest;
        script.onerror = () => {
        this.error = 'Не удалось загрузить SDK Яндекса.';
        };
        document.head.appendChild(script);
},

}
</script>



<style>
.token-data,
.error {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.token-data p,
.error p {
  font-weight: bold;
}
</style>