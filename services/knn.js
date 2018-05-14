var euclidianDistance = ((point1, point2) => {  
  return Math.sqrt(Math.pow(point1.geometry.location.lat - point2.geometry.location.lat, 2) + Math.sqrt(point1.geometry.location.lng - point2.geometry.location.lng, 2));
});

var getNearestObject = ((qPoint, dataAllQuery) => {
  let distance = [];
  const newData = [];
  for (let i = 0; i < dataAllQuery.length; i++) {
    if (euclidianDistance(qPoint, dataAllQuery[i])) {
      distance.push(euclidianDistance(qPoint, dataAllQuery[i]))
      dataAllQuery[i].distance = euclidianDistance(qPoint, dataAllQuery[i])
    }
  };
 
  return dataAllQuery.sort(function(a, b){
    return a.distance - b.distance
  })
});

const generateQueryPoints = () => {
  const queryPointId = $('#queryPoints').val()
  const location = $('#location').val()
  const nilaiK = $('#nilaiK').val()

  let data
  let compareData

  if (location === 'bakmi') {
    data = DATA[1]
    compareData = DATA[0]
  } else if (location === 'padang') {
    data = DATA[0]
    compareData = DATA[1]
  }
  
  const queryPoint = data.filter((data) => data.id === queryPointId)[0]
  
  const result = getNearestObject(queryPoint, compareData).filter((data) => typeof(data.distance) === "number")

  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: -6.9081229, lng: 107.6108905 }
  });
  new google.maps.Marker({
    position: queryPoint.geometry.location,
    map: map,
    label: 'X'
  });

  for (let i = 0; i < nilaiK; i++) {
    console.log({
      lat: result[i].geometry.location.lat,
      lng: result[i].geometry.location.lng,
      distance: result[i].distance,
    });
    
    new google.maps.Marker({
      position: result[i].geometry.location,
      map: map,
    });
  }
}
