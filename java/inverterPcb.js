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

var month = "";
function fillForm(text) {

  month = text;
  $("#title-text").html(`REGISTER YOUR SEAT FOR ${text}`)
  $("#dialog-booking").fadeIn();

}





var ad = false;
var sel = false;
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
    sel = true;
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
    ad = true;
  });
  reader.readAsDataURL(this.files[0]);
});





// razor PAY







document.getElementById('register-seat').onclick = function(e) {
  var name = $("#username").val();
  var phone = $("#phone").val();
  var email = $("#email").val();
  var address = $("#address").val();
  var error = $("#error");

  if (!ad) {
    $("#error").html("Upload your aadhar card image");
    $("#error").css("display", "block");
  } else if (!sel) {
    $("#error").html("Upload your selfi image");
    $("#error").css("display", "block");
  } else if (name.length < 4) {
    $("#error").html("Enter your full name");
    $("#error").css("display", "block");
  } else if (phone.length < 10) {
    $("#error").html("Invalid phone number");
    $("#error").css("display", "block");
  } else if (!email.endsWith("@gmail.com")) {
    $("#error").html("Invalid email address");
    $("#error").css("display", "block");
  } else if (address.length < 8) {
    $("#error").html("Enter complete address");
    $("#error").css("display", "block");
  } else {

    $("#error").css("display", "none");

    var options = {
      //"key": "rzp_live_25RshOlv3jiE3w", // Enter the Key ID generated from the Dashboard
      "key": "rzp_test_NSMMzlfJxi1ZzK", // Enter the Key ID generated from the Dashboard

      "amount": "300", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Qphix",
      "description": "Training Registration",
      "image": "image/logo_black.png",
      "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      "handler": function(response) {
        if (typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1) {
          $("#loader").fadeOut();
        } else {
          $("#loader").fadeIn();
          saveData()

        }
        //location.href = redirect_url;
      },

      "prefill": {
        "name": name,
        "email": email,
        "contact": phone,
      },

      "notes": {
        "address": address
      },
      "theme": {
        "color": "#FF6F00"
      }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();

    e.preventDefault();




  }

}



// rzp1.on('payment.success', function (response){
//         alert(response.error.code);
//         alert(response.error.description);
//         alert(response.error.source);
//         alert(response.error.step);
//         alert(response.error.reason);
//         alert(response.error.metadata.order_id);
//         alert(response.error.metadata.payment_id);
// });


function saveData() {
  var name = $("#username").val();
  var phone = $("#phone").val();
  var email = $("#email").val();
  var address = $("#address").val();


  var myRef = firebase.database().ref().push();
  var key = myRef.key;

  firebase.database().ref("Registrations/" + key).set({
    username: name,
    phone: phone,
    email: email,
    address: address,

  }, function(error) {
    if (error) {
      alert("Something went wrong try again");
    } else {
      uploadimage(key)
    }
  })

}


function uploadimage(key) {

  var name = $("#username").val();
  var phone = $("#phone").val();
  var email = $("#email").val();
  var address = $("#address").val();
  //var type = getInputVal('types');
  var storage = firebase.storage();
  var myRef = firebase.database().ref().push();

  var key2 = myRef.key;
  var key3 = myRef.key+"2_selfie";


  var file = document.getElementById("image-input-aadhar").files[0];
  var file2 = document.getElementById("image-input").files[0];
  var storageref = storage.ref();
  var thisref = storageref.child("registration").child(key2).put(file);
  var thisref2 = storageref.child("registration").child(key3).put(file2);
  thisref2.on('state_changed', function(snapshot) {


  }, function(error) {

  }, function() {



    // Uploaded completed successfully, now we can get the download URL
    thisref.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      //getting url of image
      var aadharUrl = downloadURL;
      thisref2.snapshot.ref.getDownloadURL().then(function(selfiUrl) {
        //getting url of image
        var myRef = firebase.database().ref().push();



        firebase.database().ref("Registrations/" + key).set({
          aadhar: aadharUrl,
          selfie: selfiUrl,
          username: name,
          phone: phone,
          email: email,
          address: address,
          month: month,

        }, function(error) {
          if (error) {

          } else {
            $("#loader").fadeOut();
            $("#dialog-booking").fadeOut();
            $("#dialog").fadeOut();
          }
        })


      });
    });


  });

}
