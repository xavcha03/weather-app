import {CssColor} from '../models/CssColor.js';
export class WeatherContoller{
    constructor(){
    }

    initChart(datas){
        
        const labels = datas.map(data=>data.weekDay + ' ' + data.hours + ':'+data.minutes)
        let cssColor = new CssColor();
        
          const data = {
            labels: labels,
            datasets: [{
              label: 'Température des 5 prochains jours',
              backgroundColor: 'rgb(153, 217, 140)',
              borderColor: 'rgb(2, 18, 30)',
              data: datas.map(data=>data.temp),
            }]
          };
        
          const config = {
            type: 'line',
            data: data,
            options: {
                tension:0.4,
                plugins : {
                    legend : {
                        labels : {
                            color: cssColor.black
                        }
                    },
                    
                },
                scales : {
                    x:{
                        grid:{
                            borderColor: cssColor.black
                        },
                        ticks: {
                            color:  cssColor.primary,
                        }
                    },
                    y:{
                        grid:{
                            borderColor: cssColor.black
                        },
                        ticks: {
                            color:  cssColor.primary,
                        }
                    }
                }
            }
          };

          const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
    }


    createTemplate(cityWeatherModel)
    {
        //variable css du taux d'humidité
        var r = document.querySelector(':root');
        r.style.setProperty('--humidity', cityWeatherModel.humidity+"%");
        r.style.setProperty('--windDeg', cityWeatherModel.windDeg+"deg");
        let template = `
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
        

        return template;
    }
}