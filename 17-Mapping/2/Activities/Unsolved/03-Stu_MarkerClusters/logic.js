// Mapbox API
var mapbox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ.T6YbdDixkOBWH_k9GbS8JQ";

// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer(mapbox).addTo(myMap);

// Building API query URL
var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
var date = "$where=created_date between'2016-01-10T12:00:00' and '2017-01-01T14:00:00'";
var complaint = "&complaint_type=Rodent";
var limit = "&$limit=100";

// Assembling API query URL
var url = baseURL + date + complaint + limit;
// console.log(url);
d3.json(url, function(response) {
 var markers = L.markerClusterGroup();
 for(var i = 0; i < response.length; i++) {
   var location = response[i].location;
   if (location) {
     var lat = location.coordinates[0];
     var lon = location.coordinates[1];
    markers.addLayer(L.marker([lon, lat]));

   }

 }
myMap.addLayer(markers);

});
