<template>
    <div class="blog__item">

        <NuxtLink class="blog__item-img" :to="getCurrentLink(postData.link)">
            <img :src="postData.acf.izobrazhenie_posta" alt="img">
        </NuxtLink>

        <p class="blog__item-date">{{postDate(postData.date)}}</p>

        <NuxtLink class="blog__item-title" :to="getCurrentLink(postData.link)">
            {{ postData.title.rendered }}
            <div class="blog__item-abs"><img src="/assets/img/svg/blog-arrow.svg" alt="arrow"></div>
        </NuxtLink>

        <p class="blog__item-text">{{ postData.acf.описание_для_карточки }}</p>

        <div class="blog__item-cat-list" v-if="postData['blog-category'].length > 0" v-html="getCurrrentList(postData['blog-category'])"></div>
        
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    let date = ref(null);
    let catList = ref([]);

    //components
    // import component__blog_post from '@/components/website/blog-post.vue'

    //data
    // const {data: posts} = await useFetch('https://natalbase.ru/wp-json/wp/v2/our-blog')

    //methods
    function postDate(dateString){
        const date = new Date(dateString); // Преобразуем строку в объект Date
  
        // Массив с месяцами на русском
        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];

        // Получаем день, месяц и год
        const day = date.getDate();
        const month = months[date.getMonth()];  // Месяц на русском
        const year = date.getFullYear();

        // Формируем строку в нужном формате
        return `${day} ${month} ${year}`;
    }

    function getCurrrentList(CutList){
        const currentCatList = CutList
        const allCat = props.postAllCategory

        // Фильтруем allCat, оставляя только те элементы, чьи id присутствуют в currentCatList
        const filteredCatList = allCat.filter(cat => currentCatList.includes(cat.id));

        let stringHtmlObject = ''

        for(let i = 0; i < filteredCatList.length; i++){
            let newHtml = `<div class="blog__item-cat">${filteredCatList[i].name}</div>`
            stringHtmlObject = stringHtmlObject + newHtml
        }

       return stringHtmlObject

    }

    function getCurrentLink(url){
        const urlObj = new URL(url);
        return urlObj.pathname;
    }

 
    


  

    // props
    const props = defineProps({
        postData: Object,
        postAllCategory: Object,
    })

</script>