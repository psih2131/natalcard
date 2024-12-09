<template>
    <div class="popup popup-registration">
        <div class="popup__close-btn" @click="closePopupStatus">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.694 7.30602C17.102 7.71405 17.102 8.37559 16.694 8.78361L13.4783 11.9993L16.694 15.2164C17.102 15.6244 17.102 16.286 16.694 16.694C16.286 17.102 15.6244 17.102 15.2164 16.694L12.0007 13.4769L8.78361 16.694C8.37559 17.102 7.71405 17.102 7.30602 16.694C6.89799 16.286 6.89799 15.6244 7.30602 15.2164L10.5231 11.9993L7.30602 8.78361C6.89799 8.37559 6.89799 7.71405 7.30602 7.30602C7.71405 6.89799 8.37559 6.89799 8.78361 7.30602L12.0007 10.5217L15.2164 7.30602C15.6244 6.89799 16.286 6.89799 16.694 7.30602Z" fill="#7E84A3"/>
            </svg>  
        </div>

      <p>Авторизация</p>

      <br><br>

      <div class="field-input">
        <p class="field-input__title">userName</p>
        <div class="field-input__wrapper">
            <input type="text" placeholder="userName" v-model="userName">
        </div>
      </div>

      <br><br>

      <div class="field-input">
        <p class="field-input__title">пароль</p>
        <div class="field-input__wrapper">
            <input type="password" placeholder="пароль" v-model="password">
        </div>
      </div>

      <br><br>

      <div class="button-popup-wrapper">
        <button @click="autorisationServerRequest">Авторизация</button>
      </div>


      <p style="color:red;">{{errorText}}</p>


    </div>
</template>


<script>

import { useCounterStore } from '@/stores/counter'






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

},

methods: {
    closePopupStatus(){
       this.store.changePopupStatus(false)
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
            }
            else{
                alert('ошибка при авторизации')
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