
function direction(degrees){
    if (degrees >= 0 && degrees < 22.5) return "N"
    if (degrees >= 22.5 && degrees < 67.5) return "NE"
    if (degrees >= 67.5 && degrees < 112.5) return "E"
    if (degrees >= 112.5 && degrees < 157.5) return "SE"
    if (degrees >= 157.5 && degrees < 202.5) return "S"
    if (degrees >= 202.5 && degrees < 247.5) return "SW"
    if (degrees >= 247.5 && degrees < 292.5) return "W"
    if (degrees >= 292.5 && degrees < 337.5) return "NW"
    if (degrees >= 337.5 && degrees < 360) return "N"
    else return ""
}

function icon(cloudcover, rain) {
    if (cloudcover < 40) return "sun.jpg"
    if (cloudcover < 80) return "cloudsun.jpg"
    return "cloud.jpg"
}

function setWeather(data) {
    console.log(data)
    let time = new Date().getHours()
    console.log(time)
    let temperature = document.getElementById("temperature");
    temperature.innerHTML = data.hourly.temperature_2m[time];
    let wind_speed = document.getElementById("wind_speed");
    wind_speed.innerHTML = data.hourly.windspeed_10m[time];
    let apparent_temperature = document.getElementById("apparent_temperature");
    apparent_temperature.innerHTML = data.hourly.apparent_temperature[time];
    let wind_direction = document.getElementById("wind_direction");
    wind_direction.innerHTML = direction(data.hourly.winddirection_10m[time])
    let cloudcover = document.getElementById("cloudcover");
    cloudcover.innerHTML = data.hourly.cloudcover[time];
    let cloudimage = document.getElementById("cloudimage");
    cloudimage.innerHTML = `<img width="100px" src="images/${icon(data.hourly.cloudcover[time], data.hourly.precipitation[time])}">`
}

function getWeather() {
    let latitude="38.67"
    let longitude="-9.32"
    let fields="precipitation,cloudcover,winddirection_10m,apparent_temperature,temperature_2m,relativehumidity_2m,windspeed_10m"
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=${fields}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {setWeather(data); setHourly(data);});
}

function setHourly(data) {
    let time = new Date().getHours()
    console.log(time)
    let hourly = document.getElementById("hourlines");
    data.hourly.time.slice(time,time+24).forEach(function(time,idx) {
        let li = document.createElement("li");
        li.classList = "houritem"
        li.innerHTML = `<div>${time.substring(11)}</div><div><img width="50px" src="images/${icon(data.hourly.cloudcover[idx], data.hourly.precipitation[idx])}"></div><div>${data.hourly.temperature_2m[idx]}ºC</div><div>${data.hourly.precipitation[idx]} mm</div>`;
        hourly.appendChild(li);
    });
}