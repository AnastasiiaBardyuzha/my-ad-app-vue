import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as fb from 'firebase';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: "AIzaSyBD_HAiGrxSYGr4qBYHfRvVWYIHYGQV1vc",
      authDomain: "my-ad-app-vue.firebaseapp.com",
      databaseURL: "https://my-ad-app-vue.firebaseio.com",
      projectId: "my-ad-app-vue",
      storageBucket: "my-ad-app-vue.appspot.com",
      messagingSenderId: "474513159305",
      appId: "1:474513159305:web:fdac0a96b637b1023a4258"
    }),
    fb.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    }),
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
