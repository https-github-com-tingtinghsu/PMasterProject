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
import TurbolinksAdapter from 'vue-turbolinks'
import "controllers"

import '../scripts/shared/application'
import '../scripts/shared/sidebar'
import '../scripts/shared/chart'
import '../scripts/shared/itemIndex'
import '../scripts/shared/itemEditForm'
import '../scripts/shared/post'
import '../scripts/shared/tooltip'
import '../scripts/shared/mytask'
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

