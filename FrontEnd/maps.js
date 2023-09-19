   // Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  // const position = { lat: 8.764878664568888, lng: 38.999324424988735};
 const position=[
    { lat: 8.764878664568888, lng: 38.999324424988735},
    {lat: 9.048688835558458, lng: 38.72865124690789},
    {lat:8.750927198591395,lng: 38.98249725365114},
    {lat:8.561535095392815,lng: 39.28249097144026}
  ]
  const positionName=["donors-location","kiduspaulos-hospital","bishoftu-hospital","adama-general-hospital "];
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 6.4,
    center: position[1],
    mapId: "DEMO_MAP_ID",
  });
  for(let i=0 ;i <position.length ;i++){
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position[i],
    title: positionName[i],
  });
}
}

initMap();