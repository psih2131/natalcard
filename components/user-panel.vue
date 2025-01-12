<template>
    <div class="user-panel">
        <div class="user-panel__close" @click="closeUserPanel()">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.543945 0.543945C1.2692 -0.181315 2.44508 -0.181315 3.17034 0.543945L13 10.3736L22.8297 0.543945C23.5549 -0.181315 24.7308 -0.181315 25.4561 0.543945C26.1813 1.2692 26.1813 2.44508 25.4561 3.17034L15.6264 13L25.4561 22.8297C26.1813 23.5549 26.1813 24.7308 25.4561 25.4561C24.7308 26.1813 23.5549 26.1813 22.8297 25.4561L13 15.6264L3.17034 25.4561C2.44508 26.1813 1.2692 26.1813 0.543945 25.4561C-0.181315 24.7308 -0.181315 23.5549 0.543945 22.8297L10.3736 13L0.543945 3.17034C-0.181315 2.44508 -0.181315 1.2692 0.543945 0.543945Z" fill="white"/>
                </svg>
                
        </div>
        <div class="user-panel__top">
            <div class="user-panel__account-name">
                <div class="header-account__photo-wrapper">
                    <img src="@/assets/img/account.png" alt="">
                </div>
                <p class="user-panel__account-title" v-if="userData && userData.name">{{userData.name}}</p>
            </div>

            <nav class="user-panel__nav">
                <ul class="user-panel__ul-list">
                    <li class="user-panel__li">
                        <NuxtLink to="/account/" class="user-panel__li-link" @click="closeUserPanel()">
                            <p class="user-panel__li-link-text">
                                Натальная карта
                            </p>

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.36077 3.29292C9.6659 3.59804 9.74089 4.06447 9.54678 4.44985C9.04068 5.45471 8.75521 6.59037 8.75521 7.79559C8.75521 11.9097 12.0903 15.2448 16.2044 15.2448C17.4097 15.2448 18.5453 14.9594 19.5502 14.4532C19.9356 14.2591 20.402 14.3341 20.7071 14.6393C21.0122 14.9444 21.0872 15.4108 20.8931 15.7962C19.3396 18.8806 16.1428 21 12.4492 21C7.23056 21 3 16.7695 3 11.5508C3 7.85721 5.11941 4.66041 8.20384 3.10691C8.58923 2.91281 9.05565 2.9878 9.36077 3.29292ZM6.8217 6.66962C5.68637 7.97743 5 9.68433 5 11.5508C5 15.6649 8.33513 19 12.4492 19C14.3157 19 16.0226 18.3137 17.3304 17.1783C16.9611 17.2222 16.5853 17.2448 16.2044 17.2448C10.9858 17.2448 6.75521 13.0143 6.75521 7.79559C6.75521 7.41474 6.77779 7.03898 6.8217 6.66962Z" fill="white" fill-opacity="0.5"/>
                            </svg>
                                
                        </NuxtLink>
                    </li>

                    <li class="user-panel__li">
                        <NuxtLink to="/account/user-settings" class="user-panel__li-link" @click="closeUserPanel()">
                            <p class="user-panel__li-link-text">
                                Данные пользывателя
                            </p>

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4C11.4477 4 11 4.44772 11 5C11 6.69226 8.95399 7.53974 7.75738 6.34314C7.36686 5.95261 6.73369 5.95261 6.34317 6.34314C5.95265 6.73366 5.95265 7.36683 6.34317 7.75735C7.53982 8.954 6.69223 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C6.69236 13 7.53964 15.0461 6.34311 16.2426C5.95258 16.6332 5.95258 17.2663 6.34311 17.6569C6.73363 18.0474 7.36679 18.0474 7.75732 17.6569C8.9539 16.4603 11 17.3077 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 17.3077 15.046 16.4602 16.2427 17.6568C16.6332 18.0474 17.2664 18.0474 17.6569 17.6568C18.0474 17.2663 18.0474 16.6332 17.6569 16.2426C16.4603 15.0461 17.3077 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C17.3078 11 16.4601 8.95405 17.6568 7.75737C18.0473 7.36684 18.0473 6.73368 17.6568 6.34315C17.2663 5.95263 16.6331 5.95263 16.2426 6.34315C15.046 7.53979 13 6.69219 13 5C13 4.44772 12.5523 4 12 4ZM9.00816 4.77703C9.12224 3.2243 10.4181 2 12 2C13.5819 2 14.8778 3.2243 14.9918 4.77703C16.1704 3.75977 17.9525 3.8104 19.071 4.92894C20.1896 6.04748 20.2402 7.82955 19.2229 9.00816C20.7757 9.12221 22 10.4181 22 12C22 13.5819 20.7757 14.8778 19.223 14.9918C20.2403 16.1704 20.1896 17.9525 19.0711 19.0711C17.9525 20.1896 16.1705 20.2402 14.9918 19.2229C14.8778 20.7757 13.5819 22 12 22C10.4181 22 9.12221 20.7757 9.00816 19.2229C7.82955 20.2402 6.04745 20.1896 4.92889 19.0711C3.81034 17.9525 3.75972 16.1704 4.77702 14.9918C3.2243 14.8778 2 13.5819 2 12C2 10.4181 3.22433 9.12221 4.77709 9.00816C3.75978 7.82955 3.81041 6.04747 4.92896 4.92892C6.0475 3.81038 7.82955 3.75975 9.00816 4.77703Z" fill="white" fill-opacity="0.5"/>
                                <path d="M12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10ZM9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157Z" fill="white" fill-opacity="0.5"/>
                            </svg>
                                
                            
                        </NuxtLink>
                    </li>

                    <li class="user-panel__li">
                        <NuxtLink to="mailto:mail:support@natalnaya-karta-online.ru" class="user-panel__li-link" @click="closeUserPanel()">
                            <p class="user-panel__li-link-text">
                                Техподдержка
                            </p>

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V17C22 18.1046 21.1046 19 20 19H15.4142L12.7071 21.7071C12.3166 22.0976 11.6834 22.0976 11.2929 21.7071L8.58579 19H4C2.89543 19 2 18.1046 2 17V6ZM20 6H4V17H9C9.26522 17 9.51957 17.1054 9.70711 17.2929L12 19.5858L14.2929 17.2929C14.4804 17.1054 14.7348 17 15 17H20V6ZM6 9.5C6 8.94772 6.44772 8.5 7 8.5H17C17.5523 8.5 18 8.94772 18 9.5C18 10.0523 17.5523 10.5 17 10.5H7C6.44772 10.5 6 10.0523 6 9.5ZM6 13.5C6 12.9477 6.44772 12.5 7 12.5H13C13.5523 12.5 14 12.9477 14 13.5C14 14.0523 13.5523 14.5 13 14.5H7C6.44772 14.5 6 14.0523 6 13.5Z" fill="white"/>
                            </svg>
                                
                                
                            
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="user-panel__down">
            <button class="logout-btn" @click="logout()">Выйти из аккаунта</button>
        </div>


    </div>
</template>


<script>

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
    closeUserPanel(){
        this.$emit('closeUserPanel')
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