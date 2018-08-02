// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'
import App from './App'
import Home from './components/Home'
import Characters from './components/characters/Characters'
import router from './router'
import store from './store'

import customFilters from './filters'
import charaUtils from './assets/js/characters/utils'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(VueCordova)
Vue.use(VueHead)
Vue.use(customFilters)
Vue.use(charaUtils)

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
    Home,
    Characters
  },
  head: {
    meta: [{
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    }]
  }
})


const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

async function download () {

  const url = 'https://raw.githubusercontent.com/optc-db/optc-db.github.io/master/common/data/units.js'
  const path = Path.resolve(__dirname, 'prova', 'units.js')

  // axios image download with response type "stream"
  const response = await Axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })

  // pipe the result stream into a file on disc
  response.data.pipe(Fs.createWriteStream(path))

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve()
    })

    response.data.on('error', () => {
      reject()
    })
  })

}