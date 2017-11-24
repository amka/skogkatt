import Vue from 'vue'

// Import Localization
import i18n from './i18n'

// Import Routes
import router from './router'

// Load Vuetify UI
import Vuetify from 'vuetify'
Vue.use(Vuetify, {
    theme: {
        primary: '#388E3C',
        secondary: '#FFC107',
        accent: '#607D8B',
    }
})

// Main app
import App from '/imports/ui/layouts/App/App.vue'

const vueApp = new Vue({
    el: '#app',
    router,
    i18n,
    render: h => h(App)
})

export default vueApp