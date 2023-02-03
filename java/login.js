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
var query = firebase.database().ref("WebUsers");

var capta = false;
render();

function render() {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.\
      capta = true;
    }
  });
  recaptchaVerifier.render();
}



$("#login").click(function() {
  var number = $("#phone").val();

  if (number.trim().length == 0) {
    $("#error").html("Enter Your Phone Number");
    $("#error").css("visibility", "visible");
  } else if (number.trim().length < 10) {
    $("#error").html("Invalid Phone Number");
    $("#error").css("visibility", "visible");
  }
  // else if (capta == false) {
  //   $("#error").html("Verifi recaptcha");
  //   $("#error").css("visibility", "visible");
  // }
  else {
    $("#loader").fadeIn();
    checkUser(number);
  }
})



function checkUser(number) {
  var numberPreview = number;


  if (numberPreview.startsWith("0")) {
    numberPreview = numberPreview.slice(1);
  }


  if (numberPreview.indexOf("+91") < 1) {
    number = "+91" + numberPreview
  }


  query.once('value', function(snapshot) {
    if (snapshot.hasChild(number)) {
      $("#loader").fadeOut();
      phoneAuth(number);
      $("#error").css("visibility", "hidden");
    } else {
      $("#error").html("User not fount");
      $("#loader").fadeOut();
      $("#error").css("visibility", "visible");
    }
  })



}


// function for send OTP
function phoneAuth(number) {



  firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function(confirmationResult) {
    window.confirmationResult = confirmationResult;
    coderesult = confirmationResult;
    $("#error").css("visibility", "hidden");
    $("#verify").fadeIn();
    $("#otp").fadeIn();
    $("#phone").fadeOut();
    $("#username").fadeOut();
    $("#login").fadeOut();
    $("#recaptcha-container").fadeOut();
    $("#loader").fadeOut();
  }).catch(function(error) {
    // error in sending OTP
    $("#error").html(error.message);
    $("#error").css("visibility", "visible");
    $("#loader").fadeOut();
  });

}

$("#verify").click(function() {
  $("#loader").fadeIn();
  codeverify()
})

function codeverify() {
  var number = "";

  var numberPreview = $("#phone").val();


  if (numberPreview.startsWith("0")) {
    numberPreview = numberPreview.slice(1);
  }


  if (numberPreview.indexOf("+91") < 1) {
    number = "+91" + numberPreview
  }

  var code = document.getElementById('otp').value;
  coderesult.confirm(code).then(function() {

    var ref = firebase.database().ref().push();
    var key = ref.key;

    var query = firebase.database().ref("WebUsers/"+number);

    query.once('value', function(snapshot) {
      var name = snapshot.val().name;
      alert(name);
    })


    // firebase.database().ref("WebUsers/"+number).set({
    //   name: name,
    //   number: numberPreview,
    // }, function(error) {
    //   if (error) {
    //     alert("Something went wrong try again");
    //     $("#loader").fadeOut();
    //   } else {
    //     $("#loader").fadeOut();
    //     localStorage.setItem("login", "true");
    //     localStorage.setItem("username", name);
    //     localStorage.setItem("number", number);
    //     alert("Login Successfully");
    //     window.location.replace("index.html");
    //   }
    // });

  }).catch(function() {
    $("#error").html("Invalid OTP");
    $("#error").css("visibility", "visible");
      $("#loader").fadeOut();
  })
}
