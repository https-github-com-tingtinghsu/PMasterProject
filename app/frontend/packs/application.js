// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start() // 要使用get、post以外的method，要靠ujs翻譯
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

require("scripts")
require("stylesheets")

// 2020/09/29 Wei
var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
if (isChrome) {
  Notification.requestPermission().then((result) => {}) 
}

import '../scripts/shared/application'
import '../scripts/shared/sidebar'
import '../scripts/shared/chart'
import '../scripts/shared/itemIndex'
import '../scripts/shared/itemEditForm'
import '../scripts/shared/post'
import 'scripts'
import 'stylesheets'
import '../stylesheets/index'
import 'chart.js'
import $ from 'jquery'
window.$ = $

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
const images = require.context('../../assets/images/', true)
const imagePath = (name) => images(name, true)

// import "scripts/shared";

import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
// import menubar from '../components/menubar.vue'
import App from '../components/app.vue'
import Workspace from '../components/workspace.vue'


Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  if (!document.querySelector('#app')) {
    return;
  }
  const workspaces = document.querySelector('#app').getAttribute('workspaces')
  const app = new Vue({
    el: '#app',
    data: {
      message: "Can you say hello?",
      workspaces: []
    },

    mounted() {
      this.workspaces = JSON.parse(workspaces);
    },
    
    components: { App },
    template:'<App :workspaces="workspaces" />'
  })
})

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

// document.addEventListener("turbolinks:load", function(event){
//   let el = document.querySelector("#workspace-board");
//   console.log(el);
//   if (el.length === 0) {return;}
//   new Vue({
//     el,
//     data: {
//       workspaces: JSON.parse(el.dataset.workspaces)
//     },
//     components: { Workspace }
//   });
// })
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

