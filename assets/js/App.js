class App{
    constructor(){
        this.headerWrapper = document.querySelector("header")
        this.header = new HeaderController(this.headerWrapper, this.router, this.changeCity.bind(this));
        this.weatherController = new WeatherContoller();
        this.weatherApi = new WeatherApi();
        this.cityWeatherWrapper = document.querySelector(".city-weather");
        

    }   

    async main(){

        
        
    }
    //Change les données de la ville à afficher
    async changeCity(city){
        //données du jour
        let CityWeatherDatas = await this.weatherApi.getWeatherData(city);
        let cityWeatherModel = new CityWeatherModel(CityWeatherDatas);
        let currentWeatherTemplate = this.weatherController.createTemplate(cityWeatherModel);
        this.cityWeatherWrapper.innerHTML = currentWeatherTemplate;
        //données sur 5 jours
        let week = await this.weatherApi.getWeatherWeekData(city)
        console.log(week.list[0]);
        this.weekModel = week.list.map(elt => {
            let date = new Date(elt.dt_txt);
            return {
                "dayNumber" : date.getDate(),
                "weekDay": date.getDay(),       //0= dimanche 6 = samedi
                "hours" : date.getHours(),
                "temp" : elt.temp,
                "weather": elt.weather

                //////
                /////
                ///// Utiliser la biblio de graph pour afficher toutes les 3heures la température et afficher le logo de la météo sur chaque 3h
                /////
                /////
                
            }
        });
        console.log(this.weekModel);


    }

    router = (route)=>{
        switch(route){
            case "/home":
                this.switchScreen('home');
                break;
            case "/cities":
                this.switchScreen('cities');
                break;
            default:
                this.switchScreen('home');
                break;
        }
    }

    switchScreen(screen){
        console.log("Go to page : " + screen);
        //fermer le menu
        this.header.closeMenu();
    }
}
let recentCities = ["Charleroi", "Bruxelles", "Madrir"]
localStorage.setItem('recentCities', JSON.stringify(recentCities));

let app = new App();
app.main();