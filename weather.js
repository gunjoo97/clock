const API_KEY = "30f3c8a723662e9f9108bd58fe9cee88";
const COORDS = "coords";

function saveCoords(coords0bj){
    localStorage.setItem(COORDS, JSON,stringify(coords0bj));
}

function handlrGeoSucces(position){
    const latitude = position.cords.latitude;
    const longitude = position.cords.longitude;
    const coords0bj = {
        latitude,
        longitude
    };
    saveCoords(coords0bj);
}

function handlrGeoError(){
    console.log("Cant access geo location");
}

function  askForCoords(){
    navigator.geolocation.getCurrentPosition(handlrGeoSucces, handlrGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if (loadedCords === null){
        askForCoords();
    } else {
        // getweather
    }
}

function init(){
    loadCoords();
}

init();