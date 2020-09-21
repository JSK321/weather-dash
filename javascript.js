var cityView = $('.cities-view');
// var currentTime = moment().format('l')

$('#search').on('submit', function (e) {
    e.preventDefault();
    var city = $('#city-search').val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cb24f0395a525f6bd303942171279ad4"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var cityName = response.name
        var cityTemp = (response.main.temp - 273.15) * 1.80 + 32
        var cityHum = response.main.humidity
        var cityWind = response.wind.speed
        var lat = response.coord.lat
        var lon = response.coord.lon

        cityView.append(`<li class = 'list-group-item' id = city>${cityName}</li)`)
        $('.city-name').text(`${cityName}`)
        $('.cityTemp').text(`Temperature (F): ${Math.floor((cityTemp))}`)
        $('.cityHum').text(`Humidity: ${cityHum}%`)
        $('.cityWind').text(`Wind Speed: ${cityWind} MPH`)

        var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&appid=cb24f0395a525f6bd303942171279ad4"
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var uvIndex = response.current.uvi
            $('.cityUV').text(`UV Index: ${uvIndex}`)
        })

      
    });


})


