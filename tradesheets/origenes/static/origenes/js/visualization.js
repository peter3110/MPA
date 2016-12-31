
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

  // Arcos
  pathsLayer = d3.carto.layer.geojson();
  pathsLayer
    .path("../static/origenes/data/paths.geojson")
    .label("Fletes")
    .renderMode("svg")
    .cssClass("fletes");

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

  // Origins
  originLayer = d3.carto.layer.csv();
  originLayer
    .path("../static/origenes/data/origins.csv")
    .label("Origins")
    .cssClass("origins")
    .renderMode("svg")
    .markerSize(1)
    .x("xcoord")
    .y("ycoord")
    .clickableFeatures(true)
    .on("load", showOriginInfo);

  // Map creation
  map
    .addCartoLayer(terrainLayer)
    .addCartoLayer(countryLayer)
    .addCartoLayer(capitalLayer)
    .addCartoLayer(originLayer)
    .addCartoLayer(pathsLayer)
    .setScale(1);

  // Informacion de origenes
  function showOriginInfo() {
    d3.csv("../static/origenes/data/origins.csv", loadData);

    function loadData(data) {
      origenes = data;
      ciudades2 = d3.carto.layer.xyArray();

      ciudades2
        .features(origenes)
        .label("hola")
        .cssClass("origins")
        .renderMode("svg")
        .markerSize(10)
        .x("xcoord")
        .y("ycoord");

      map.addCartoLayer(ciudades2);
    }
  }
  
  // Informacion de ciudades
  function showCityInfo() {
    d3.csv("../static/origenes/data/worldcapitals.csv", loadData);

    function loadData(data) {
      origenes = data.filter(function(d) {return d.population > 3000000});
      
      ciudades = d3.carto.layer.xyArray();
      
      ciudades
        .features(origenes)
        .label("High Population Capitals")
        .cssClass("capital")
        .renderMode("svg")
        .markerSize(10)
        .x("x")
        .y("y")
        .clickableFeatures(true);
      
      map.addCartoLayer(ciudades);
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