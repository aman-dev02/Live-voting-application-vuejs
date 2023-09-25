import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as FaIcons from "oh-vue-icons/icons/fa";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import AOS from 'aos'
import 'aos/dist/aos.css'
const Fa = Object.values({ ...FaIcons });
const app = createApp(App)
addIcons(...Fa);
app.use(AOS.init())
app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')
