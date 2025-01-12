<template>
    <main class="main">
          <!-- Здесь может быть ваш основной контент страницы -->
        <p>Подключение к Яндексу...</p>
    </main>
</template>

<!-- @/assets/images/logo.png -->
<script>




export default {
  data(){
    return{


    }
  },
  components: {

  },
  methods: {

  },

  mounted() {
    // Скрипт Яндекса подключается, когда компонент загружается
    const script = document.createElement("script");
    script.src = "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js";
    script.async = true;
    script.onload = () => {
      // Скрипт загружен, теперь можно вызвать функцию
      if (window.YaSendSuggestToken) {
        window.YaSendSuggestToken("http://localhost:3000", {
          "kek": true
        });
      } else {
        console.error("YaSendSuggestToken не определена");
      }
    };
    document.head.appendChild(script);

  },
};
</script>