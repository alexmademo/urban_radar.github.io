
var latlong = Cookies.get('latlng');

//$( document ).ready(function() {
//    var latlong = Cookies.get('latlong');
//    
//    console.log(latlong);
////});



/*FIREBASE*/

var config = {
    apiKey: "AIzaSyBgxvdzti-elg6RazNxkQozZ8UWIS9_EQo",
    authDomain: "urbanradarmact.firebaseapp.com",
    databaseURL: "https://urbanradarmact.firebaseio.com",
    projectId: "urbanradarmact",
    storageBucket: "urbanradarmact.appspot.com",
    messagingSenderId: "600236991437"
};
firebase.initializeApp(config);

window.db = firebase.database(); 
window.locRef = db.ref('locations');
window.eventRef = db.ref('events');

// TO WRITE TO FIREBASE

$('#datetimepicker1').datetimepicker();

$('#submit').click(function(){
    
    
    var lat = latlong['lat'];
    var lng = latlong['lng'];
    var eventId = Date.now();
    var ttl = $('#title').val();
    var shortdesc = $('#shortdesc').val();
    var email = $('#email').val();
    var startdate = $('#startdate').val();
    
//    console.log(lat);
    
    eventRef.child(eventId).set({
        title: ttl,
//        Lat : lat,
        description: shortdesc,
        email: email,
        start: startdate,

    });
    
    location.reload();
});
$('#submit').click(function(){
    redirect();
    });

/// TO READ FROM FIREBASE

window.eventRef = db.ref('events');

eventRef.on('value',function(snap){
    var dataOn = snap.val();
    var today = Date.now();
    var eventDate = '';
    
    
    for(obj in dataOn){
        
        if(today-eventDate<=5){}
           
        var ttl = snap.child("title").val();
        var shortdesc = snap.child("description").val();
        var email = snap.child("email").val();
        var startdate = snap.child("start").val();
        
    }
    
//    console.log([dataOn[obj][ttl]]);
                 
});

function redirect (){
   document.location = 'from_scratch_5.html'; //redirect me to www.test.com/check.php
 }


//read markers from FIREBASE

//locRef.on('value',function(snap){
//    var dataOn = snap.val();
//    
//    for(obj in dataOn){
//        
//        
//        var mkr = L.circle([dataOn[obj]['Lat'], dataOn[obj]['Lon']],{
//            color: 'red',
//            fillColor: 'red',
//            fillOpacity: 0.5,
//            radius: 50
//        }).addTo(map);
//        
//    }
//    
//    console.log([dataOn[obj]]);
//                 
//});