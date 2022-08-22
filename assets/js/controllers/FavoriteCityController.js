class FavoriteCityController{
    constructor(){
        
    }

    addEventOnFavBtn(cityWeatherWrapper){
        this.favBtn = cityWeatherWrapper.querySelector(".fav-btn");
        this.favBtn.addEventListener('click', e=>{
            console.log(e);
        })

        
        //Tester si la ville est déjà en favoris
        //Ajouter la ville en favoris
        //Activer le btn
    }


    
}