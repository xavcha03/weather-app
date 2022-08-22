class WeekWeatherTemplate{
    constructor(wrapper){
        this.wrapper = wrapper
    }

    createTemplate(weekModel){
        
            return `
                <div class="day">
                    <span class="day__name">${weekModel.weekDay}</span>
                    <span class="day__name">${weekModel.hours}:${weekModel.minutes}</span>
                    <img class="day__img"  src="http://openweathermap.org/img/wn/${weekModel.iconName}@2x.png" alt="">
                    <span class="temp">${weekModel.temp}°c</span>
                </div>
            `
        }
    }

