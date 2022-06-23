import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueSweetalert2 from 'vue-sweetalert2'
import store from "./store.js"
import * as GameMethods from './Games/gamemethods.js';
import * as GameValues from './Games/gamevalues.js'
loadFonts()

createApp(App)
  .use(vuetify)
    .use(store)
    .use(GameMethods)
    .use(GameValues)
    .use(VueSweetalert2)
  .mount('#app')
