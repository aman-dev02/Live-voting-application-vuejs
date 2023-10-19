import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import * as FaIcons from 'oh-vue-icons/icons/fa'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import AOS from 'aos'
import 'aos/dist/aos.css'
import store from './store/store.js'
import axios from 'axios'
import { io } from 'socket.io-client'
import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { showSuccessToast, showErrorToast } from './toastService.js';
axios.defaults.baseURL = 'http://localhost:8080'
 const socket = io('http://localhost:8080')


// Create the Vue app and set up Socket.IO
const Fa = Object.values({ ...FaIcons })
const appInstance = createApp(App)
appInstance.use(router)
addIcons(...Fa)

appInstance.use(AOS.init())
appInstance.use(store)
appInstance.component('v-icon', OhVueIcon)
appInstance.use(Vue3Toasity, {
  autoClose: 3000
})
// $socket instance
// appInstance.provide('$socket', socket);

// appInstance.config.globalProperties.$socket = socket;
appInstance.use(socket);
appInstance.config.globalProperties.$showSuccessToast = showSuccessToast;
appInstance.config.globalProperties.$showErrorToast = showErrorToast;

socket.on('connect', () => {
  console.log('Connected to Socket.IO server')
})

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server')
})
export {socket}
appInstance.mount('#app')
// export default socket;