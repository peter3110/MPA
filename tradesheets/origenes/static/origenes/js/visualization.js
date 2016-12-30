
var data = {}, map;

queue()
  .defer(d3.json, "../static/origenes/data/countries.topojson") // land
  .defer(d3.csv, "../static/origenes/data/small_cities.csv") // cities
  .defer(d3.json, "../static/origenes/data/oceans.json") // oceans
  .defer(d3.json, "../static/origenes/data/paths.geojson") // paths
  .await(ready);

function ready(error, countries, cities, oceans, paths) {

  data.countries = countries;
  data.cities = cities;
  data.oceans = oceans;
  data.paths = paths;

  map = d3.carto.map();
  d3.select("#viz")
    .call(map);

  // Ciudades marcadas en el mapa
  cityLayer = d3.carto.layer.xyArray();
  cityLayer
    .features(data.cities)
    .label("Cities")
    .renderMode("svg")
    .clickableFeatures(true)
    .cssClass("city")
    .markerSize(1)
    .x("xcoord")
    .y("ycoord")

  // Paises
  countryLayer = d3.carto.layer.featureArray();
  countryLayer
    .features(topojson.feature(data.countries, data.countries.objects.world).features) // limites 
    .label("Country")
    .renderMode("svg")
    .cssClass("countries")
    .clickableFeatures(true);

  // Oceanos
  oceansLayer = d3.carto.layer.featureArray();
  oceansLayer
    .features(topojson.feature(data.oceans, data.oceans.objects.ocean).features)
    .label("Ocean")
    .renderMode("svg")
    .cssClass("oceans")
    .clickableFeatures(false);

  // Arcos
  pathsLayer = d3.carto.layer.geojson();
  pathsLayer
    .path("../static/origenes/data/paths.geojson")
    .label("Fletes")
    .renderMode("svg")
    .cssClass("fletes");

  // Mapa
  map
    .addCartoLayer(countryLayer)
    .addCartoLayer(cityLayer)
    .addCartoLayer(oceansLayer)
    .addCartoLayer(pathsLayer)
    .mode("globe")
    .setScale(.1);

  // Juego con el mapa
  
  //d3.selectAll("path.land")
  //  .style("fill", "pink");
  //landLayer.g().selectAll("path.land").style("fill", "pink");
  //colorScale = d3.scale.linear().domain([0,10000000,100000000,1000000000]).range(["gray","green","yellow","red"])
  //d3.selectAll("path.land").style("fill", function(d) {return colorScale(d.properties.pop)})
  d3.selectAll("path.countries").style("fill", function(d) {
    if (d.properties.iso == 'USA') {return "red"; }
    else if (d.properties.iso == 'ARG') {return "blue"; }

    return "lightgrey";
  });


}














