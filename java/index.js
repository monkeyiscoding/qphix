var firebaseConfig = {
  apiKey: "AIzaSyApQxe7HkWGuQeVTpkvp99RuuAsiSlZsJs",
  authDomain: "web-developement-a469c.firebaseapp.com",
  databaseURL: "https://web-developement-a469c-default-rtdb.firebaseio.com",
  projectId: "web-developement-a469c",
  storageBucket: "web-developement-a469c.appspot.com",
  messagingSenderId: "95061394281",
  appId: "1:95061394281:web:5de98767ae84f8459073f8",
  measurementId: "G-PYFZ7D71YQ"
};

//window.location = "gameoverview.html";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



var query = firebase.database().ref("games");


query.once('value', function(snapshot) {
  snapshot.forEach(
    function(childSnapshot) {
      var mydiv = document.getElementById("recomended-div");

      var title = childSnapshot.val().title;
      var brand = childSnapshot.val().brand;
      var rating = childSnapshot.val().rating;
      var thumbnail = childSnapshot.val().thumbnail;
      var logo = childSnapshot.val().logo;



      mydiv.innerHTML += `
      <div style= "width: 260px;"class="recomended-game-card col-xxl-2 col-xl-2" onClick="myFunction(\``+ title + `\`)">
      <img src="${thumbnail}" alt = "" class = "recomended-thumbnail" >
      <div class="recomended-bottom-div">
      <img src="${logo}" alt = "" class = "recomended-logo" >
      <div class="recomended-bottom-div-right">


      <h5 style="font-size: 15px; margin-bottom: 0px; margin-top: 10px; color: black;">${title}</h5>
      <h5 style="font-size: 12px; margin-bottom: 0px; margin-top: 4px; color: black;">${brand}</h5>
      <h5 style="font-size: 10px; margin-bottom: 0px; margin-top: 0px; color: black;">${rating}</h5>


      </div>
      </div>

      </div>


      `;



      // // // bottom  right div
      // // var div3 = document.createElement("div");
      // // div3.style.width = "100%";
      // // div3.style.height = "60px";
      // // div3.style.borderRadius = "5px";
      // // div3.style.margin = "0px 20px 20px 10px";
      // // div3.style.background = "white";
      // // div3.style.color = "white";
      // //
      // //
      // //
      // //
      // // var h5 = document.createElement("h5");
      // // h5.innerHTML = title;
      // // h5.style.color = "black";
      // // h5.style.marginTop = "10px";
      // // h5.style.marginBottom = "0px";
      // // h5.style.fontSize = "15px";
      // //
      // //
      // //
      // //
      // //
      // // var h6 = document.createElement("h6");
      // // h6.innerHTML = brand;
      // // h6.style.color = "gray";
      // // h6.style.marginBottom = "0px";
      // // h6.style.fontSize = "12px";
      // // h6.style.marginTop = "3px";
      // //
      // // var h7 = document.createElement("h6");
      // // h7.innerHTML = rating;
      // // h7.style.color = "gray";
      // // h7.style.marginBottom = "0px";
      // // h7.style.fontSize = "10px";
      // //
      // //
      // //
      // div.append(divImage);
      // // div.append(div2);
      // // div2.append(divImage2);
      // // div2.append(div3);
      // // div3.append(h5);
      // // div3.append(h6);
      // // div3.append(h7);



    }
  )

})

function additems() {


}



$("#add-games").click(function() {
  $(".add-dialog").fadeIn();
});


$("#add").click(function() {

  var title = $("#title").val();
  var brand = $("#brand").val();
  var rating = $("#rating").val();
  var thumbnail = $("#thumbnail").val();
  var logo = $("#logo").val();



  var myRef = firebase.database().ref().push();
  var key = myRef.key;

  firebase.database().ref("games/" + key).set({
    title: title,
    brand: brand,
    rating: rating,
    thumbnail: thumbnail,
    logo: logo
  }, function(error) {
    if (error) {

    } else {
      alert("success");
    }
  })

});

$("#close-dialog").click(function() {
  $(".add-dialog").fadeOut();
})

function myFunction(text) {
  var x = document.getElementById("snackbar");
  x.innerHTML = text;
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);

  window.location = "gameoverview.html";
}
