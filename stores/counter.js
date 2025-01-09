import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', () => {
    const router = useRouter();
    const urlQuery = ref('https://natalbase.ru')
    const allPosts = ref([])
    const allCategory = ref([])
    const preloaderStatus = ref(true)


    const popupStatus = ref(false)
    const popupName = ref(null)

    const autorisationStatus = ref(false)
    const userMainData = ref({
        'user-name': null,
        'user-email': null,
    })
    const infoAlertStatus = ref({
        'alertType': null, 'alertText': ''
    })








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

    function changePopupStatus(newPopupStatus) {
        popupStatus.value = newPopupStatus
        console.log('popup status', popupStatus.value)

    }

    function changePopupName(newPopupName) {
        popupName.value = newPopupName
        console.log('popup name', popupName.value)
    }

    function changeUserMainData(newPopupName) {
        userMainData.value = newPopupName
        console.log('popup name', userMainData.value)
    }

    function changeAutorisationStatus(newPopupName) {
        autorisationStatus.value = newPopupName
        console.log('popup name', autorisationStatus.value)
    }

    function checkTokenAutorisation() {
        let tokenLocal = localStorage.getItem('jwtToken')
        if (tokenLocal) {
            return true
        }
        else {
            return false
        }
    }

    //change info alert
    function changeInfoAlertStatus(newPopupStatus) {
        infoAlertStatus.value = newPopupStatus
        console.log('alert status', infoAlertStatus.value)
    }







    // doubleCount, increment 
    return {
        urlQuery,
        allPosts,
        allCategory,
        preloaderStatus,
        popupStatus,
        popupName,
        userMainData,
        autorisationStatus,
        infoAlertStatus,

        changeAllPosts,
        changeAllCategory,
        changePreloaderStatus,
        changePopupStatus,
        changePopupName,
        changeUserMainData,
        changeAutorisationStatus,
        checkTokenAutorisation,
        changeInfoAlertStatus,

    }
})
