<template>
    <div class="field-input" :class="{'field-input__error': errorText && errorText != ''}">
        <p class="field-input__title" v-if="titleInput">{{titleInput}}</p>
        <div class="field-input__wrapper">
            <input :type="currentType" :placeholder="placeholderValue" v-model="fieldData" @input="changeInputData()">
            <p v-if="errorText && errorText != ''" class="field-input__text">{{errorText}}</p>
        </div>
        
      </div>
</template>


<script>

import { useCounterStore } from '@/stores/counter'





export default {

data() {
    return {
        store: null,
        fieldData: null,
        currentType: 'text',
        placeholderValue: '',
 
    }
},

props: {
    titleInput: String,
    setValue: String,
    typeInp: String,
    placeholderSet: String,
    errorText: String,
},

components: {

},

methods: {
    changeInputData(){
        console.log(this.fieldData)
        this.$emit('getValue', this.fieldData)
    }

},

computed: {

},

watch: {

},

mounted(){
    this.store = useCounterStore()

    if(this.setValue){
        this.fieldData = this.setValue
    }

    if(this.typeInp){
        this.currentType = this.typeInp
    }

    if(this.placeholderSet){
        this.placeholderValue = this.placeholderSet
    }
},

}
</script>