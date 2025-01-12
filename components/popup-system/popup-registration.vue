<template>
    <div class="popup popup-registration">
        <div class="popup__close-btn" @click="closePopupStatus">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#fff"/>
            </svg> 
        </div>

        <p class="popup-registration__title">Регистрация</p>
        <p class="popup-registration__subtitle">Укажите ваши данные</p>


        <component__input_field 

        :placeholderSet="'Придумайте логин'"
        :setValue="userName"
        @getValue="userName = $event"
        :errorText="userNameError"
        />


        <component__input_field 

        :placeholderSet="'Укажите email'"
        :setValue="email"
        @getValue="email = $event"
        :errorText="emailError"
        />


        <component__input_field 

        :placeholderSet="'Придумайте пароль'"
        :typeInp="'password'"
        :setValue="password"
        @getValue="password = $event"
        :errorText="passwordError"
        />

        <div class="personal-data-checbox">
            <label>
                <input v-model="politickStatus" type="checkbox">
            </label>
            <p class="personal-data-checbox__text">Я согласен с <a href="">политикой конфиденциальности</a> и <a href="">обработкой персональных данных</a></p>
        </div>




      <div class="button-popup-wrapper">
        <button class="button-popup" @click="validationData()">Регистрация</button>
      </div>


      <p class="popup-registration__error" v-if="errorText">{{errorText}}</p>


      <div class="button-popup-wrapper-yandex">
        <!-- <button class="yandex-id-btn" @click="YandexIdAutorisation()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="12" fill="#FC3F1D"/>
                <path d="M15.5464 18.0546H13.431V7.58375H12.4863C10.7567 7.58375 9.85201 8.44855 9.85201 9.73911C9.85201 11.2026 10.4773 11.8812 11.7679 12.746L12.8323 13.4644L9.77218 18.0546H7.49707L10.2511 13.9567C8.66789 12.8258 7.77647 11.7215 7.77647 9.85885C7.77647 7.53053 9.39964 5.94727 12.473 5.94727H15.5331V18.0546H15.5464Z" fill="white"/>
            </svg>
            Войти с Яндекс ID    
        </button> -->

        <div id="yandexIdButton"></div>
        <div v-if="error" class="error">
        <p>Что-то пошло не так:</p>
        {{ error }}
        </div>
      </div>

      <div class="popup-registration__popup-link">
        <div class="popup-registration__popup-link-litle" @click="goToLoginAccount()">У меня уже есть акаунт, хочу авторизоватся</div>
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
        userNameError: null,

        email: null,
        emailError: null,

        password: null,
        passwordError: null,

        politickStatus:false,

        errorText: null,
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

    goToLoginAccount(){
        this.store.changePopupName('popup-login')
    },


    goToDoneRegistrPage(){
        this.store.changePopupName('popup-user-created')
    },

    validationData(){

       if(!this.userName || this.userName == '' || this.userName == ' ' || this.userName.length <= 3 ){
        this.userNameError = 'Логин слишком короткий'
       }
       else{
        this.userNameError = null
       }


       if(!this.email || this.validateEmail(this.email) == false ){
        this.emailError = 'Некоректный email'
       }
       else{
        this.emailError = null
       }


       if(!this.password || this.password.length < 8){
        this.passwordError = 'Пароль слишком короткий'
       }
       else{
        this.passwordError = null
       }

       if(this.politickStatus == false){
        this.errorText = 'Подтвердите что вы согласны с политикой обработки персональных данных'
       }
       else{
        this.errorText = null
       }



       if(!this.userNameError && !this.emailError && !this.errorText && !this.passwordError){
        this.registrationServerRequest()
       }

    },


    // Функция для валидации
    validateEmail(emaildata) {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emaildata);
    },

    registrationServerRequest(){
        const url = this.store.urlQuery + '/wp-json/custom/v1/register'


        let registrationData = {
            "username": this.userName,
            "email": this.email,
            "password": this.password,
        }

        console.log(registrationData)



        fetch(url, {
        method: 'POST',
        headers: {
            // 'Authorization': `Bearer ${token}`,
            // 'Accept': 'application/json',
           "Content-Type": "application/json",


        },
        body: JSON.stringify(registrationData) // Преобразование данных в формат JSON
        })
        .then(response => response.json())
        .then(result => {
            console.log('Успешный ответ:', result);

            if(result.success && result.success == true){
                this.errorText = null
                this.goToDoneRegistrPage()
            }
            else{
                if(result.code && result.code == "username_exists"){
                    this.errorText = 'Пользователь с таким именем уже существует'
                }
                else{
                 
                    this.store.changeInfoAlertStatus(
                    {
                    'alertType': 3, 
                    'alertText': 'Произошла ошибка при регистрации, попробуйте позже '
                    }
                    )
                }
            }

        })
        .catch(error => {
            console.error('Ошибка:', error);
            this.errorText = 'Произошла ошибка при регистрации, попробуйте позже'
        
            this.store.changeInfoAlertStatus(
                    {
                        'alertType': 3, 
                        'alertText': 'ошибка при регистрации '
                    }
                )
   
            // Обработка ошибки
        });
    },


    initializeYandexSuggest() {

      
if (window.YaAuthSuggest) {
  console.log('yandex id loaded')
  window.YaAuthSuggest
    .init(
      {
        client_id: '981e67812f0a4543bf818fde759d3069',
        response_type: 'token',
        redirect_uri: 'http://localhost:3000/test',
      },
      'http://localhost:3000',
      {
        view: 'button',
        parentId: 'yandexIdButton',
        buttonView: 'main',
        buttonTheme: 'light',
        buttonSize: 'm',
        buttonBorderRadius: 15,
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
      this.registerOrLoginWithYandex(oauthToken,data.login, data.default_email, data.id, data)
  })
  .catch(error => {
      console.error('Ошибка при выполнении запроса:', error);
  });
},


registerOrLoginWithYandex(token, username, email, yandexId, allData) {

  const url = this.store.urlQuery + '/wp-json/custom/v1/register?heshpass=true'

  let registrationData = {
      "username": username,
      "email": email,
      "password": `${yandexId}${username}`,
  }

  console.log(registrationData)



  fetch(url, {
  method: 'POST',
  headers: {
      // 'Authorization': `Bearer ${token}`,
      // 'Accept': 'application/json',
     "Content-Type": "application/json",


  },
  body: JSON.stringify(registrationData) // Преобразование данных в формат JSON
  })
  .then(response => response.json())
  .then(result => {
      console.log('Успешный ответ:', result);

      if(result && result.success && result.success == true){
        console.log('Registration success')
        this.YandexIdAutorisation(username, yandexId)
      }
      else{
        if(result.code && result.code == 'username_exists'){
          console.log('username_exists')
          this.YandexIdAutorisation(username, yandexId)
        }
        else{
          console.log('Error')
          this.store.changeInfoAlertStatus(
            {
            'alertType': 3, 
            'alertText': 'ошибка при авторизации Yandex ID'
            }
            )
        }
      }

     

  })
  .catch(error => {
      console.error('Ошибка:', error);
     

      this.store.changeInfoAlertStatus(
            {
            'alertType': 3, 
            'alertText': 'ошибка при авторизации Yandex ID'
            }
            )

      // Обработка ошибки
  });


},





YandexIdAutorisation(username, yandexId){
const url = this.store.urlQuery + '/wp-json/jwt-auth/v1/token'


  let autorisationData = {
      "username": username,
      "password": `${yandexId}${username}`,
      "extra_param": 'heshpass',
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
         
          this.store.changeInfoAlertStatus(
            {
            'alertType': 1, 
            'alertText': 'Успешная авторизация пользователя'
            }
            )

          this.closePopupStatus()
          this.errorText = null
      }
      else{
        this.store.changeInfoAlertStatus(
        {
        'alertType': 3, 
        'alertText': 'ошибка при авторизации'
        }
        )
          this.errorText = 'ошибка при авторизации, проверте введенные данные'
      }

  })
  .catch(error => {
      console.error('Ошибка:', error);

      this.store.changeInfoAlertStatus(
        {
        'alertType': 3, 
        'alertText': 'ошибка при авторизации'
        }
        )

      // Обработка ошибки
  });
},

},

computed: {

},

watch: {

},

mounted(){
    this.store = useCounterStore()
    this.initializeYandexSuggest()
},

}
</script>