<template>
    <main class="main" v-if="loadStatus == true">
        <section class="post">
          <div class="post__content post__container">
            <h3 class="post__title">{{currentPosts[0].title.rendered}}</h3>
            <h4 class="post__subtitle" v-if="currentPosts[0].acf.описание_для_карточки">
                {{ currentPosts[0].acf.описание_для_карточки }}
            </h4>
            <div class="post__big-img">
                <img :src="currentPosts[0].acf.izobrazhenie_posta" alt="img">
            </div>
            


            <div class="post-wrapper" v-for="item in currentPosts[0].acf.конструктор_поста" :key="item">

                <div v-if="item.текст" class="wp-redactor" v-html="item.текст"></div>

                <div v-else-if="item.картинка" class="post__img-wrapper">
                  <div class="post__img"><img :src="item.картинка" alt="img"></div>
                  <p v-if="item.текст_под_картинкой" class="post__img-square-text" v-html="item.текст_под_картинкой"></p>
                </div>

                <div v-else-if="item.текст_циитаты" class="post__quote">
                  <p class="post__quote-text" v-html="item.текст_циитаты"></p>
                  <div class="post__quote-wrapper" v-if="item.автор_цитаты">
                    <div class="post__quote-img" v-if="item.фото_автора"><img :src="item.фото_автора" alt="img"></div>
                    <p class="post__quote-name">{{item.автор_цитаты}}</p>
                    <p class="post__qoute-who" v-if="item.должность_автора">{{item.должность_автора}}</p>
                  </div>
                </div>

                <p v-else-if="item.oblast_teksta_s_beloj_polosoj" class="post__text-line" v-html="item.oblast_teksta_s_beloj_polosoj"></p>

            </div>
          </div>
        </section>


        <section class="reco" v-if="recomendPosts && recomendPosts.data && recomendPosts.data.value">
          <div class="reco__content container">
            <div class="reco__title-wrapper">
              <h3 class="reco__title main__title">Рекомендуемые посты</h3>

              <NuxtLink to="/our-blog/" class="reco__btn">
                Все посты                                                       
              </NuxtLink>
              
            </div>
            <div class="reco__items"  >
              <!-- {{ recomendPosts }} -->
          

              <component__blog_post_reco v-for="item in recomendPosts.data.value" :key="item" :postData="item" />

            </div>
            <div class="reco__btn-wrapper">
              <a href="#" class="reco__btn mobile">Все посты</a>
            </div>
          </div>
        </section>
    </main>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { ref } from 'vue';
    import component__blog_post_reco from '@/components/website/blog-post-reco.vue'
    const route = useRoute()
    const id = route.params.id // Это ID из URL
    let loadStatus = ref(false)
    let recomendPosts = ref(null)



    
    //data
    const {data: currentPosts} = await useFetch(`https://natalbase.ru/wp-json/wp/v2/our-blog?slug=${id}`)
    console.log(currentPosts.value[0])

    if(currentPosts.value[0].acf.рекомендуемые_посты && currentPosts.value[0].acf.рекомендуемые_посты.length > 0){
      let arrayPostString =''
      for(let i = 0; i < currentPosts.value[0].acf.рекомендуемые_посты.length; i++){
        let getIdPost = currentPosts.value[0].acf.рекомендуемые_посты[i].ID
        arrayPostString = arrayPostString + getIdPost + ','
      }

      // Убираем последнюю запятую
      arrayPostString = arrayPostString.slice(0, -1);
      console.log(arrayPostString)

      recomendPosts = await useFetch(`https://natalbase.ru/wp-json/wp/v2/our-blog?include=${arrayPostString}`)
      console.log('recomend list array',recomendPosts)

      loadStatus.value = true
    }
    else{
      loadStatus.value = true
    }
    

    



</script>