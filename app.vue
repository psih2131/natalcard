<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <preloaderSystem />
  </div>
</template>


<script>

import { useCounterStore } from '@/stores/counter.js'
import preloaderSystem from '@/components/preloader.vue'



export default {
    name: "horoskopeApp",
    data() {
        return {
          store: null
        }
    },

    components: {
      preloaderSystem
    },

    methods: {
      
    },

    computed: {
      watchLogitStatus() {
        const store = useCounterStore()
        return store.autorisationStatus
      },
    },

    watch: {
      watchLogitStatus(newValue, oldValue){
        if(newValue == true){
          console.log('autorisation true')
        }
      }
    },

    mounted(){
      this.store = useCounterStore()
      this.store.changePreloaderStatus(false)
    },

}
</script>