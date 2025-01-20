<template>
    <div class="popup popup-pay-form">
        <div class="popup__close-btn" @click="closePopupStatus">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#fff"/>
            </svg> 
        </div>

        <div class="popup-pay-form__wrapper">
            <div class="popup-pay-form__info">
                <ul class="popup-pay-form__services-list">
                    <li class="popup-pay-form__services-element">
                        <div class="popup-pay-form__services-element-icon-wraper">
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.6644 0.252601C18.0772 0.619519 18.1143 1.25159 17.7474 1.66437L7.08075 13.6644C6.89099 13.8779 6.61898 14 6.33334 14C6.04771 14 5.7757 13.8779 5.58593 13.6644L0.252601 7.66437C-0.114317 7.25159 -0.077136 6.61952 0.335647 6.2526C0.74843 5.88568 1.3805 5.92286 1.74742 6.33565L6.33334 11.4948L16.2526 0.335647C16.6195 -0.077136 17.2516 -0.114317 17.6644 0.252601Z" fill="white"/>
                            </svg>                                
                        </div>
                        <p class="popup-pay-form__services-element-data">Детальная расшифровка натальной карты</p>
                    </li>
                    <li class="popup-pay-form__services-element">
                        <div class="popup-pay-form__services-element-icon-wraper">
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.6644 0.252601C18.0772 0.619519 18.1143 1.25159 17.7474 1.66437L7.08075 13.6644C6.89099 13.8779 6.61898 14 6.33334 14C6.04771 14 5.7757 13.8779 5.58593 13.6644L0.252601 7.66437C-0.114317 7.25159 -0.077136 6.61952 0.335647 6.2526C0.74843 5.88568 1.3805 5.92286 1.74742 6.33565L6.33334 11.4948L16.2526 0.335647C16.6195 -0.077136 17.2516 -0.114317 17.6644 0.252601Z" fill="white"/>
                            </svg>  
                        </div>
                        <p class="popup-pay-form__services-element-data">Разбор аспектов любви и отношений</p>
                    </li>
                    <li class="popup-pay-form__services-element">
                        <div class="popup-pay-form__services-element-icon-wraper">
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.6644 0.252601C18.0772 0.619519 18.1143 1.25159 17.7474 1.66437L7.08075 13.6644C6.89099 13.8779 6.61898 14 6.33334 14C6.04771 14 5.7757 13.8779 5.58593 13.6644L0.252601 7.66437C-0.114317 7.25159 -0.077136 6.61952 0.335647 6.2526C0.74843 5.88568 1.3805 5.92286 1.74742 6.33565L6.33334 11.4948L16.2526 0.335647C16.6195 -0.077136 17.2516 -0.114317 17.6644 0.252601Z" fill="white"/>
                            </svg>  
                        </div>
                        <p class="popup-pay-form__services-element-data">Анализ финансовой сферы и карьеры</p>
                    </li>
                    <li class="popup-pay-form__services-element">
                        <div class="popup-pay-form__services-element-icon-wraper">
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.6644 0.252601C18.0772 0.619519 18.1143 1.25159 17.7474 1.66437L7.08075 13.6644C6.89099 13.8779 6.61898 14 6.33334 14C6.04771 14 5.7757 13.8779 5.58593 13.6644L0.252601 7.66437C-0.114317 7.25159 -0.077136 6.61952 0.335647 6.2526C0.74843 5.88568 1.3805 5.92286 1.74742 6.33565L6.33334 11.4948L16.2526 0.335647C16.6195 -0.077136 17.2516 -0.114317 17.6644 0.252601Z" fill="white"/>
                            </svg>  
                        </div>
                        <p class="popup-pay-form__services-element-data">Ежедневные персональные гороскопы
                        </p>
                    </li>
                </ul>

                <div class="popup-pay-form__fields-wrapper">
                    <component__input_field 

                    :placeholderSet="'Укажите email'"
                    :setValue="email"
                    @getValue="email = $event"
                    :errorText="emailError"
                    />


                    <div class="button-popup-wrapper">
                        <button @click="validation()" class="button-popup">Получить доступ</button>
                      </div>

                </div>

                <div class="popup-pay-form__confirm-list-wrapper">
                    <div class="personal-data-checbox">
                        <label>
                            <input v-model="politickStatus" type="checkbox">
                        </label>
                        <p class="personal-data-checbox__text"> Я принимаю политику обработки персональных данных, а так же соглашаюсь с  <a href="">офертой и тарифами.</a></p>
                    </div>

                    <div class="personal-data-checbox">
                        <label>
                            <input v-model="payStatus" type="checkbox">
                        </label>
                        <p class="personal-data-checbox__text">7₽ первые 7 дней, далее 399₽ раз в 7 дней. Отмена – в любой момент.</p>
                    </div>

                    <p class="error-checkbox-text" v-if="politickStatus == false || payStatus == false">{{payStatusError}}</p>


                </div>
            </div>
            <div class="popup-pay-form__img-wrapper">
                <img src="@/assets/img/mission_img.jpg" alt="">
            </div>
        </div>



    </div>
</template>


<script>

import { useCounterStore } from '@/stores/counter'
// import component__input_field from '@/components/input-field.vue'
import component__input_field from '@/components/input-field.vue'





export default {


data() {
    return {
        store: null,
        email: null,
        emailError: null,
        politickStatus: false,
        

        payStatus: false,
        payStatusError:null,


       
      
    }
},

props: {

},

components: {
    component__input_field
},

methods: {
    closePopupStatus(){
      
      this.store.changePopupStatus(false)
   },

   validation(){
    let emailValid = null
    let checkboxValie = null
    if(this.validateEmail(this.email) == true){
        emailValid = true
        this.emailError = null
    }
    else{
        emailValid = false
        this.emailError = 'Некоректный email'
    }

    if(this.politickStatus == true && this.payStatus == true){
        checkboxValie = true
    }
    else{
        this.payStatusError = 'Согласитесь с офрертой и политикой конфиденциальности'
        checkboxValie = false
    }


    if(checkboxValie == true && emailValid == true){
        // this.pay()
    }
   },

   validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },


   pay() {
      // Создаем экземпляр виджета
      const widget = new cp.CloudPayments();

      // Вызов метода оплаты
      widget.pay(
        'auth', // или 'charge'
        {
          publicId: 'pk_adbddb5a41758103a2294d99295d', // ID из личного кабинета
          description: 'Оплата товаров в example.com', // Назначение платежа
          amount: 7, // Сумма
          currency: 'RUB', // Валюта
          accountId: this.email, // Идентификатор плательщика
        //   invoiceId: '5678', // Номер заказа (необязательно)
          email: this.email, // Email плательщика (необязательно)
          skin: 'mini', // Дизайн виджета (необязательно)
          data: {
            myProp: 'myProp value', // Дополнительные данные
          },
        },
        {
          onSuccess(options) {
            // Действие при успешной оплате
            console.log('Оплата прошла успешно:', options);
          },
          onFail(reason, options) {
            // Действие при неуспешной оплате
            console.error('Оплата не удалась:', reason, options);
          },
          onComplete(paymentResult, options) {
            // Вызов аналитики или других действий
            console.log('Виджет завершил работу:', paymentResult, options);
          },
        }
      );
    },
   

},

computed: {

},

watch: {

},

mounted(){
    this.store = useCounterStore()
},

created() {
//   if (!window.cp) {
//     const script = document.createElement('script');
//     script.src = 'https://widget.cloudpayments.ru/bundles/cloudpayments.js';
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);
//   }
}

}
</script>