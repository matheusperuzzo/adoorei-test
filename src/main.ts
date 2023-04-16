import { createApp } from 'vue'

import './assets/main.css'

import App from './app/App.vue'
import router from './routing/router'

const app = createApp(App)

app.use(router)

app.mount('#app')
