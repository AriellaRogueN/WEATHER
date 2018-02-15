

const request = new Request('https://api.darksky.net/forecast/1578303b8a10e722c3a97c9a2c96796a/37.8267,-122.4233');


fetch(request, { mode: 'no-cors' })
    .then(function (response) {
        console.log(response);
    })
    .then(function (data) {
            console.log(data);

    })
    .catch(function (error) {
        console.log('Request failed', error)
    });


    