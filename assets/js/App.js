import {CitySearchFormController} from './controllers/CitySearchFormController.js';
import {WeekWeatherTemplate} from './vues/weekWeatherTemplate.js';
import {WeatherContoller} from './controllers/weatherController.js';
import {WeatherApi} from './controllers/ApiController.js';
import {CityWeatherModel} from './models/CityWeatherModel.js'
import {WeekWeatherModel} from './models/WeekWeatherModel.js'


/**Main class of Weather APP */
class App{
    constructor(){
        this.initCityForm();
        this.initApiController();
        this.initCurrentDayWeather();
        this.initWeekWeather();
    }   
    /**
     * Pincipal mehtod of App
     */
    async main(){
 
    }

    /**
     * init the week weather
     */
    initWeekWeather() {
        this.weekWeatherWrapper = document.querySelector(".days-list");
        this.weekWeatherTemplate = new WeekWeatherTemplate(this.weekWeatherWrapper);
    }

    /**
     * Init the current day weather
     */
    initCurrentDayWeather() {
        this.WeatherController = new WeatherContoller();
        this.cityWeatherWrapper = document.querySelector(".city-weather");
    }

    /**
     * Init the Api Controller
     */
    initApiController() {
        this.WeatherApiController = new WeatherApi();
    }
    /**
     * Init the city form
     */
    initCityForm() {
        this.headerWrapper = document.querySelector("header");
        this.CitySearchFormController = new CitySearchFormController(this.headerWrapper, this.router.bind(this), this.changeCity.bind(this));
    }

    

    /**
     * change the city and update the view
     * @param {string} city 
     */
    async changeCity(city){
        //données du jour
        await this.updateCurrentDayWeather(city);
        
        //données sur 5 jours
        await this.updateWeekWeather(city);
        
        //creation du chartJS
        this.WeatherController.initChart(this.weekModelList);
    }
    
    /**
     * 
     * @param {string} route 
     */
    router(route){
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

    /**
     * Change the screen to render
     * @param {string} screen 
     */
     switchScreen(screen){
        console.log("Go to page : " + screen);
        //fermer le menu
        this.CitySearchFormController.closeMenu();
    }

    /**
     * Update the week weather (data & view)
     * @param {string} city 
     */
    async updateWeekWeather(city) {
        this.weekModelList = await this.getWeekModelList(city);
        //creation du template de la liste des jours
        this.weekWeatherWrapper.innerHTML = this.weekModelList.map(dayWeather => {
            if (dayWeather.hours == 12) {
                return this.weekWeatherTemplate.createTemplate(dayWeather);
            }
        }).join("");
    }
    /**
     * return a list of WeekWeatherModel
     * 
     * @param {sring} city 
     * @returns 
     */
    async getWeekModelList(city) {
        let weekWeatherData = await this.WeatherApiController.getWeatherWeekData(city);
        return weekWeatherData.list.map(elt => {
            return new WeekWeatherModel(elt);
        });
    }

    /**
     * Update the current day weather (data & view)
     * @param {string} city 
     */
    async updateCurrentDayWeather(city) {
        let CityWeatherDatas = await this.WeatherApiController.getWeatherData(city);
        let cityWeatherModel = new CityWeatherModel(CityWeatherDatas);
        let currentWeatherTemplate = this.WeatherController.createTemplate(cityWeatherModel);
        this.cityWeatherWrapper.innerHTML = currentWeatherTemplate;
    }
    
}


let app = new App();
app.main();