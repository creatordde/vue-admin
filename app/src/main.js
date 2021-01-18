const Editor = require('./editor')
const Vue = require('vue')
const UIkit = require("uikit")
window.editor = new Editor()

new Vue({
  el: '#app',
  data: {
    showLoader: true
  },
  methods: {
    onBtnSave() {
      this.showLoader = true
      window.editor.save(() => {
        this.showLoader = false
        UIkit.notification({message: 'Успешно сохранено!', status: 'success'})
      }, () => {
        this.showLoader = false
        UIkit.notification({message: 'Ошибка сохранения!', status: 'danger'})
      })
    }
  },
  created() {
    window.editor.open("index.html", () => this.showLoader = false)
  }
})