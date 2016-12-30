
function makeSomeMaps() {
  map = d3.carto.map();

  d3.select("#map").call(map);

  // Terrain
  terrainLayer = d3.carto.layer.tile();
  
  terrainLayer
    .path("elijahmeeks.map-azn21pbi")
    .label("Terrain");

  // Countries
  countryLayer = d3.carto.layer.topojson();
  
  countryLayer.path("../static/origenes/data/countries.topojson")
  .label("Countries")
  .renderMode("canvas")
  .specificFeature("world")
  .cssClass("country-gray")
  .on("load", showCountryInfo)
  .visibility(false);
  
  // Cities
  capitalLayer = d3.carto.layer.csv();
  capitalLayer
  .path("../static/origenes/data/worldcapitals.csv")
  .label("Capitals")
  .cssClass("capital")
  .renderMode("svg")
  .markerSize(3)
  .x("x")
  .y("y")
  .clickableFeatures(true)
  .on("load", showCityInfo);

  // Arcos
  pathsLayer = d3.carto.layer.geojson();
  pathsLayer
    .path("../static/origenes/data/paths.geojson")
    .label("Fletes")
    .renderMode("svg")
    .cssClass("fletes");

  // Map creation
  map
    .addCartoLayer(terrainLayer)
    .addCartoLayer(countryLayer)
    .addCartoLayer(capitalLayer)
    .addCartoLayer(pathsLayer)
    .setScale(1);
  
  // Informacion de ciudades
  function showCityInfo() {
    d3.csv("../static/origenes/data/worldcapitals.csv", loadData);

    function loadData(data) {
      origenes = data.filter(function(d) {return d.population > 3000000});
      
      ciudadesDeOrigen = d3.carto.layer.xyArray();
      
      ciudadesDeOrigen
      .features(origenes)
      .label("High Population Capitals")
      .cssClass("capital")
      .renderMode("svg")
      .markerSize(10)
      .x("x")
      .y("y")
      .clickableFeatures(true);
      
      map.addCartoLayer(ciudadesDeOrigen);
    }
  }
  
  // Informacion de paises
  function showCountryInfo() {
    infoCountries = countryLayer.features().filter(function(d) {return d.properties.gdp > 1000});
    
    infoLayer = d3.carto.layer.featureArray();
    
    infoLayer
    .features(infoCountries)
    .label("High GDP")
    .renderMode("svg")
    .cssClass("country-red")
    .clickableFeatures(true);
  
  map.addCartoLayer(infoLayer)
  }
}