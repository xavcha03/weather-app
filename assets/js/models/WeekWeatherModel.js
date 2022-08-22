class WeekWeatherModel{
    constructor(datas){
        this._date = new Date(datas.dt_txt);
        this._temp = datas.main.temp;
        this._weatherDescription = datas.weather[0].description;
        this._iconName = datas.weather[0].icon;
        this.listDayFr = [
            "Di",
            "Lu",
            "Ma",
            "Me",
            "Je",
            "Ve",
            "Sa"
        ]
    }

    get dayNumber(){
        return this._date.getDate();
    }
    get weekDay(){
        return this.listDayFr[this._date.getDay()];
    }
    get hours(){
        return this._date.getHours();
    }
    get minutes(){
        return this._date.getMinutes()<10?'0'+this._date.getMinutes():this._date.getMinutes();
    }
    get temp(){
        return this._temp;
    }
    get weatherDescription(){
        return this._weatherDescription;
    }
    get iconName(){
        return this._iconName;
    }

}