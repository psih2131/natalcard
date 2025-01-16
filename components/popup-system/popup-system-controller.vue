<template>
    <div v-if="watchPopupStatus" class="popup-system popup-system-wrapper">
      
        <popup__registration v-if="watchPopupName == 'popup-registration'" />

        <popup__login v-if="watchPopupName == 'popup-login'" />

        <popup__user_created v-if="watchPopupName == 'popup-user-created'" />

        <popup__pay_form v-if="watchPopupName == 'popup-pay-form'" />

    </div>
</template>


<script>
import { useCounterStore } from '@/stores/counter'

import popup__registration from '@/components/popup-system/popup-registration.vue'
import popup__login from '@/components/popup-system/popup-login.vue'
import popup__user_created from '@/components/popup-system/popup-user-created.vue'
import popup__pay_form from '@/components/popup-system/popup-pay-form.vue'




export default {

data() {
    return {
     popupStatus: true,
     currentPopup: '',

    }
},

props: {

},

components: {
    popup__registration,
    popup__login,
    popup__user_created,
    popup__pay_form,
},

methods: {

},

computed: {
    watchPopupStatus() {
      const store = useCounterStore()
      return store.popupStatus
    },

    watchPopupName() {
      const store = useCounterStore()
      return store.popupName
    },
  },

watch: {

},

mounted(){

},

}
</script>