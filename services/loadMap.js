const API = [
  "https://api.myjson.com/bins/126t1r",
  "https://api.myjson.com/bins/crlin"
];

var loop = 0
var count = 0;
var map;

var DATA = []

function generateMap(url) {
  fetch(url)
    .then(res => res.json())
    .then(({ results }) => {
      console.log(results);
      DATA.push(results)
      if (count === 0) {
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          center: { lat: -6.9081229, lng: 107.6108905 }
        });
      }

      var markers = results.map(function({ geometry }, i) {
        count += 1;

        var marker = new google.maps.Marker({
          position: geometry.location,
          map: map,
          label: String(count)
        });
      });
    });
}

(function() {
  API.forEach(api => {
    generateMap(api);
  });
})();


// Styles
$('.dropdown-trigger').dropdown();