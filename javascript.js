// Variables
var cityView = $('.cities-view');
var currentTime = moment().format('l');
var fiveDay = $('.five-day');
var cities = [];

// Get Local Storage information
var getCity = JSON.parse(localStorage.getItem('city'));
if (getCity !== null){
    getCity.forEach(function(item){
        cities.push(item)
        })
    for(i=0; i<cities.length; i++){
        cityView.append(`<li class = 'list-group-item' id = city>${cities[i].charAt(0).toUpperCase()+cities[i].slice(1)}</li)`)
    }
}

$('#search').on('submit', function(e) {
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
        $('.city-name').text(`${cityName} ${currentTime}`)
        $('.cityTemp').text(`Temperature (F): ${Math.floor((cityTemp))}`)
        $('.cityHum').text(`Humidity: ${cityHum}%`)
        $('.cityWind').text(`Wind Speed: ${cityWind} MPH`)
        $('.city-weather').css("border", "1px solid black")
        $('.five-day').css("background-color", "skyblue")
        $('.five-day').css("color", "white")
      
        
        // Ajax response to get UV index & 5 day forecast
        var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&appid=cb24f0395a525f6bd303942171279ad4"
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var uvIndex = response.current.uvi
            // $('.cityUV').text(`UV Index: ${uvIndex}`)
            // if(uvIndex  <= 2)
            // $('.cityUV').css("color", "green")
            //  else if (uvIndex >=3 && uvIndex <=5)
            //  $('.cityUV').css("color", "salmon")
            //  else if (uvIndex >= 5 && uvIndex <=7)
            //     $('.cityUV').css("color", "blue")
            //  else (uvIndex >= 8)
            //     $('.cityUV').css("color", "red")
            
            // Creates 5 day forecast
            for (i=1;i<6;i++){
            $('.fc-date' + i).text(moment().add(i, 'days').format('l'))
            $('.fc-weather' + i).text(response.daily[i].weather[0].description)
            $('.day-forecast-temp'+ i).text(`Temp (F): ${Math.floor(response.daily[i].temp.day -273.15)*1.80+32}`)
            $('.day-forecast-hum'+ i).text(`Humidity: ${response.daily[i].humidity}%`)
            }
        
        })
       $('#search').children('input').val('');
    });

    

    // Set Local Storage information
    cities.push(city)
    localStorage.setItem('city', JSON.stringify(cities))

})

$(document).on("click", ".list-group-item", function(){
    var city = $(this).text();
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

        $('.city-name').text(`${cityName} ${currentTime}`)
        $('.cityTemp').text(`Temperature (F): ${Math.floor((cityTemp))}`)
        $('.cityHum').text(`Humidity: ${cityHum}%`)
        $('.cityWind').text(`Wind Speed: ${cityWind} MPH`)
        $('.city-weather').css("border", "1px solid black")
        $('.five-day').css("background-color", "skyblue")
        $('.five-day').css("color", "white")
      
        
        // Ajax response to get UV index & 5 day forecast
        var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&appid=cb24f0395a525f6bd303942171279ad4"
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var uvIndex = response.current.uvi
            $('.cityUV').text(`UV Index: ${uvIndex}`)
            // if(uvIndex  <= 2)
            // $('.cityUV').css("color", "green")
            //  else if (uvIndex >=3 && uvIndex <=5)
            //  $('.cityUV').css("color", "salmon")
            //  else if (uvIndex >= 5 && uvIndex <=7)
            //     $('.cityUV').css("color", "blue")
            //  else (uvIndex >= 8)
            //     $('.cityUV').css("color", "red")
            
            // Creates 5 day forecast
            for (i=1;i<6;i++){
            $('.fc-date' + i).text(moment().add(i, 'days').format('l'))
            $('.fc-weather' + i).text(response.daily[i].weather[0].description)
            $('.day-forecast-temp'+ i).text(`Temp (F): ${Math.floor(response.daily[i].temp.day -273.15)*1.80+32}`)
            $('.day-forecast-hum'+ i).text(`Humidity: ${response.daily[i].humidity}%`)
            }
        
        })
       
    });
})