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
function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}


$("#signup").click(function(){
  var name = $("#username").val();
  var password = $("#password").val();
  var conform_password = $("#conform_password").val();


  if(name.trim().length == 0){
    $("#error").html("Enter your username");
    $("#error").fadeIn();
  }
  else if(password.trim().length == 0){
    $("#error").html("Enter Password");
    $("#error").fadeIn();
  }
  else if(password.indexOf(" ") >= 1){
    $("#error").html("Space not allow in password");
    $("#error").fadeIn();
  }
  else if(password.length < 8){
    $("#error").html("Password must be 8 character");
    $("#error").fadeIn();
  }

  else if(password != conform_password){
    $("#error").html("Password not matched");
    $("#error").fadeIn();
  }

  else{

  }
})
