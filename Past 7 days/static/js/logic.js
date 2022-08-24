// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
  center: [
    39.5, -98.5
  ],
  zoom: 3,
});


 // We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
     });

let Satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    }).addTo(map);    
    
// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": Satellite
};    

let earthquakes = new L.LayerGroup();
let overlays = { 
  "Earthquakes": earthquakes
};


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);


function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

let EQD = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Retrieve the earthquake GeoJSON data.
d3.json(EQD).then(function(data) 
{
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, 
    {
    
    pointToLayer: function(feature, latlng) 
        {
          console.log(data);
          return L.circleMarker(latlng);
        },
          // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo,
        onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);}
    }).addTo(earthquakes);
    earthquakes.addTo(map);
        // Create a legend control object.
        let legend = L.control({
        position: "bottomright"});
        // Create a legend control object.
        legend.onAdd = function() 
        {
          let div = L.DomUtil.create("div", "info legend");
          const magnitudes = [0, 1, 2, 3, 4, 5];
          const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"];
            for (var i = 0; i < magnitudes.length; i++) {
              console.log(colors[i]);
              div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i> " +
                magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");}
            return div;
        };
         
          legend.addTo(map);
});



// Grabbing our GeoJSON data.
// Creating a GeoJSON layer with the retrieved data.
// Creating a GeoJSON layer with the retrieved data.
// Creating a GeoJSON layer with the retrieved data.

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);     

// //creating a circle around the map of a city
// L.circle([34.0522, -118.2437], {
//   radius: 10000,
//   color: "black",
//   fillColor: 'ffffa1'
// }).addTo(map);

// // An array containing each city's location, state, and population.
// let cities = [{
//   location: [40.7128, -74.0059],
//   city: "New York City",
//   state: "NY",
//   population: 8398748
// },
// {
//   location: [41.8781, -87.6298],
//   city: "Chicago",
//   state: "IL",
//   population: 2705994
// },
// {
//   location: [29.7604, -95.3698],
//   city: "Houston",
//   state: "TX",
//   population: 2325502
// },
// {
//   location: [34.0522, -118.2437],
//   city: "Los Angeles",
//   state: "CA",
//   population: 3990456
// },
// {
//   location: [33.4484, -112.0740],
//   city: "Phoenix",
//   state: "AZ",
//   population: 1660272
// }
// ];

// // Get data from cities.js
// let cityData = cities;


// // Loop through the cities array and create one marker for each city.
// cities.forEach(function(city) {
//   console.log(city)
//  });

//  // Loop through the cities array and create one marker for each city.
// cities.forEach(function(city) {
//   console.log(city)
//   L.circleMarker(city.location, {
//     radius: city.population/100000
//   })
//   .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population + "</h3>")
//   .addTo(map);
// });

// // Coordinates for each point to be used in the line.
// //let line = [
// //   [33.9416, -118.4085],
// //   [37.6213, -122.3790]
// // ];

// // Create a polyline using the line coordinates and make the line red.
// // L.polyline(line, {
// //   color: "red"
// // }).addTo(map);

// //Coordinates for each point to be used in the polyline.
// let line = [
//   [33.9416, -118.4085],
//   [37.6213, -122.3790],
//   [40.7899, -111.9791],
//   [47.4502, -122.3088]
// ];

// // Create a polyline using the line coordinates and make the line yellow.
// L.polyline(line, {
//   color: "yellow"
// }).addTo(map);


// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};


// // / Grabbing our GeoJSON data.
// // L.geoJSON(sanFranAirport, {
// //     // We turn each feature into a marker on the map.
// //     pointToLayer: function(feature, latlng) {
// //       console.log(feature);
// //       return L.marker(latlng)
//         // .bindPopup("<h2>" + feature.properties.city + "</h2>")
// //     }

// //   }).addTo(map);


// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup();
//   }

// }).addTo(map);

// let airportData = "https://raw.githubusercontent.com/RashaanR/Mapping_Earthquakes/main/majorAirports.json"

// // Grabbing our GeoJSON data.
// d3.json(airportData).then(function(data) {
//   console.log(data);
// // Creating a GeoJSON layer with the retrieved data.
// L.geoJSON(data, {
//   onEachFeature: function(feature, layer) {
//     layer.bindPopup("<h2>" + feature.properties.city + "</h2>");
//   }
// }).addTo(map);
// });