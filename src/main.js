import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueSweetalert2 from 'vue-sweetalert2';

loadFonts()

createApp(App)
  .use(vuetify)
    .use(VueSweetalert2)
  .mount('#app')
