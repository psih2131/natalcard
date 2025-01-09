<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <preloaderSystem />
    <notificationSystem />

  </div>
</template>


<script>

import { useCounterStore } from '@/stores/counter.js'
import preloaderSystem from '@/components/preloader.vue'
import notificationSystem from '@/components/inform-alert-system/inform-alert-system-controller.vue'



export default {
    name: "horoskopeApp",
    data() {
        return {
          store: null
        }
    },

    components: {
      preloaderSystem,
      notificationSystem,
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