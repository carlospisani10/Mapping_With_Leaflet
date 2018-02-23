// Creating map object
var map = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ.T6YbdDixkOBWH_k9GbS8JQ").addTo(map);

var link = "http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/" +
"35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson";

function chooseColor(borough) {
  switch(borough) {
    case "Brooklyn":
      return "yellow";
      break;
    case "Bronx":
      return "red";
      break;
    case "Manhattan":
      return "orange";
      break;
    case "Queens":
      return "green";
      break;
    case "Staten Island":
      return "Purple";
      break;
    default:
    return "black";
    break;

  }
}
// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: chooseColor(feature.properties.borough),
        fillOpacity: 0.5,
        weight: 1.5
      }
    },
  onEachFeature: function(feature, layer) {
    layer.on({
      mouseover: function(event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.9
        });
      },
      mouseout: function(event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.5
        })
      },
      click: function(event) {
        map.fitBounds(event.target.getBounds())
      }
    })
    layer.bindPopup("<h1>"+ feature.properties.neighborhood+"</h1>")
  }
  }).addTo(map);
});
