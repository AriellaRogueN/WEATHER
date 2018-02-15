/*Con la api de google maps, utilizamos una caja de busqueda de lugares.
obtenemos los datos a partir del input*/
var searchBox = new google.maps.places.SearchBox(document.querySelector("#city-search"));
//Utilizamos el método get places para generar el autocompletado.
//generamos variables para latitud y longitud.
searchBox.addListener('places_changed', function () {
    var locale = searchBox.getPlaces()[0];
    var latitud = locale.geometry.location.lat();
    var longitud = locale.geometry.location.lng();
/*Realizamos llamado a api dark sky, se incluye Jsonp, para quitar seguridad,
agregamos variables latitud y longitud*/
   $.ajax({
        url: "https://api.darksky.net/forecast/1578303b8a10e722c3a97c9a2c96796a/" + latitud + "," + longitud,
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
        }
    });

});








