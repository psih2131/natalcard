<template>
    <div class="app">
        <component__header />
        
        <slot/>
    
        <component__footer />
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter.js'
import component__header from '@/components/header.vue'
import component__footer from '@/components/footer.vue'

export default {
    data() {
        return {
            store: null,
        }
    },

    components: {
        component__header,
        component__footer,
    },

    methods: {
        SERVER_QUERY_GET_REQUEST_LIST() {

        let url = `${this.store.urlQuery}/wp-json/wp/v2/our-blog`;


        console.log(url)


        fetch(url, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(result => {
                console.log('Успешный ответ:', result);
                
                if(result && result.length && result.length > 0 ){
                    this.store.changeAllPosts(result)
                }
                

            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
        },
    },

    computed: {

    },

    watch: {

    },

    mounted(){
        // this.store = useCounterStore()
        // this.SERVER_QUERY_GET_REQUEST_LIST()
    },


}
</script>