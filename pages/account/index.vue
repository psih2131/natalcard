<template>
    <main class="account-main" v-if="pageViewStatus">
        <section class="account-main__front">
            <div class="container">
                <br><br><br><br><br>
                <br><br><br><br><br>
                <h1>Кабинет пользывателя</h1>
                <br>
                <p v-if="userData">user id: {{ userData.id }}</p>
                <p v-if="userData">name: {{ userData.name }}</p>
                <p v-if="userData">description: {{ userData.description }}</p>
                <br>

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

import { useCounterStore } from '@/stores/counter'


export default {

 
    data() {
        return {
            store: null,
            pageViewStatus: false,

            userData: null,

            titlePost: '',
            descriptionPost: '',
            userNatalChartList: [],
            
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
            localStorage.setItem('jwtToken', '')
            this.statusAuthChech()
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

