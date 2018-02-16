$(document).ready(function () {
   /*Con la api de google maps, utilizamos una caja de busqueda de lugares.
   obtenemos los datos a partir del input*/
   var searchBox = new google.maps.places.SearchBox(document.querySelector("#city-search"));
  
   //Utilizamos el método get places para generar el autocompletado.
   //generamos variables para latitud y longitud.
   searchBox.addListener('places_changed', function () {
       var locale = searchBox.getPlaces()[0];
        console.log(locale)
        var city = locale.formatted_address
        console.log(city)
        var latitud = locale.geometry.location.lat();
       var longitud = locale.geometry.location.lng();
       /*Realizamos llamado a api dark sky, se incluye Jsonp, para quitar seguridad,
       agregamos variables latitud y longitud*/
       $.ajax({
           url: "https://api.darksky.net/forecast/1578303b8a10e722c3a97c9a2c96796a/" + latitud + "," + longitud,
           dataType: "jsonp",
           success: function (data) {
              console.log(data);
              const temperature= data.daily.data[0].temperatureMax
              console.log(temperature)
              const summary = data.daily.data[0].summary
              console.log(summary)
              const humidity = data.daily.data[0].humidity
              console.log(humidity)
              const uv = data.daily.data[0].uvIndex
              console.log(uv)
              const wind = data.daily.data[0].windSpeed
              console.log(wind)
              const pressure = data.daily.data[0].pressure
              console.log(pressure)

              $("#btn-search").click(function () {
                  $(".bewitched").append("<div class='row'>" +
                      "<div class='col-md-offset-3 col-md-6 day'>" +
                      "<div class='section-content text-center'>" +
                      "<h1 class='section-header title'>" + city + "</h1>" +
                      "<h2>" + summary + "</h2>" + "</div>" +
                      "<ul class='pull-left'>" +
                      "<li>Humidity:" + humidity + "</li>" +
                      "<li>Uv index:" + uv + "</li>" +
                      "<li>Wind:" + wind + "</li>" +
                      "<li>Pressure:" + pressure + "</li>" +
                      "</ul></div></div>)")
              });
            }
       });

   });

   
 
});

    /*var weather = function (data) {
        var temperature = "";
        data.forEach(function (element) {
            temperature = element.data.temperature
            console.log(temperature)
                (
        }) */

    

//var city = $("#city-search").value();








