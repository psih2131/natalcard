import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
    const urlQuery = ref('https://natalbase.ru')
    const allPosts = ref([])
    const allCategory = ref([])
    const preloaderStatus = ref(true)








    // const doubleCount = computed(() => count.value * 2)
    function changeAllPosts(newAllPosts) {
        allPosts.value = newAllPosts
        console.log('fgg', allPosts.value)
    }

    function changeAllCategory(newAllPosts) {
        allPosts.value = newAllPosts
        console.log('fgg', allPosts.value)
    }

    function changePreloaderStatus(newValue) {
        preloaderStatus.value = newValue
        console.log('fgg', preloaderStatus.value)
    }




    // doubleCount, increment 
    return {
        urlQuery,
        allPosts,
        allCategory,
        preloaderStatus,

        changeAllPosts,
        changeAllCategory,
        changePreloaderStatus,

    }
})
