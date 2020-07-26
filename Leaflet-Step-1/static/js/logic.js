var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(myMap);

d3.json (queryUrl, function(data){
    var color;
    // var opacityDepth;
    data.features.forEach(element => {
        // console.log(element);
        var longitude = element.geometry.coordinates[0];
        var latitude = element.geometry.coordinates[1];
        // var depth = element.geometry.coordinates[2];
        var magnitude = element.properties.mag;
        var timeOccurred = new Date(element.properties.time);
        var place = element.properties.place;
        
        if (magnitude <= 0){
            color = "#66ff66"
        }else if(magnitude <=2){
            color = "#b3ff66"
        }else if(magnitude <=4){
            color = "#ffff66"
        }else if(magnitude <=6){
            color = "#ffb366"
        }else{
            color = "#ff6666"
        }
        L.circle([latitude, longitude],{
            stroke : true,
            color : "black",
            weight : 0.5,
            fillColor : color,
            fillOpacity : 0.7,
            radius : magnitude * 10500,
        }).bindPopup(`Occurred at ${place}, a
        <br> ${timeOccurred}.
        <br> `).addTo(myMap);
    }); 
})
