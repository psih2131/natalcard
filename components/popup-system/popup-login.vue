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