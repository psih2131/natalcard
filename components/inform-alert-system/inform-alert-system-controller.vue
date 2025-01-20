<template >

    <div class="inform-alert-system" 
    v-if="showStatus"  
    :class="{'inform-alert-system_activ':animAtionStatus == true}">

        
        <div  class="inform-alert-system__bg"></div>
     
        
        <div class="inform-alert-system__element" 
        :class="{'alert-green': +showStatus == 1 , 'alert-yellow': +showStatus == 2, 'alert-red': +showStatus == 3} ">
            <p class="inform-alert-system__element-text">{{textInfoAlert}}</p>
            <div class="inform-alert-system__close" @click="closeInfoAlert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#98A2B3" stroke-width="2" stroke-linecap="square"/>
                </svg>       
            </div>
        </div>
    </div>
    
</template>


<script>
import { useCounterStore } from '@/stores/counter'



export default {

    data() {
        return {
            showStatus: null,
            textInfoAlert: '',
            animAtionStatus: false,
            
        }
    },

    props: {

    },

    components: {

    },

    methods: {
        closeInfoAlert(){
            this.animAtionStatus = false
            setTimeout(()=>{
                const store = useCounterStore()
                store.changeInfoAlertStatus(
                    {
                        'alertType': null, 
                        'alertText': ''
                    }
                )     
            },1200)
           
        }
    },

    computed: {

        watchInfoAlertStatus() {
            const store = useCounterStore()
            return store.infoAlertStatus;
        },

    },

    watch: {
        watchInfoAlertStatus(newValue, oldValue){

            console.log(newValue, oldValue)

            let store = useCounterStore()

            this.showStatus = store.infoAlertStatus.alertType
            this.textInfoAlert = store.infoAlertStatus.alertText

            if(this.showStatus = store.infoAlertStatus.alertType){
                setTimeout(()=>{
                    this.animAtionStatus = true
                },100)
            }
            else{
                setTimeout(()=>{
                    this.animAtionStatus = false
                },100)
            }

            setTimeout(()=>{
                this.closeInfoAlert()
            },3500)

           
        }
    },

    mounted(){
    
    },

}
</script>