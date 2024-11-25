<template>
    <main class="main" v-if="currentPages && currentPages.length > 0">
        <section class="post">
          <div class="post__content post__container">
            

            <h1 class="post__title-tipus">{{currentPages[0].title.rendered}}</h1>

            <div class="post-wrapper" >
                

                <div class="wp-redactor" v-html="currentPages[0].content.rendered"></div>

            </div>
          </div>
        </section>

    </main>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { ref } from 'vue';

    const route = useRoute()
    const id = route.params.id // Это ID из URL
    let loadStatus = ref(false)




    
    //data
    const {data: currentPages} = await useFetch(`https://natalbase.ru/wp-json/wp/v2/pages?slug=${id}`)
    console.log('page docs',currentPages)

    // if(currentPosts.value[0].acf.рекомендуемые_посты && currentPosts.value[0].acf.рекомендуемые_посты.length > 0){


    //   loadStatus.value = true
    // }
    // else{
    //   loadStatus.value = true
    // }
    

    



</script>