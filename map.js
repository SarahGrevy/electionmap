mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWhncmV2eSIsImEiOiJjbDFwZHg2YzkwMTVqM2lzeTgxa29waDNnIn0.8fJhOwF_qreAF9cEeVNUMw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sarahgrevy/cl3ugxtsy005k14o841bjdz3b',
    zoom: 6.5,
    maxZoom: 9,
    minZoom: 3,
    center: [-85.5, 37.7]
});

map.on("load", function () {
   let layers = map.getStyle().layers;
   for (var i = 0; i < layers.length; i++) {
       console.log(layers.id)
   }

    map.addLayer({
      id: "us_states_elections_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/statesElections.geojson",
        
      },
      maxzoom: 6,
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.7,
      },
    });
    map.addLayer({
      id: "us_states_elections",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/statesElections.geojson",
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "Winner"],
          "Donald J Trump", "#cf635d",
          "Joseph R Biden Jr", "#6193c7",
          "Other", "#91b66e",
          "#ffffff",
        ],
        "fill-outline-color": "#ffffff",
        "fill-opacity": [
            "step",
            ["get", "WnrPerc"],
            0.3,
            0.4,
            0.5,
            0.5,
            0.7,
            0.6,
            0.9,
        ],
      },
    },"us_states_elections_outline");

    map.addLayer(
        {
          id: "us_counties_elections_outline",
          type: "line",
          source: {
            type: "geojson",
            data: "data/countiesElections.geojson",
          },
          minzoom: 6,
          paint: {
            "line-color": "#ffffff",
            "line-width": 0.25,
          },
        },
        "us_states_elections"
      );
      map.addLayer(
        {
          id: "us_counties_elections",
          type: "fill",
          source: {
            type: "geojson",
            data: "data/countiesElections.geojson",
          },
          minzoom: 6,
          paint: {
            "fill-color": [
              "match",
              ["get", "Winner"],
              "Donald J Trump",
              "#cf635d",
              "Joseph R Biden Jr",
              "#6193c7",
              "Other",
              "#91b66e",
              "#ffffff",
            ],
            "fill-outline-color": "#000000",
            "fill-opacity": [
              "step",
              ["get", "WnrPerc"],
              0.3,
              0.4,
              0.5,
              0.5,
              0.7,
              0.6,
              0.9,
            ],
          },
        },
        "us_counties_elections_outline"
      );
    
  });
  
  // Create the popup
map.on('click', 'us_states_elections', function (e) {
    var winner = e.features[0].properties.Winner;
    var wnrPerc = e.features[0].properties.WnrPerc;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(winner + '<br>' + wnrPerc)
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on('mouseenter', 'us_states_elections', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'us_states_elections', function () {
    map.getCanvas().style.cursor = '';
});

map.on('click', 'us_counties_elections', function (e) {
    var winner = e.features[0].properties.Winner;
    var wnrPerc = e.features[0].properties.WnrPerc;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(winner + '<br>' + wnrPerc)
        .addTo(map);
});
map.on('mouseenter', 'us_counties_elections', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'us_counties_elections', function () {
    map.getCanvas().style.cursor = '';
});

map.on('click', 'us_counties_elections', function (e) {
  var stateName = e.features[0].properties.State;
  var countyName = e.features[0].properties.County;
  var winner = e.features[0].properties.Winner;
  var wnrPerc = e.features[0].properties.WnrPerc;
  var totalVotes = e.features[0].properties.Total;
  wnrPerc = (wnrPerc * 100).toFixed(0);
  totalVotes = totalVotes.toLocaleString();
  stateName = stateName.toUpperCase();
  countyName = countyName.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + countyName + ' - ' + stateName + '</h4>'
          + '<h2>' + winner + '</h2>'
          + '<p>' + wnrPerc + '% - (' + totalVotes + ' votes)</p>')
      .addTo(map);
});
map.on('mouseenter', 'us_counties_elections', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'us_counties_elections', function () {
  map.getCanvas().style.cursor = '';
});


