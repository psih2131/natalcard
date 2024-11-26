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

    },

    watch: {

    },

    mounted(){
      this.store = useCounterStore()
      this.store.changePreloaderStatus(false)
    },

}
</script>