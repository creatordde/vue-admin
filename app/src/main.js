const $ = require('jquery')

function getPagesList() {
  $(".pages h1").remove();
  $.get("./api", (data) => {
    data.forEach(el => {
      $(".pages").append("<h1>" + el + "</h1>")
    });
    $(".pages h1").click(deletePage)
  }, "JSON")
}

getPagesList();

$("button").click(() => {
  $.post("./api/createNewHtmlPage.php", {
    "name": $("input").val()
  }, (data) => {
    getPagesList();
    console.log(data)
  })
  .fail(() => {
    alert("Page exsist!")
  })
})

function deletePage(e) {
  $.post("./api/removeHtmlPage.php", {
    "page": e.target.innerText
  }, (data) => {
    getPagesList();
    console.log(data)
  })
}