
var login = localStorage.getItem("login");
if(login == "true"){
  var name = localStorage.getItem("username");
  var number = localStorage.getItem("number");
  $("#login-text").html(name);
  $("#login-text-pc").html(name);
  $("#username").html(name);
  $("#number").html(number);

  $("#login-a").css("display","none");
  $("#login-div-after").css("display","block");
}


$("#menu-open").click(function(){
  $("#menu").fadeIn();
})

$("#menu-close").click(function(){
  $("#menu").fadeOut();
})
