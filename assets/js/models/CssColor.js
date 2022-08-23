export class CssColor{
    constructor(){
        this.style = getComputedStyle(document.documentElement);
        this.white = this.style.getPropertyValue('--color-white');
        this.darkBlue = this.style.getPropertyValue('--color-darkBlue');
        this.black = this.style.getPropertyValue('--color-black');
        this.primary = this.style.getPropertyValue('--color-primary');
    }
}