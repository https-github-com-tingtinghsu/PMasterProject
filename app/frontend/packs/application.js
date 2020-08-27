// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

require("scripts")
require("stylesheets")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
const images = require.context('../images', true)
const imagePath = (name) => images(name, true)

// import "scripts/shared";

import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
// import menubar from '../components/menubar.vue'
import App from '../components/app.vue'

Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  if (!document.querySelector('#app')) {
    return;
  }
  const app = new Vue({
    el: '#app',
    data: () => {
      return {
        message: "Can you say hello?"
      }
    },
    components: { App },
    template:'<App />'
  })
})

// Vue.use(TurbolinksAdapter)
// document.addEventListener('turbolinks:load', () => {
  // if (document.querySelector('#menubar').length === 0) {
  //   return;
  // }

//   const app = new Vue({
//     el: '#menubar',
//     data: () => {
//       return {
        
//       }
//     },
//     components: { menubar },
//     template:'<menubar></menubar>'
//   })
 
// })

// document.addEventListener('turbolinks:load', () => {
  
//    new Vue({
//     el: '#App',
//     data: () => {
//       return {
//         message: "Can you say hello?"
//       }
//     },
//     components: { App },
//     template:'<App />'
//   })
 
// })

