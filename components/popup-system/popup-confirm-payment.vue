<template>
    <div class="popup popup-user-created">
        <div class="popup__close-btn" @click="closePopupStatus">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#fff"/>
            </svg> 
        </div>

        <div class="popup-user-created__img-wrapper">
            <img src="@/assets/img/born_img-1.png" alt="" class="popup-user-created__img">
        </div>
        <p class="popup-user-created__title">Успех</p>
        <p class="popup-user-created__subtitle">Все функции аккаунта разблокирываны</p>

    </div>
</template>


<script>

import { useCounterStore } from '@/stores/counter'
import component__input_field from '@/components/input-field.vue'



export default {

data() {
    return {
        store: null,

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


   changeTypeAccount(){
        const url = this.store.urlQuery + '/wp-json/wp/v2/users/me'
        let authToken = localStorage.getItem('jwtToken')
        let allConfirmData = this.store.dataConfirmPayment
    
        let userDataUpdate = {
            "status_account": '2',
            "email_payment": allConfirmData.email
        }
        console.log('changeTypeAccount data',userDataUpdate)

        fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDataUpdate) // Преобразование данных в формат JSON
        })
        .then(response => response.json())
        .then(result => {
            console.log('Успешный ответ:', result);
            this.store.changeUpdateAccountDataRequest(true)

            

        })
        .catch(error => {
            console.error('Ошибка:', error);
            // Обработка ошибки
            alert('чтото пошло не так')
        });
    },

   

},

computed: {

},

watch: {

},

mounted(){
    this.store = useCounterStore()
    this.changeTypeAccount()
},

}
</script>