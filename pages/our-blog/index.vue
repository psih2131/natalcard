<template>
    <main class="main">
        <section class="blog">
            <div class="blog__content container">
            <h3 class="blog__title">Наш блог</h3>
            <h4 class="blog__subtitle">Последние новости, направления путешествий, советы и рекомендации от нашей команды.
            </h4>
            <div class="blog__items" v-if="posts && posts.length > 0">
                
                <component__blog_post v-for="item in posts" 
                :key="item"
                :postData="item"
                :postAllCategory="postsCategory"
                />
                
            </div>

            <div v-else class="blog__items">
                Еще нет постов
            </div>
            </div>
        </section>
    </main>
</template>


<script setup>
    //components
    import component__blog_post from '@/components/website/blog-post.vue'
    // import { useCounterStore } from '@/stores/counter'

    //data
    const {data: posts} = await useFetch('https://natalbase.ru/wp-json/wp/v2/our-blog')
    const {data: postsCategory} = await useFetch('https://natalbase.ru/wp-json/wp/v2/blog-category')

    // const postStore = useCounterStore(); // Подключаем хранилище

    // postStore.changeAllPosts(posts.value)

    console.log(posts)
    console.log(postsCategory)
    // console.log(postStore.allPosts)

    //methods

</script>
