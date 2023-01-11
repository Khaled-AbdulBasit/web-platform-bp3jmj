let map;
let marker;

function initMap(latitude = 30.045915, longitude = 31.2264785) {
  const myLatlng = { lat: latitude, lng: longitude };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: myLatlng,
  });
  // This event listener will call addMarker() when the map is clicked.
  map.addListener('click', (event) => {
    addMarker(event.latLng);
    updateLatLngInput(event.latLng.lat(), event.latLng.lng());
  });
}

function updateLatLngInput(lat, lng) {
  document.getElementById('latitude').value = lat;
  document.getElementById('longitude').value = lng;
}

document.getElementById('position').addEventListener('click', function (event) {
  event.preventDefault();
  let latitude = Number(document.getElementById('latitude').value);
  let longitude = Number(document.getElementById('longitude').value);
  // chick if inputs not empty
  if (
    latitude != '' &&
    longitude != '' &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude)
  ) {
    const myLatlng = { lat: latitude, lng: longitude };
    initMap(latitude, longitude);
    // take position value from inputs and add new marker
    addNewMarker(myLatlng);
  } else {
    alert('Enter the coordinates and coordinates must be a number');
  }
});
// take permission to retrieve current location
navigator.geolocation.getCurrentPosition(
  function (position) {
    //If permissions are Accepted
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    initMap(latitude, longitude);
  },
  function () {
    // If permissions are denied	(Block button is pressed) Cairo Tower Coordinates
    //initMap(30.045915,31.2264785);
  }
);
// Add a marker to the map if marker not exist and update position if exist.
function addMarker(position) {
  if (marker) {
    let latitude = position.toJSON()['lat'];
    let longitude = position.toJSON()['lng'];
    updateLatLngInput(latitude, longitude);
    marker.setPosition(position);
  } else {
    addNewMarker(position);
  }
}
function addNewMarker(position) {
  marker = new google.maps.Marker({
    position: position,
    map: map,
    draggable: true,
  });
  // The dragend event occurs when a user has finished dragging a marker
  google.maps.event.addListener(marker, 'dragend', function (event) {
    updateLatLngInput(event.latLng.lat(), event.latLng.lng());
  });
  // The drag event occurs while a user dragging a marker
  google.maps.event.addListener(marker, 'drag', function (event) {
    updateLatLngInput(event.latLng.lat(), event.latLng.lng());
  });
}
window.initMap = initMap;
