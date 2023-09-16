fetch('http://localhost:5000/users/getLocation',{
}).then(res => {
  return res.json();
})
  .then(data => {
      donorLocation = JSON.parse(data);
      let latitude = donorLocation.lat;
      let longitude = donorLocation.lng;
      // initMap(latitude,longitude);


  })
  .catch(error => console.log(error))

  

/*
 * This demo illustrates the coordinate system used to display map tiles in the
 * API.
 *
 * Tiles in Google Maps are numbered from the same origin as that for
 * pixels. For Google's implementation of the Mercator projection, the origin
 * tile is always at the northwest corner of the map, with x values increasing
 * from west to east and y values increasing from north to south.
 *
 * Try panning and zooming the map to see how the coordinates change.
 */
// class CoordMapType {
//   tileSize;
//   alt = null;
//   maxZoom = 17;
//   minZoom = 0;
//   name = null;
//   projection = null;
//   radius = 6378137;
//   constructor(tileSize) {
//     this.tileSize = tileSize;
//   }
//   getTile(coord,zoom,ownerDocument) {
//     const div = ownerDocument.createElement("div");

//     div.innerHTML = String(coord);
//     div.style.width = this.tileSize.width + "px";
//     div.style.height = this.tileSize.height + "px";
//     div.style.fontSize = "10";
//     div.style.borderStyle = "solid";
//     div.style.borderWidth = "1px";
//     div.style.borderColor = "#AAAAAA";
//     return div;
//   }
//   releaseTile(tile) {}
// }
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 8.764878664568888, lng: 38.999324424988735},
    zoom: 0,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: 8.764878664568888,
            lng: 38.999324424988735,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}

window.initMap = initMap;