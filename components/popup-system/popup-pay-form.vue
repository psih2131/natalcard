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
        this.pay()
    }
    // this.pay()
   },

   validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },


   pay() {
      // Создаем экземпляр виджета
      const widget = new cp.CloudPayments();

      // Вызов метода оплаты
      var receipt = {
            Items: [//товарные позиции
                 {
                    label: 'Оплата подписки в natalnaya-karta-online.ru', //наименование товара
                    price: 399, //цена
                    quantity: 1, //количество
                    amount: 399, //сумма

                }
            ],

            email: this.email, //e-mail покупателя, если нужно отправить письмо с чеком
            isBso: false, //чек является бланком строгой отчетности
            amounts:
            {
                electronic:399, // Сумма оплаты электронными деньгами
                advancePayment: 0.00, // Сумма из предоплаты (зачетом аванса) (2 знака после точки)
                credit: 0.00, // Сумма постоплатой(в кредит) (2 знака после точки)
                provision: 0.00 // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после точки)
            }
        };

      var data = {};
    data.CloudPayments = {
        CustomerReceipt: receipt, //чек для первого платежа
        recurrent: {
         interval: 'Day',
         period: 1,
         amount: 399, //сумма
         customerReceipt: receipt //чек для регулярных платежей
         }
         }; //создание ежемесячной подписки


      widget.pay('charge', // или 'charge'
        { //options
            
            publicId: 'pk_adbddb5a41f758103a2294d99295d', 
            description: 'Оплата подписки в natalnaya-karta-online.ru', 
            // publicId: 'pk_9ab0152a34deeb6f72cab8d5b2f1a', //id из личного кабинета
            // description: 'Оплата подписки в natalnaya-karta-online.ru тест', //назначение
            amount: 7, //сумма
            currency: 'RUB', //валюта
            accountId: this.email, //идентификатор плательщика (необязательно)
            email: this.email, //email плательщика (необязательно)
            skin: "mini", //дизайн виджета (необязательно)
            // autoClose: 3, //время в секундах до авто-закрытия виджета (необязательный)
            data: data,
            configuration: {
                common: {
                    successRedirectUrl: "https://natalnaya-karta-online.ru/account", // адреса для перенаправления 
                    failRedirectUrl: "https://natalnaya-karta-online.ru/account"        // при оплате по T-Pay
                }
            },
            // payer: { 
            //     firstName: 'Тест',
            //     lastName: 'Тестов',
            //     middleName: 'Тестович',
            //     birth: '1955-02-24',
            //     address: 'тестовый проезд дом тест',
            //     street: 'Lenina',
            //     city: 'MO',
            //     country: 'RU',
            //     phone: '123',
            //     postcode: '345'
            // }
        },


        
        {
            onSuccess:  (options) => { // success
                //действие при успешной оплате
               
               
                console.log('Успешная оплата' ,options)
                let storeForPay = useCounterStore()
                storeForPay.changePopupName('confirm-payment-popup')
                storeForPay.changeDataConfirmPayment(options)
             
                
            },
            onFail:  (reason, options) => { // fail
                //действие при неуспешной оплате
                console.log('неуспешная оплата' ,reason, options)

                storeForPay.changePopupName('confirm-payment-popup')
                storeForPay.changePopupStatus(false)

                
            },
            onComplete:  (paymentResult, options) => { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                //например вызов вашей аналитики
               
                console.log('/Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.' ,paymentResult, options)
                // storeForPay.changePopupName('confirm-payment-popup')
            }
        }
    )

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
    // Проверяем, есть ли уже скрипт на странице
    if (!document.querySelector('script[src="https://widget.cloudpayments.ru/bundles/cloudpayments.js"]')) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudpayments.ru/bundles/cloudpayments.js";
      script.async = true; // Опционально: добавляет скрипт асинхронно
      script.onload = () => {
        console.log("CloudPayments.js успешно загружен");
      };
      script.onerror = () => {
        console.error("Ошибка загрузки CloudPayments.js");
      };
      document.head.appendChild(script);
    } else {
      console.log("Скрипт CloudPayments.js уже добавлен");
    }
  },


}
</script>



