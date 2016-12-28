
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

  landLayer = d3.carto.layer.featureArray();

  landLayer
  .features(topojson.feature(data.land, data.land.objects.world).features)
  .label("Land")
  .renderMode("svg")
  .clickableFeatures(false)
  .cssClass("land");

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

  map
  .addCartoLayer(landLayer)
  .addCartoLayer(cityLayer)
  .setScale(1);

}