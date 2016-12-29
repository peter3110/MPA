
var data = {}, map;

queue()
  .defer(d3.json, "../static/origenes/data/land.topojson") // land
  .defer(d3.csv, "../static/origenes/data/small_cities.csv") // cities
  .await(ready);

function ready(error, land, cities) {

  data.land = land;
  data.cities = cities;

  map = d3.carto.map();
  d3.select("#viz").call(map);

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

  // Limites entre los paises a considerar y datos sobre estos
  landLayer = d3.carto.layer.featureArray();

  landLayer
    .features(topojson.feature(data.land, data.land.objects.world).features) // limites 
    .label("Land")
    .renderMode("svg")
    .cssClass("land");

  landLayer
    .path("../static/origenes/data/land.topojson")  // != paises clickeables
    .clickableFeatures(true);

  // Genero el mapa
  map
    .addCartoLayer(landLayer)
    .addCartoLayer(cityLayer)
    //.addCartoLayer(countryLayer)
    .mode("globe")
    .setScale(.1);

  // Juego con el mapa
  
  //d3.selectAll("path.land")
  //  .style("fill", "pink");
  //landLayer.g().selectAll("path.land").style("fill", "pink");
  //colorScale = d3.scale.linear().domain([0,10000000,100000000,1000000000]).range(["gray","green","yellow","red"])
  //d3.selectAll("path.land").style("fill", function(d) {return colorScale(d.properties.pop)})
  d3.selectAll("path.land").style("fill", function(d) {
    if (d.properties.iso == 'USA') {return "red"; }
    else if (d.properties.iso == 'ARG') {return "blue"; }

    return "lightgrey";
  });


}














