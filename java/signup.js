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
var query = firebase.database().ref("web_login");


render();
function render(){
	window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
	recaptchaVerifier.render();
}






$("#signup").click(function(){
  var name = $("#username").val();
  var number = $("#number").val();

  if(name.trim().length == 0){
    $("#error").html("Enter your username");
    $("#error").css("visibility","visible");
  }
  else if(number.trim().length == 0){
    $("#error").html("Enter Your Phone Number");
    $("#error").css("visibility","visible");
  }
  else if(number.trim().length < 10){
    $("#error").html("Invalid Phone Number");
    $("#error").css("visibility","visible");
  }

  else{
    phoneAuth()
  }
})

// function for send OTP
function phoneAuth() {

    var number = "+917357711568"
    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
        $("#error").fadeOut();
        $("#verify").fadeIn();
        $("#otp").fadeIn();
        $("#number").fadeOut();
        $("#username").fadeOut();
        $("#signup").fadeOut();
        $("#recaptcha-container").fadeOut();
    }).catch(function (error) {
        // error in sending OTP
        $("#error").html(error.message);
        $("#error").fadeIn();
    });

}

$("#verify").click(function(){
  codeverify()
})

function codeverify() {
    var code = document.getElementById('otp').value;
    coderesult.confirm(code).then(function () {
        alert("verifird");
    }).catch(function () {
        alert("wrong");
    })
}
