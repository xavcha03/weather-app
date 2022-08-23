export class WeatherApi{
    constructor() {
        this.baseUrl = "https://api.openweathermap.org/data/2.5/";
        this.urlOptions = "&lang=fr&units=metric&appid=dba81f2ac1d88360af75ac8419400cdd";
    }

    async getWeatherData(city){
        let datas = await (await fetch(this.baseUrl + "weather?q=" + city + this.urlOptions)).json();
        return datas;
    }

    async getWeatherWeekData(city){
        let datas = await (await fetch(this.baseUrl + "forecast?q=" + city + this.urlOptions)).json();
        return datas;
    }

    async getUnsplashImg(city){
        
    }
}
