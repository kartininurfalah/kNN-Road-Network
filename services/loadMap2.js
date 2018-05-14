const bakmiBandung = require('../RESULT/BakmiBandung.json')
const rumahMakanPadang = require('../RESULT/RumahMakanPadang.json')

const API = [
  bakmiBandung,
  rumahMakanPadang,
]

var loop = 0
var count = 0;
var map;

// var DATA = []

function pinSymbol(color) {
  return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 1,
 };
}

function generateMap(data) {
  console.log(data);
  DATA.push(data)
  if (count === 0) {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: -6.9081229, lng: 107.6108905 }
    });
  }

  var markers = data.map(function({ lat, lng }, i) {
    count += 1;
    if (count>=1 && count<=20) {
      var marker = new google.maps.Marker({
        position: {
          lat,
          lng,
        },
        map: map,
        label: String(count),
        icon: pinSymbol("#99ffcc")
      });
    }
    else {
      var marker = new google.maps.Marker({
        position: {
          lat,
          lng,
        },
        map: map,
        label: String(count),
        icon: pinSymbol("#ff0000")
      });
    }
    // var marker = new google.maps.Marker({
    //   position: {
    //     lat,
    //     lng
    //   },
    //   map: map,
    //   label: String(count)
    // });
  });
}

$(window).on('load', function() {
  // your code here
  (function() {
    API.forEach(api => {
      generateMap(api);
    });
  })();
});


// Styles
$('.dropdown-trigger').dropdown();