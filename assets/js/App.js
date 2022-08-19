class App{
    constructor(){
        this.headerWrapper = document.querySelector("header")
        this.header = new HeaderController(this.headerWrapper, this.router);

    }   

    async main(){
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
let app = new App();
app.main();