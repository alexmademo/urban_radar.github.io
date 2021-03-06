//var map = L.map("map").setView([41.396940,2.194380], 15);//15 is the zoom level
//
//L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
//	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}).addTo(map);

$(document).ready(function(){
  $('.dropdown-submenu a.test').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});

//function myFunction() {
//    document.getElementById("myDropdown").classList.toggle("show");
//}
//
//// Close the dropdown menu if the user clicks outside of it
//window.onclick = function(event) {
//  if (!event.target.matches('.dropbtn')) {
//
//    var dropdowns = document.getElementsByClassName("dropdown-content");
//    var i;
//    for (i = 0; i < dropdowns.length; i++) {
//      var openDropdown = dropdowns[i];
//      if (openDropdown.classList.contains('show')) {
//        openDropdown.classList.remove('show');
//      }
//    }
//  }
//}
//
//function myFunction2() {
//    document.getElementById("myDropdown2").classList.toggle("show");
//}
//
//// Close the dropdown menu if the user clicks outside of it
//window.onclick = function(event) {
//  if (!event.target.matches('.dropbtn2')) {
//
//    var dropdowns = document.getElementsByClassName("dropdown-content2");
//    var i;
//    for (i = 0; i < dropdowns.length; i++) {
//      var openDropdown = dropdowns[i];
//      if (openDropdown.classList.contains('show')) {
//        openDropdown.classList.remove('show');
//      }
//    }
//  }
//}
//
//function myFunction3() {
//    document.getElementById("myDropdown3").classList.toggle("show");
//}
//
//// Close the dropdown menu if the user clicks outside of it
//window.onclick = function(event) {
//  if (!event.target.matches('.dropbtn3')) {
//
//    var dropdowns = document.getElementsByClassName("dropdown-content3");
//    var i;
//    for (i = 0; i < dropdowns.length; i++) {
//      var openDropdown = dropdowns[i];
//      if (openDropdown.classList.contains('show')) {
//        openDropdown.classList.remove('show');
//      }
//    }
//  }
//}
//
//function myFunction4() {
//    document.getElementById("myDropdown4").classList.toggle("show");
//}
//
//// Close the dropdown menu if the user clicks outside of it
//window.onclick = function(event) {
//  if (!event.target.matches('.dropbtn4')) {
//
//    var dropdowns = document.getElementsByClassName("dropdown-content4");
//    var i;
//    for (i = 0; i < dropdowns.length; i++) {
//      var openDropdown = dropdowns[i];
//      if (openDropdown.classList.contains('show')) {
//        openDropdown.classList.remove('show');
//      }
//    }
//  }
//}
//
//
//var dropdown = document.getElementsByClassName("dropdown-btn");
//var i;
//
//for (i = 0; i < dropdown.length; i++) {
//  dropdown[i].addEventListener("click", function() {
//    this.classList.toggle("active");
//    var dropdownContent = this.nextElementSibling;
//    if (dropdownContent.style.display === "block") {
//      dropdownContent.style.display = "none";
//    } else {
//      dropdownContent.style.display = "block";
//    }
//  });
//}


//$(document).ready(function(){
//    $(window).scroll(function(){
//        var scroll= $(window).scrollTop();
//        if(scroll>100){
//            $("#changenav").css("background-color:#555");
//        }
//        else{
//            $("changenav").css("navbar-transparent");
//        }
//    })
//})

//$(document).ready(function(){
//    $('[data-toggle="popover"]').popover(); 
//});




//---------------------------------MAPPAGE---------------------------------

var colors = {
    'Food':'red',
    'Culture':'blue',
    'Education':'green',
    'User': 'black',
    'Health':'orange',
    'Transport':'yellow'
};

var useIcon = L.Icon.extend({
		options: {
		    //shadowUrl: 'leaf-shadow.png',
		    iconSize:     [25, 25],
		    shadowSize:   [50, 64],
		    iconAnchor:   [22, 94],
		    shadowAnchor: [4, 62],
		    popupAnchor:  [-3, -76],
		  }
		});

var Food = new useIcon({iconUrl: 'Food.png'}),
    Health = new useIcon({iconUrl: 'Health.png'}),
  	Education = new useIcon({iconUrl: 'Education.png'}),
    Transport = new useIcon({iconUrl: 'Transport.png'}),
    Culture = new useIcon({iconUrl: 'Culture.png'});


/*DATA HANDLING*/
var dbJSON = 'data/ready_for_test.json';
var User = 'data/user-location.json';

var dataJSON = [];
var markers = [];

var rad=3000;
var typ='All';



var map = L.map('mapid').setView([31.2010003,121.418010], 13);

L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',{
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);




//////////////////////////////VARIABLES DECLARATION//////////////////////////////////

var dbJSON = 'data/ready_for_test.json';
var User = 'data/user-location.json';
var dataJSON = [];
var markers = [];


//////////////////////////////FUNCTIONAL VARIABLES///////////////////////////////////

var control = L.Routing.control(L.extend(window.lrmConfig, {
	waypoints: [
		L.latLng(31.2000003,121.418010)
	],
    language: 'en',
	geocoder: L.Control.Geocoder.nominatim(),
    routeWhileDragging: true,
    reverseWaypoints: true,
    showAlternatives: true,
    altLineOptions: {
        styles: [  
        ]
    }
})).addTo(map);

//////////////////////////////ROUTER CONTROL///////////////////////////////////
map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
    
    L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });
    
    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
    });
});

$('.mapCL').click(    
    function(){
        color = $(this).css('background-color');        
        markers.forEach(function(element){
            element.setStyle({color: color, fillColor: color})
        })
    }
);

$('.dropdown-item').click(function(){
    var typ = $(this).attr('id');
//    console.log($(this).attr('id'))
    markers.forEach(function(element){
        if(element['Type']==typ){
            element.setStyle({stroke: true, fill: true});
        }else{
            element.setStyle({stroke: false, fill: false});
        }
    })
});
function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}
//////////////////////////////ROUTER CONTROL///////////////////////////////////




$(document).ready(function(){
  $('.dropdown-submenu a.test').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn2')) {

    var dropdowns = document.getElementsByClassName("dropdown-content2");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function myFunction3() {
    document.getElementById("myDropdown3").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn3')) {

    var dropdowns = document.getElementsByClassName("dropdown-content3");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function myFunction4() {
    document.getElementById("myDropdown4").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn4')) {

    var dropdowns = document.getElementsByClassName("dropdown-content4");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}


$(document).ready(function(){
    $('[data-toggle="popover"]').popover(); 
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var userMarker = L.circle([31.2010003,121.418010],{
            color: colors['User'],
            fillColor: colors['User'],
            fillOpacity: 0.5,
            radius: 50
        }).addTo(map);      
        
userMarker[`Type`] = 'User';

////////////////////////////////////////////////////////////////////////////////

$.getJSON(dbJSON, function(data) {
    data.forEach(function(element){
        var tp = element['Type'];
        
        var lat = parseFloat(element['Lat']);
        var lon = parseFloat(element['Lon']); 
                              
        var marker = L.marker([parseFloat(element['Lat']), parseFloat(element['Lon'])],{
            color: colors[tp],
            icon: new useIcon({iconUrl: ''+tp+'.png'}),
            opacity:0
//            fill: false,
//            stroke: false,
//            fillColor: colors[tp],
//            fillOpacity: 0.5,
//            radius: 50
        }).addTo(map);      
        
        marker[`Type`] = tp;  
        
        marker[`Lat`] = lat;
        marker[`Lon`] = lon;
        var distance = getDistanceFromLatLonInKm(31.2010003,121.418010,element['Lat'],element['Lon']);
        marker['Distance']=distance;
//        console.log(distance);
        markers.push(marker);       

///////////////////////// ALL ////////////////////        

    });
});
////////////////////////10 MINS FUNCTIONS/////////////////////////

$('.tp').click(function(){
    typ = $(this).text();
    $('.tp').css('color', 'grey');
    $(this).css('color', 'black');
//    $('.radar').css('color', 'black');
//    $(this).css('color', 'red');
//    console.log(typ);
    
    markers.forEach(function(element){     
        if(element['Type']==typ && element['Distance'] <= rad){
            element.setOpacity(1);
        }else{
            element.setOpacity(0);
        };        
    });
});


$('.radar').click(function(){
    rad = parseInt($(this).attr('id'));
    $('.radar').css('color', 'grey');
    $(this).css('color', 'black');
//    console.log(rad);    

    markers.forEach(function(element){     
        if(element['Type']==typ && element['Distance'] <= rad){
            element.setOpacity(1);
        }else{
            element.setOpacity(0);
        };        
    });    
});





////////////////////////DISTANCE FUNCTION/////////////////////////

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
    return d;
//    console.log(d);
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}



$('#explorebtn1').click(function(){
    redirect();
    });

function redirect (){
   document.location = 'map/from_scratch_5.html'; //redirect me to www.test.com/check.php
 }

