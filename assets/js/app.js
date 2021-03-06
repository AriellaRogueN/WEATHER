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
        agregamos variables para obtener datos*/
        $.ajax({
            url: "https://api.darksky.net/forecast/1578303b8a10e722c3a97c9a2c96796a/" + latitud + "," + longitud,
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                const temperature = data.daily.data[0].temperatureMax
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
                const weekSummary = data.daily.summary
                console.log(weekSummary)
             /*Al hacer click en el boton de busqueda se agrega una estructura HTML
             con las variables correspondientes, para mostrar los datos*/
                $("#btn-search").click(function () {
                    $(".bewitched").append("<div class='row'>" +
                        "<div class='col-md-offset-3 col-md-6 col-sm-12 col-xs-12 day'>" +
                        "<div class='section-content text-center'>" +
                        "<h1 class='section-header title'>" + city + "</h1>" +
                        "<h2>" + ((temperature - 32) / 1.8).toFixed() + "&nbsp" + "°C</h2>" +
                        "<h3>" + summary + "</h3>" + "</div>" +
                        "<ul class='pull-left'>" +
                        "<li>Humidity:" + "&nbsp" + humidity + "</li>" +
                        "<li>Uv index:" + "&nbsp" + uv + "</li>" +
                        "<li>Wind:" + "&nbsp" + wind + "&nbsp" + "m/s</li>" +
                        "<li>Pressure:" + "&nbsp" + pressure + "&nbsp" + "Hpa</li>" + "<hr>" +
                        "<button type='button' id='btn-weekly' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal'>Weekly Report</button>" +
                        "</ul></div></div>")

                    $("#btn-weekly").click(function () {
                        console.log("boton pulsado");
                        for (i = 1; i < data.daily.data.length; i++) {
                            const minTemp = data.daily.data[i].temperatureMin;
                            const maxTemp = data.daily.data[i].temperatureHigh;
                            const time = data.daily.data[i].time;
                            /*La data time corresponde a fecha-hora en formato unix,
                            para poder mostrarla de manera legible,debe ser transformada 
                            en formato normal,  para lo cual realizamos una fórmula*/
                            const convert = new Date(time * 1000);
                            /*Luego aplicamos un metodo para acortar los valores, 
                            quedando nombre de dia de la semana,dia numerico y mes */
                            const details =  {
                                month: "short",
                                weekday: 'short',
                                day: 'numeric' 
                            };
                            const newTime = new Date(convert);
                            console.log(newTime)
                            $("#mdl").append("<div id='myModal' class='modal fade' role='dialog' tabindex='-1'>" +
                                "<div class='modal-dialog'>" +
                                "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                "<button type='button' class='close' data-dismiss='modal'>&times;</button>" +
                                "<h4 class='modal-title'>" + city + "</h4>" + "</div>" +
                                "<div class='modal-body'>" +
                                "<h5>" + weekSummary  + "</h5>" +
                                "<p>" + newTime.toLocaleDateString('en-US', details) + "&nbsp" + "<span>-" + "&nbsp" + ((maxTemp - 32) / 1.8).toFixed() + "°C /" + ((minTemp - 32) / 1.8).toFixed() + "°C</span>" + "</p>" + 
                                 "</div>" +
                                "</div></div></div>");
                        };    
                          

                    });//click
                });//append-1
                
                 
            }//succes
        });//ajax

    });//searchbox

});
                
