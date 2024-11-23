import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
    const urlQuery = ref('https://natalbase.ru')
    const allPosts = ref([])
    const allCategory = ref([])








    // const doubleCount = computed(() => count.value * 2)
    function changeAllPosts(newAllPosts) {
        allPosts.value = newAllPosts
        console.log('fgg', allPosts.value)
    }

    function changeAllCategory(newAllPosts) {
        allPosts.value = newAllPosts
        console.log('fgg', allPosts.value)
    }




    // doubleCount, increment 
    return {
        urlQuery,
        allPosts,
        allCategory,

        changeAllPosts,
        changeAllCategory,

    }
})
