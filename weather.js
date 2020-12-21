const weather = document.querySelector(".js-weather");

const API_KEY = "30f3c8a723662e9f9108bd58fe9cee88";
const COORDS = "coords";

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });    
}

function saveCoords(coords0bj){
    localStorage.setItem(COORDS, JSON.stringify(coords0bj));
}

function handlrGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords0bj = {
        latitude,
        longitude
    };
    saveCoords(coords0bj);
    getWeather(latitude, longitude);
}

function handlrGeoError(){
    console.log("Cant access geo location");
}

function  askForCoords(){
    navigator.geolocation.getCurrentPosition(handlrGeoSucces, handlrGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();