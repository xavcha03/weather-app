class App{
    constructor(){
        this.headerWrapper = document.querySelector("header")
        this.header = new HeaderController(this.headerWrapper, this.router, this.changeCity.bind());
        this.weatherController = new weatherContoller();
        

    }   

    async main(){
        
    }
    //Change les données de la ville à afficher
    changeCity(city){
        console.log(city);
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