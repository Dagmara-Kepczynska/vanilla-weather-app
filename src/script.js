let now = new Date(); 
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
let month = months[now.getMonth()]; 
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear(); 
let hour = now.getHours(); 
let minute = now.getMinutes();

 function transformMinute (minute) {
if (minute.toString().length < 2) {
  return `0${minute}`
} else {
  return minute
}
 }

let minutes = transformMinute(minute);
let liveDate = document.querySelector("h2.date");
liveDate.innerHTML = `${day}, ${date} ${month} ${year}`;

let liveTime = document.querySelector("span.time"); 
liveTime.innerHTML = `${hour}:${minutes}`;

function transformWindDirection(windDegrees) {
  let direction = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N" ]; 
  let windDirection = direction[Math.trunc(windDegrees/22.5 + 0.5)];
  return windDirection;
  }

function getTime(unixTimeStamp) {

  let d = new Date(unixTimeStamp);
  let h = (d.getHours().toString().length == 1) ? ('0' + d.getHours()) : d.getHours();
  let m = (d.getMinutes().toString().length == 1) ? ('0' + d.getMinutes()) : d.getMinutes();

  let time = h + ':' + m ;

    return time;
}

function showWeather(response){
 let city = document.querySelector("#city"); 
 city.innerHTML = response.data.name;
 let country = document.querySelector("#country");
 country.innerHTML = response.data.sys.country;
 let temperature = document.querySelector("#degrees-now");
 temperature.innerHTML = Math.round(response.data.main.temp);
 let description = document.querySelector("#description-now");
 description.innerHTML = response.data.weather[0].description;
 let feelsLikeC = document.querySelector("#feels-likeC");
 feelsLikeC.innerHTML = Math.round(response.data.main.feels_like);
 let feelsLikeF = document.querySelector("#feels-likeF");
 tempC = Math.round(response.data.main.feels_like);
 feelsLikeF.innerHTML = Math.round((tempC * 9/5) + 32);
 let windSpeed = document.querySelector("#wind-speed");
 windSpeed.innerHTML = Math.round(response.data.wind.speed);
 let timeZone = (response.data.timezone - 3600);
 let sunrise = document.querySelector("#sunrise");
 let sunriseStamp = response.data.sys.sunrise * 1000 + (timeZone * 1000);
 sunrise.innerHTML = getTime(sunriseStamp);
 let pressure = document.querySelector("#pressure");
 pressure.innerHTML = response.data.main.pressure;
 let rain = document.querySelector("#rain");
 rain.innerHTML = response.data.main.humidity;
 let sunset = document.querySelector("#sunset")
 let sunsetStamp = response.data.sys.sunset * 1000 + (timeZone * 1000);
 sunset.innerHTML = getTime(sunsetStamp);
 let localTime = document.querySelector(".time")
 timeStamp = response.data.dt * 1000; 
 localTime.innerHTML = getTime(timeStamp);
 let windDirection = document.querySelector("#wind-direction");
 windDirection.innerHTML = transformWindDirection(response.data.wind.deg);
 console.log(response);
}

function getCityWeather(event) {
  event.preventDefault();
  let searchedCity = document.querySelector(".city-input");
  let city = searchedCity.value;
  let apiKey = `c74772c1a52f7f9f082fe3de119d5275`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function getLocalWeather(event){
   
    
    function localWeather(coords) {
      let latitude = coords[0];
      let longitude = coords[1];
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
      let apiKey = `c74772c1a52f7f9f082fe3de119d5275`;
      axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
    }

    function getLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let coords = [latitude, longitude];
    localWeather(coords); 
    }
    navigator.geolocation.getCurrentPosition(getLocation);
  }


let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocalWeather);

let citySearch = document.querySelector("#search-bar");
citySearch.addEventListener("submit", getCityWeather);

getLocalWeather();