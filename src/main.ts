import { createApp } from 'vue'
import { vMaska } from 'maska'

import './assets/main.css'

import App from './app/App.vue'
import router from './routing/router'

const app = createApp(App)

app.directive('maska', vMaska)
app.use(router)

app.mount('#app')
