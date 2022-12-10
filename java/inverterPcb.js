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

      if (bookings >= 50) {
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
          <button style="width: 100%; ;display: ${btn};" class="primary-button month-button" type="button" name="button" onclick="fillForm(\`` + date + `\`)"> <h3>Select Month</h3> </button>
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

$("#close-booking").click(function() {
  $("#dialog-booking").fadeOut();
})

function fillForm(text) {
  $("#title-text").html(`REGISTER YOUR SEAT FOR ${text}`)
  $("#dialog-booking").fadeIn();
}






const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    $("#icon").css("display", "none");
    $("#title").css("display", "none");
    $("#selfi-div").css("padding-top", "20px");
    $("#display-image").css("display", "block");

    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});


const image_input_aadhar = document.querySelector("#image-input-aadhar");

image_input_aadhar.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    $("#icon-aadhar").css("display", "none");
    $("#title-aadhar").css("display", "none");
    $("#aadhar-div").css("padding-top", "20px");
    $("#display-image-aadhar").css("display", "block");

    const uploaded_image = reader.result;
    document.querySelector("#display-image-aadhar").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});









// razor PAY

var options = {
  "key": "rzp_live_25RshOlv3jiE3w", // Enter the Key ID generated from the Dashboard
  "amount": "300000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": "INR",
  "name": "Qphix",
  "description": "Training Registration",
  "image": "image/logo_black.png",
  "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
  "handler": function(response) {
    if (typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1) {
      alert("Failed");
    } else {
      alert("Thanks");
    }
    location.href = redirect_url;
  },

  "prefill": {
    "name": "Gaurav Kumar",
    "email": "gaurav.kumar@example.com",
    "contact": "9999999999"
  },

  "notes": {
    "address": "Jaipur Rajasthan"
  },
  "theme": {
    "color": "#FF6F00"
  }
};



var rzp1 = new Razorpay(options);
document.getElementById('register-seat').onclick = function(e) {
  rzp1.open();
  e.preventDefault();
}
