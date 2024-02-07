<template>
    <div v-if="popup_application" class="fixed top-0 left-0 flex w-full h-full items-center">
        <div class="absolute bg-black w-full h-full opacity-90"></div>
        <div class="flex w-full h-full">
            <div class="relative m-auto w-96 bg-gray-600 border-4 rounded-xl items-center px-4 py-5">
                <div class="absolute top-0 right-0 cursor-default hover:opacity-20"
                @click="togglePopup">&#10006;</div>
                <form class="flex justify-center">
                    <div>
                        <div class="relative my-10">
                            <input v-model="name" placeholder="Введите имя">
                            <div class="absolute text-red-500">{{errors.name}}</div>
                        </div>
                        <div class="relative my-10">
                            <input v-model="phone" type="tel" id="phone" @input='setMaskPhone' placeholder="+7(___)___-__-__">
                            <div class="absolute text-red-500">{{ errors.phone }}</div>
                        </div>
                        <div class="relative my-10">
                            <input v-model="email" placeholder="Введите Email">
                            <div class="absolute text-red-500">{{errors.email}}</div>
                        </div>
                        <div class="relative my-10">
                            <select v-model="city_id">
                                <option v-for="item in citySelect" :key="item.id" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div class="flex justify-center">
                    <Button @click="sendDate">Отправить</Button>
                </div>
            </div>
        </div>
    </div>

    <div v-if="popup_report" class="fixed top-0 left-0 flex w-full h-full items-center">
        <div class="absolute bg-black w-full h-full opacity-90"></div>
        <div class="flex w-full h-full">
            <div class="relative m-auto w-96 bg-gray-600 border-4 rounded-xl items-center px-4 py-5">
                <div class="absolute top-0 right-0 cursor-default hover:opacity-20"
                     @click="this.popup_report = false">&#10006;</div>
                <form class="flex justify-center">
                    <div>{{report}}</div>
                </form>
                <div class="flex justify-center">
                    <Button @click="this.popup_report = false">Продолжить</Button>
                </div>
            </div>
        </div>
    </div>

    <div class="flex gap-10 justify-center my-10">
        <Button @click="togglePopup(1)">Заказать в Москву</Button>
        <Button @click="togglePopup(2)">Заказать в Санкт-Петербург</Button>
    </div>
</template>

<style scoped>
    input, select {
        @apply block w-72 px-2 py-2 font-semibold;
    }

    input, select:focus {
        @apply outline-0;
    }

</style>


<script >
import Button from "@/components/Button.vue";
import { sendDataToBackend } from './api.js';

export default {
    components: {Button},
    data() {
        return {
            popup_application: false,
            popup_report: false,
            report: '',
            name: '',
            phone: '+7',
            email: '',
            city_id: '',
            errors:{
                name: '',
                phone: '',
                email: '',
            },
            citySelect: [
                {
                    id: 1,
                    name: "Москва"
                },
                {
                    id: 2,
                    name: "Санкт-Петербург"
                },
                {
                    id: 3,
                    name: "Казань"
                }
            ],
        };
    },
    methods: {
        togglePopup (id) {
            this.popup_application = !this.popup_application;
            if (id){
                this.city_id = id;
            }
        },

        setMaskPhone() {
            const input = document.getElementById('phone');
            let value = input.value.replace(/\D/g, '');

            if (value.startsWith('7')) {
                value = value.substring(1);
            }
            if (value.length <= 3) {
                input.value = '+7 (' + value;
            } else if (value.length <= 6) {
                input.value = '+7 (' + value.slice(0, 3) + ') ' + value.slice(3);
            } else if (value.length <= 9) {
                input.value = '+7 (' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6);
            } else {
                input.value = '+7 (' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 8) + '-' + value.slice(8, 10);
            }
        },

        validateName() {
            if (this.name.length < 2) {
                this.setError ('name', 'Ошибка в имени')
                return false;
            }
            return true;
        },
        validatePhoneNumber() {
            const phoneRegex = /^\+\d{11}$/;
            if (!phoneRegex.test(this.formatPhoneNumber(this.phone))){
                this.setError('phone', 'Ошибка в номере телефона');
                return false;
            }
            return true;
        },

        formatPhoneNumber() {
            const phoneDigits = this.phone.replace(/\D/g, '');
            return "+" + phoneDigits.substring(0, 11);
        },

        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.email)){
                this.setError('email', 'Ошибка в email');
                return false
            }
            return true;
        },
        setError(item, error) {
            switch (item){
                case 'name':
                    this.errors.name = error;
                    break
                case 'phone':
                    this.errors.phone = error;
                    break
                case 'email':
                    this.errors.email = error;
                    break
                default:
                    break;
            }
        },

        sendDate() {
            console.log (this.validateName() +"/"+ this.validatePhoneNumber() +"/"+ this.validateEmail());
            this.errors={name: '', phone: '', email: ''};
            const verification = [this.validateName(), this.validatePhoneNumber(), this.validateEmail()];
            for (let item in verification){
                console.log (verification[item]);
                if (!verification[item]){
                    return
                }
            }
            const formData = { name: this.name, phone: this.formatPhoneNumber(this.phone), email: this.email, cityId: this.city_id };

            sendDataToBackend(formData)
                .then(response => {
                    console.log('Ответ от сервера:', response);
                    this.name = '';
                    this.phone = '+7';
                    this.email = '';
                    this.city_id = '';
                })
                .catch(error => {
                    this.report = 'Произошла ошибка, попробуйте позже';
                    this.popup_report = true;
                    this.popup_application = false;
                });

        },
    },

};

</script>