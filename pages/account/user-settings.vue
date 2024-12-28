<template>
    <main class="account-main" v-if="pageViewStatus">

        <section class="user-settings" v-if="userData">
            <div class="user-settings__container">
                <NuxtLink to="/account/" class="user-settings__back-link">
                    <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5607 0.43934C12.1464 1.02513 12.1464 1.97487 11.5607 2.56066L3.62132 10.5L11.5607 18.4393C12.1464 19.0251 12.1464 19.9749 11.5607 20.5607C10.9749 21.1464 10.0251 21.1464 9.43934 20.5607L0.439341 11.5607C-0.146446 10.9749 -0.146446 10.0251 0.439341 9.43934L9.43934 0.43934C10.0251 -0.146447 10.9749 -0.146447 11.5607 0.43934Z" fill="#8B8B8C"/>
                    </svg>
                    <span class="user-settings__back-link-text">Назад</span>
                                                                          
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
                            <div class="user-settings__table-name">Тип аккаунта:</div>
                            <p class="user-settings__table-value">Базовый</p>
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
                        <!-- <button class="edit-btn">Редактирывать</button> -->
                        <button class="logout-btn" @click="logout()">Выйти из аккаунта</button>
                        <button class="del-btn" @click="delAccount()">Удалить аккаунт</button>
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


        delAccount(){
            const url = this.store.urlQuery + '/wp-json/wp/v2/users/me';
            let authToken = localStorage.getItem('jwtToken');

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(result => {
                    console.log('Успешно удален:', result);

                    if (result.success) {
                        alert('Ваш аккаунт успешно удален')
                        this.logout()
                    }
                })
                .catch(error => {
                    console.error('Ошибка при удалении аккаунта:', error);
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

