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
var query = firebase.database().ref("training_months");

query.once('value', function(snapshot) {
  snapshot.forEach(
    function(childSnapshot) {
      var mydiv = document.getElementById("dialog-content");

      var title = childSnapshot.val().title;
      var date = childSnapshot.val().date;
      var bookings = childSnapshot.val().booking_count;
      var thumbnail = childSnapshot.val().thumbnail;


      var btn = "block";

      if(bookings >= 50){
        btn = "none";
      }

      mydiv.innerHTML += `

        <div class="month-div-pc">
          <i style="color: #FF6F00" class="fa-solid fa-calendar-days fa-2x"></i>
          <h4></h4>
          <h3>${date}</h3>
          <br>
          <h2 style="color: #FF6F00;">${title}</h2>

          <h4>Select the training month is best for you</h4>
          <div class="members-div-pc">
            <h4>Members</h4>

            <h2>${bookings}/50</h2>

          </div>
          <br>
          <br>
          <br>
          <button style="width: 100%; ;display: ${btn};padding-top: 15px;" class="primary-button" type="button" name="button"> <h3>Select Month</h3> </button>
        </div>





      `;



    }
  )

})


$("#register").click(function() {
  $("#dialog").fadeIn();
})

$("#register-phone").click(function() {
  $("#dialog").fadeIn();
})

$("#close").click(function() {
  $("#dialog").fadeOut();
})

function myFunction(text){
  $("#dialog").fadeOut();
}
