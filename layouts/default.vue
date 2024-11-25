<template>
    <div class="app">
        <component__header v-if="allData" :mainData="allData" />
        
        <slot/>
    
        <component__footer v-if="allData && pagesWp" :mainData="allData" :pagesList="pagesWp" />
    </div>
</template>



<script setup>
    //components
    import component__header from '@/components/header.vue'
    import component__footer from '@/components/footer.vue'

    //data
    const {data: allData} = await useFetch('https://natalbase.ru/wp-json/acf/v3/options')


    const {data: pagesWp} = await useFetch('https://natalbase.ru/wp-json/wp/v2/pages')


    // const postStore = useCounterStore(); // Подключаем хранилище

    // postStore.changeAllPosts(posts.value)

    console.log('main data',allData)
    console.log('pages data',pagesWp)


    //methods

</script>



