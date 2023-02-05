
var booking = localStorage.getItem("booking");
var login = localStorage.getItem("login");
if(login == "true"){
  var name = localStorage.getItem("username");
  var number = localStorage.getItem("number");
  $("#login-text").html(name);
  $("#login-text-pc").html(name);
  $("#username").html(name);
  $("#number").html(number);
  $("#view-bookings").css("display","block");
  $("#login-a").css("display","none");
  $("#login-div-after").css("display","block");
}


$("#menu-open").click(function(){
  $("#menu").fadeIn();
})

$("#menu-close").click(function(){
  $("#menu").fadeOut();
})

$("#view-bookings").click(function(){
  $("#menu").fadeOut();
  $("#b-div").fadeIn();
})


$("#close-bookings").click(function(){
  $("#b-div").fadeOut();
})
$("#account").click(function(){
  if(login == "true"){
    $("#menu").fadeIn();
  }

  else{
    window.open("login.html","_self");
  }
})


var query = firebase.database().ref("Registrations");
query.once('value', function(snapshot) {

  snapshot.forEach(

    function(childSnapshot) {

      var mydiv = document.getElementById("my-bookings-div");

      var phone = childSnapshot.val().phone;
      var month = childSnapshot.val().month;
      var name = childSnapshot.val().name;
      var selfie = childSnapshot.val().selfie;
      var id = childSnapshot.val().trainingh_id;

      var number = localStorage.getItem("number");

      if (phone == number) {
        mydiv.innerHTML += `
        <div class="booking-div">
          <img class="profile-man" src="${selfie}" alt="">\
          <br>
          <h2>${name}</h2>
          <h4>${month}</h4>
          <div class="id-div">
            <h2 class="id" style="color: #FF6F00;">${id}</h2>
          </div>

        </div>

        `;
      }





    }
  )

})
