class HeaderController{
    constructor(headerWrapper, routerFunc){
        this.headerWrapper = headerWrapper;
        this.navDOM = this.headerWrapper.querySelector(".header__nav ul");
        this.routerFunc = routerFunc;
        this.input = this.headerWrapper.querySelector("input");
        //Ajout d'un event sur le btn menu
        this.addEventOnBtnMenu()

        //Ajout d'event sur les liens du menu
        this.addEventOnLinks()

        //Ajout d'event sur l'input
        this.addEventOnInput();
    }

    addEventOnInput(){
        this.input.addEventListener('focus',e=>{
            console.log("Afficher les dernieres villes entrées");
        })
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