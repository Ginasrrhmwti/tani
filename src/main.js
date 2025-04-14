import { createApp } from 'vue'
import './main.css'
import router from "./router"
import App from './App.vue'
import VueCookies from 'vue-cookies'
// import { OhVueIcon, addIcons } from "oh-vue-icons";
// import { HiSolidMenu } from "oh-vue-icons/icons";
// addIcons(HiSolidMenu)

createApp(App).use(VueCookies).use(router).mount('#app')
