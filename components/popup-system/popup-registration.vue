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
        :titleInput="'Логин'"
        :placeholderSet="'Придумайте логин'"
        :setValue="userName"
        @getValue="userName = $event"
        :errorText="userNameError"
        />


        <component__input_field 
        :titleInput="'Email'"
        :placeholderSet="'Укажите email'"
        :setValue="email"
        @getValue="email = $event"
        :errorText="emailError"
        />


        <component__input_field 
        :titleInput="'Пароль'"
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
                alert('успешная регистрация')
            }
            else{
                this.errorText = 'Произошла ошибка при регистрации, попробуйте позже'
                alert('ошибка при регистрации')
            }




        })
        .catch(error => {
            console.error('Ошибка:', error);
            this.errorText = 'Произошла ошибка при регистрации, попробуйте позже'
            alert('ошибка при регистрации')
   
            // Обработка ошибки
        });
    }
},

computed: {

},

watch: {

},

mounted(){
    this.store = useCounterStore()
},

}
</script>