fetch('http://localhost:5000/users/getLocation',{
}).then(res => {
  return res.json();
})
  .then(data => {
      donorLocation = JSON.parse(data);
      let lat = donorLocation.lat;
      let lng = donorLocation.lng;
      location(lat,lng);


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
class CoordMapType {
  tileSize;
  alt = null;
  maxZoom = 17;
  minZoom = 0;
  name = null;
  projection = null;
  radius = 6378137;
  constructor(tileSize) {
    this.tileSize = tileSize;
  }
  getTile(coord, zoom, ownerDocument) {
    const div = ownerDocument.createElement("div");

    div.innerHTML = String(coord);
    div.style.width = this.tileSize.width + "px";
    div.style.height = this.tileSize.height + "px";
    div.style.fontSize = "10";
    div.style.borderStyle = "solid";
    div.style.borderWidth = "1px";
    div.style.borderColor = "#AAAAAA";
    return div;
  }
  releaseTile(tile) {}
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: {lat: -25.363, lng: 131.044},
  });
  // Insert this overlay map type as the first overlay map type at
  // position 0. Note that all overlay map types appear on top of
  // their parent base map.
  const coordMapType = new CoordMapType(new google.maps.Size(256, 256));

  map.overlayMapTypes.insertAt(0, coordMapType);
}

window.initMap = initMap;
