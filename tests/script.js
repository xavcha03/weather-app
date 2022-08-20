let url = "https://api.openweathermap.org/data/2.5/weather?q=charleroi&lang=fr&units=metric&appid=dba81f2ac1d88360af75ac8419400cdd"
async function getResult(url){
    return await fetch(url);
}

async function main(){
    let result = await (await getResult(url)).json();
    console.log(result);
}

main();

