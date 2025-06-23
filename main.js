const apiKey = "77debe9988f1949d3764fb8eeac2bb52";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){
    const response = await fetch(apiUrl + city +  `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display= "block";
        document.querySelector(".weather").style.display= "none";
    }else{
        var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "Assets/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "Assets/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "Assets/rain.png";
    }
    else if(data.weather[0].main == "Dizzle"){
        weatherIcon.src = "Assets/dizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "Assets/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    }   
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
searchBox.addEventListener("keypress" , function (e) {
    if(e.key == "Enter"){
        checkWeather(searchBox.value);
    }
})


const topCities = [
  { name: "New york", id: "card-newyork" },
  { name: "America", id: "card-america" },
  { name: "Tokyo", id: "card-tokyo" }
];

async function updateSidebarCity(cityName, cardId) {
  const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
  const data = await response.json();

  const card = document.getElementById(cardId);
  const icon = card.querySelector(".S_weather-icon");
  const temp = card.querySelector(".S_temp");

  // Update content
  temp.innerHTML = Math.round(data.main.temp) + "°C";

  
    if(data.weather[0].main == "Clouds"){
        icon.src = "Assets/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        icon.src = "Assets/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        icon.src = "Assets/rain.png";
    }
    else if(data.weather[0].main == "Dizzle"){
        icon.src = "Assets/dizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        icon.src = "Assets/mist.png";
    }
}

topCities.forEach(S_city => {
  updateSidebarCity(S_city.name, S_city.id);
});

const now = new Date();
document.querySelector(".date h3").innerText = now.toLocaleDateString();
document.querySelector(".time h3").innerText = now.toLocaleTimeString();
