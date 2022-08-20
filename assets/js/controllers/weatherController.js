class WeatherContoller{
    constructor(){
    }


    createTemplate(cityWeatherModel)
    {
        //variable css du taux d'humidité
        var r = document.querySelector(':root');
        r.style.setProperty('--humidity', cityWeatherModel.humidity+"%");
        r.style.setProperty('--windDeg', cityWeatherModel.windDeg+"deg");
        return`
        <div class="city-weather__header">
                <h1>${cityWeatherModel.cityName}</h1>
                <button class="fav-btn"></button>
            </div>
            <section class="maindatas">
                <img class="big-logo-weather" src="http://openweathermap.org/img/wn/${cityWeatherModel.skyIcon}@4x.png" alt="">
                <span class="degrees">${cityWeatherModel.currentTemp}</span>
                <div class="temp-min-max">
                    <span>min : ${cityWeatherModel.temp_min}</span>
                    <span>max : ${cityWeatherModel.temp_max}</span>
                </div>
                <span>Ressenti : ${cityWeatherModel.feels_like}</span>
                <h2>Humidité</h2>
                <span>${cityWeatherModel.humidity} %</span>
                <div class="cursor"></div> <!-- use before/after to move the cursor-->
            </section>
            <section class="wind">
                <div class="wind__orientation">
                    <img src="./assets/img/arrow.svg" alt="">
                </div>
                <span class="wind__speed">${cityWeatherModel.windSpeed}km/h</span>
            </section>
        `
    }
}