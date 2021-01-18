const axios = require('axios')
const DOMHelper = require('./dom-helper')
require("./iframe-load")

module.exports = class Editor {
  constructor() {
    this.iframe = document.querySelector('iframe')
  }

  open(page) {
    this.currentPage = page;

    axios.get('../' + page)
      .then(res => DOMHelper.parseStrToDom(res.data))
      .then(DOMHelper.wrapTextNodes)
      .then(dom => {
        this.virtualDom = dom
        return dom
      })
      .then(DOMHelper.serializeDomToString)
      .then((html) => axios.post('./api/saveTempPage.php', { html }))
      .then(() => this.iframe.load("../temp.html"))
      .then(() => this.enableEditing())
  }

  enableEditing() {
    this.iframe.contentDocument.body.querySelectorAll("text-editor").forEach(el => {
      el.contentEditable = "true"
      el.addEventListener("input", () => {
        this.onTextEdit(el)
      })
    })
  }

  onTextEdit(el) {
    const id = el.getAttribute("nodeid")
    this.virtualDom.body.querySelector(`[nodeid="${id}"]`).innerHTML = el.innerHTML
  }

  save() {
    const newDom = this.virtualDom.cloneNode(this.virtualDom)

    DOMHelper.unwrapTextNodes(newDom)
    const html = DOMHelper.serializeDomToString(newDom)
    axios.post("./api/savePage.php", { pageName: this.currentPage, "html": html})
  }
}