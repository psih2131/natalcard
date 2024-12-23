<template>
    <main class="account-main" v-if="pageViewStatus">

        <section class="user-settings" v-if="userData">
            <div class="user-settings__container">
                <NuxtLink to="/account/" >
                    натальная карта                                                       
                  </NuxtLink>
                <div class="user-settings__main-info-icon">
                    <img src="@/assets/img/account.png" alt="">
                </div>
                <div class="user-settings__login">{{userData.name}}</div>

                <div class="user-settings__data-table-wrapper">
                    <div class="user-settings__data-table">

                        <div class="user-settings__data-table-row">
                            <div class="user-settings__table-name">ID:</div>
                            <p class="user-settings__table-value">{{ userData.id }}</p>
                        </div>
    
                        <div class="user-settings__data-table-row">
                            <div class="user-settings__table-name">Логин (имя):</div>
                            <p class="user-settings__table-value">{{ userData.name }}</p>
                        </div>
    
                        <div class="user-settings__data-table-row">
                            <div class="user-settings__table-name">О себе:</div>
                            <p class="user-settings__table-value">{{ userData.description }}</p>
                        </div>
    
                        <div class="user-settings__data-table-row">
                            <div class="user-settings__table-name">Email:</div>
                            <p class="user-settings__table-value">{{ userData.email }}</p>
                        </div>
    
                    </div>
                    <div class="user-settings__data-table-btn-row">
                        <button class="edit-btn">Редактирывать</button>
                        <button class="logout-btn" @click="logout()">Выйти из аккаунта</button>
                    </div>
                </div>
               
                
            </div>
        </section>



    </main>
</template>

<script>

definePageMeta({
  layout: 'admin',
//   middleware: 'auth', // Указываем middleware для защиты страницы
});

import { useCounterStore } from '@/stores/counter'

export default {
    data() {
        return {
            store: null,
            pageViewStatus: false,
            userData: null,            
            loadStatus:false,
            userData2: null,
        }
    },

    props: {

    },

    components: {

    },

    methods: {

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

                this.getUserDataServerQuery2()


            })
            .catch(error => {
                console.error('Ошибка:', error);
            
    
                // Обработка ошибки
            });
        },



        getUserDataServerQuery2(){
            const url = this.store.urlQuery + '/wp-json/wp/v2/users/me/settings/'
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

                this.userData2 = result


            })
            .catch(error => {
                console.error('Ошибка:', error);
            
    
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
        this.statusAuthChech()  
    },

}
</script>

