class HeaderController{
    constructor(headerWrapper, routerFunc, changeCityFunc){
        this.CitiesApiUrl = "https://api.teleport.org/api/cities/?search=";

        this.headerWrapper = headerWrapper;
        this.navDOM = this.headerWrapper.querySelector(".header__nav ul");
        this.routerFunc = routerFunc;
        this.input = this.headerWrapper.querySelector("input");
        this.recentCitiesDOM = this.headerWrapper.querySelector(".cities");
        this.submitBtn = this.headerWrapper.querySelector(".header__form button");
        this.changeCityFunc = changeCityFunc;

        //Ajout d'un event sur le btn submit du form
        this.addEventSubmitBtn()
        //Ajout d'un event sur le btn menu
        this.addEventOnBtnMenu()

        //Ajout d'event sur les liens du menu
        this.addEventOnLinks()

        //Ajout d'event sur l'input
        this.addEventOnInput();
    }

    addEventSubmitBtn(){
        this.submitBtn.addEventListener("click", e=>{
            e.preventDefault();
            let city = this.input.value;
            this.changeCityFunc(city);
            this.input.value = "";
            this.addCityInLocalStorage(city);
            this.closeCityList();
        })
    }

    addCityInLocalStorage(city){
        let recentCities = JSON.parse(localStorage.getItem("recentCities"));
        if(recentCities && !recentCities.includes(city)){
            recentCities.push(city);
        }else{
            recentCities = [city];
        }

        localStorage.setItem("recentCities",JSON.stringify(recentCities));
    }

    async getCitiesFromApi(str){
        let fullUrl = this.CitiesApiUrl+str;
        return await (await fetch(fullUrl)).json()
    }

     addEventOnInput(){

        //Event quand on tape du texte
        this.input.addEventListener("keyup",async  e=>{
            this.recentCitiesDOM.classList.remove('open');
            let currentInput = this.input.value;
            let response = await this.getCitiesFromApi(currentInput);
            let cities = response["_embedded"]["city:search-results"];
            console.clear();
            this.recentCitiesDOM.innerHTML = '';
            cities.forEach(city=>{
                
                
                let cityName = city.matching_full_name.split(',')[0]
                let country = city.matching_full_name.split(',')[2]

                //Inserer les villes dans le pannel
                let liElt = document.createElement("li");
                let linkElt = document.createElement("a");
                linkElt.setAttribute('href', cityName);
                linkElt.innerHTML = cityName + ` (${country})`;
                linkElt.addEventListener('click',ev=>{
                    ev.preventDefault();
                    this.input.value = ev.target.pathname.substring(1)
                    this.recentCitiesDOM.classList.remove('open');
                    
                })
                liElt.appendChild(linkElt);

                this.recentCitiesDOM.appendChild(liElt);
            })
            this.recentCitiesDOM.classList.add('open');

            

        })

        //Event sur focus pour afficher les derniere villes
        this.input.addEventListener('focus',e=>{
            if(this.input.value != '') return;
            //Récupération de la liste des ville
            let localStorageData = localStorage.getItem("recentCities");
            console.log(localStorageData);
            let cities = JSON.parse(localStorageData);
            //S'il y a des villes on affiche
            
            if(cities){
                //suppression des villes déjà placée dans le panel
                this.recentCitiesDOM.innerHTML = '';
                cities.forEach(city=>{
                    //Inserer les villes dans le pannel
                    let liElt = document.createElement("li");
                    let linkElt = document.createElement("a");
                    linkElt.setAttribute('href', city);
                    linkElt.innerHTML = city;
                    linkElt.addEventListener('click',ev=>{
                        ev.preventDefault();
                        this.input.value = ev.target.pathname.substring(1)
                        this.recentCitiesDOM.classList.remove('open');
                    })
                    liElt.appendChild(linkElt);

                    this.recentCitiesDOM.appendChild(liElt);
                    
                })
                
                //ouverture de panel
                this.recentCitiesDOM.classList.add('open');
                
            }
            
            
        })
        this.input.addEventListener('blur',e=>{
            //this.recentCitiesDOM.classList.remove('open');
        })
    }

    closeCityList(){
        this.recentCitiesDOM.classList.remove('open');
    }

    closeMenu(){
        this.navDOM.classList.remove('open');
    }


    addEventOnBtnMenu(){
        this.btnDOM = this.headerWrapper.querySelector(".header__nav button")
        this.btnDOM.addEventListener('click', e=>{
            this.navDOM.classList.toggle('open');
        })
    }
    addEventOnLinks(){
        
        let linkList = this.headerWrapper.querySelector(".header__nav ul").children;
        [...linkList].forEach(link=>{
            link.addEventListener('click',e=>{
                e.preventDefault();
                this.routerFunc(e.target.pathname)
                
            })
        })
    }
}