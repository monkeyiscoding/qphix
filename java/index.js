
alert("okkkk");
var login = localStorage.getItem("login");

if(login == "true"){
  var name = localStorage.getItem("username");
  $("login-text").html(name);
  alert(name);
}




$("#menu-open").click(function(){
  $("#menu").fadeIn();
})

$("#menu-close").click(function(){
  $("#menu").fadeOut();
})
