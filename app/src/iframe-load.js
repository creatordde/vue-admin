HTMLIFrameElement.prototype.load = function(url, callback) {
  this.src = url + "?rnd=" + Math.random().toString().substring(2)
  const timer = setInterval(() => {
    if (this.contentDocument.readyState == "complete") {
      callback()
      clearInterval(timer)
    }
  }, 100)
}