<template>
    <div class="preloader-conteiner" v-if="watchPreloaderStatus">
        <div class="preloader">
            <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        </div>
    </div>
</template>


<script>
import { useCounterStore } from '@/stores/counter'

// import popup__edit_service from '@/components/popup-system/popup__edit-service.vue'
// import popup__request_created from '@/components/popup-system/popup__request-created.vue'



export default {

data() {
    return {
    //  popupStatus: true,
    //  currentPopup: '',

    store: null,
    preloaderStatus: null,

    }
},

props: {

},

components: {
    // popup__edit_service,
    // popup__request_created,
},

methods: {

},

computed: {

    watchPreloaderStatus() {
      const store = useCounterStore()
      return store.preloaderStatus
    },

  },

watch: {
   
},

mounted(){
 
},

}
</script>