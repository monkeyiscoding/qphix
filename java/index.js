const firebaseConfig = {
  apiKey: "AIzaSyBpRrmTK4449iHbUW_jNE1CjaWYTdmGdaY",
  authDomain: "qphix-training-193c9.firebaseapp.com",
  databaseURL: "https://qphix-training-193c9-default-rtdb.firebaseio.com",
  projectId: "qphix-training-193c9",
  storageBucket: "qphix-training-193c9.appspot.com",
  messagingSenderId: "343406672827",
  appId: "1:343406672827:web:10ca29f861cc2c08a3e29e",
  measurementId: "G-KMZM22KYZW"
};


firebase.initializeApp(firebaseConfig);
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


var bookings = false;

loadbookings();
function loadbookings(){
  var query = firebase.database().ref("Registrations");
  query.once('value', function(snapshot) {

    snapshot.forEach(

      function(childSnapshot) {

        var mydiv = document.getElementById("booking");

        var phone = childSnapshot.val().phone;
        var month = childSnapshot.val().month;
        var name = childSnapshot.val().username;
        var selfie = childSnapshot.val().selfie;
        var id = childSnapshot.val().training_id;

        var number = localStorage.getItem("number");

        if (phone.includes(number)) {

          $("#t").html("MY BOOKINGS");
          bookings = true;
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
}
