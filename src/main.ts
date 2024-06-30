import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { IMaskDirective } from 'vue-imask'

const myApp = createApp(App)
myApp.directive('imask', IMaskDirective)

myApp.mount('#app')
