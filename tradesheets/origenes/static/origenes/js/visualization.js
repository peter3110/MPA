
var data = {}, map;

queue()
  .defer(d3.json, "../static/origenes/data/land.topojson")
  .defer(d3.csv, "../static/origenes/data/small_cities.csv")
  .await(ready);

function ready(error, land, cities) {

  data.land = land;
  data.cities = cities;

  map = d3.carto.map();
  d3.select("#viz").call(map);

  // Limites entre los paises a considerar y datos sobre estos
  landLayer = d3.carto.layer.featureArray();

  landLayer
    .features(topojson.feature(data.land, data.land.objects.world).features) // limites 
    .label("Land")
    .renderMode("svg")
    .path("../static/origenes/data/world.geojson")  // != paises 
    .clickableFeatures(true)
    .cssClass("land");

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

  // Genero el mapa
  map
    .addCartoLayer(landLayer)
    .addCartoLayer(cityLayer)
    .setScale(1);

  map.updateChoropleth({
    USA: '#0fa0fa',
    CAN: '#0fa0fa'
  });

}