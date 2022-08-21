class App{
    constructor(){
        this.headerWrapper = document.querySelector("header")
        this.header = new HeaderController(this.headerWrapper, this.router, this.changeCity.bind(this));
        this.weatherController = new WeatherContoller();
        this.weatherApi = new WeatherApi();
        this.cityWeatherWrapper = document.querySelector(".city-weather");
        this.weekWeatherWrapper = document.querySelector(".days-list");
        this.weekWeatherTemplate = new WeekWeatherTemplate(this.weekWeatherWrapper)
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
        let weekWeatherData = await this.weatherApi.getWeatherWeekData(city)
        console.log(weekWeatherData);
        this.weekModelList = weekWeatherData.list.map(elt => {
            return new WeekWeatherModel(elt);
           
        });
        //creation du template de la liste des jours
        let container = document.createElement('div');
        
        this.weekWeatherWrapper.innerHTML = this.weekModelList.map(dayWeather=>{
            return this.weekWeatherTemplate.createTemplate(dayWeather)
        }).join("");


        //creattion du chartJS
        
        this.weatherController.initChart(this.weekModelList);





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