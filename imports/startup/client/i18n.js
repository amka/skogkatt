import Vue from 'vue'

// Load i18n
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import messages from '/imports/locales'

const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en',
    ...messages, // set locale messages
})

export default i18n