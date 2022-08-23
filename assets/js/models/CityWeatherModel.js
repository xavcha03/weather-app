export class CityWeatherModel{
    constructor(datas){
        this._feels_like = datas.main.feels_like;
        this._humidity = datas.main.humidity;
        this._currentTemp = datas.main.temp;
        this._temp_max = datas.main.temp_max;
        this._temp_min = datas.main.temp_min;
        this._cityName = datas.name;
        this._windDeg = datas.wind.deg;
        this._windSpeed = datas.wind.speed;
        this._skyIcon = datas.weather[0].icon;
        

    }


    get skyIcon(){
        return this._skyIcon;
    }
    get windDeg(){
        return this._windDeg;
    }
    get windSpeed(){
        return this._windSpeed;
    }
    get feels_like(){
        return this._feels_like;
    }

    get humidity(){
        return this._humidity;
    }
    get currentTemp(){
        return this._currentTemp;
    }
    get temp_max(){
        return this._temp_max;
    }
    get temp_min(){
        return this._temp_min;
    }
    get cityName(){
        return this._cityName;
    }
}