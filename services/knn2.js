var euclidianDistance = ((point1, point2) => {  
  return Math.sqrt(Math.pow(point1.lat - point2.lat, 2) + Math.sqrt(point1.lng - point2.lng, 2));
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

function pinSymbol(color) {
  return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 1,
 };
};

const generateQueryPoints = () => {
  const queryPointId = $('#queryPoints').val()
  const location = $('#location').val()
  const nilaiK = $('#nilaiK').val()

  let data
  let compareData

  if (location === 'bakmi') {
    data = DATA[0]
    compareData = DATA[1]
  } else if (location === 'padang') {
    data = DATA[1]
    compareData = DATA[0]
  }

  console.log({
    data,
    queryPointId
  })
  
  const queryPoint = data.filter((x) => x.id === queryPointId)[0]

  console.log({
    queryPoint,
    compareData
  })
  
  const result = getNearestObject(queryPoint, compareData).filter((data) => typeof(data.distance) === "number")

  console.log({ result })

  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: -6.9081229, lng: 107.6108905 }
  });
  new google.maps.Marker({
    position: {
      lat: queryPoint.lat,
      lng: queryPoint.lng,
    },
    map: map,
    label: 'X',
    icon: pinSymbol("#00ff00"),
  });

  for (let i = 0; i < nilaiK; i++) {
    console.log({
      lat: result[i].lat,
      lng: result[i].lng,
      distance: result[i].distance,
      name: result[i].name,
    });
    if (location=='bakmi') {
      new google.maps.Marker({
      position: {
          lat:result[i].lat,
          lng: result[i].lng,
      },
      map: map,
      icon: pinSymbol("#99ffcc"),
      });
    }
    else {
      new google.maps.Marker({
      position: {
          lat:result[i].lat,
          lng: result[i].lng,
      },
      map: map,
      icon: pinSymbol("#ff0000"),
    });
    }
    // new google.maps.Marker({
    //   position: {
    //     lat: result[i].lat,
    //     lng: result[i].lng,
    //   },
    //   map: map,
    // });
  }
}
