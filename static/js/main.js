const button = document.querySelector(".btn");
const inputvalue = document.querySelector(".inputvalue");
var city = document.querySelector(".city");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var current = document.querySelector(".current");
var date = document.querySelector(".date");
var humid = document.querySelector(".humidity");

// Getting current date from the browser
n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();

date.innerHTML = d + "/" + m + "/" + y; // Writing date to the webpage

// Function to get the current location from the browser
function getLocation(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }
    else {
        alert("Geolocation not supported by the browser");
    }
}

// Function to update weather of current location after getting it from browser
function geoSuccess(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="+ lon + "&units=metric&appid=f2941699ea6befb5da77e2ae07ac0af6")
    .then((response) => response.json())
    .then((data) => {
        current.innerHTML = "Your Current Location";
        var tempvalue = data["current"]["temp"];
        var descvalue = data["current"]["weather"][0]["description"];
        temp.innerHTML = "Temprature: " + tempvalue + " °C";
        desc.innerHTML = "Cloud: " + descvalue;
        humid.innerHTML = "Humidity: " + data["current"]["humidity"] + " %";
        

        for(i=1; i<=7; i++){
            dt = new Date();
            dt.setDate(dt.getDate() + i)
            d = dt.getDate();
            m = dt.getMonth()+1;
            y = dt.getFullYear();
            document.querySelector(".date"+i).innerHTML = d + "/" + m + "/" + y;
            document.querySelector(".temp"+i).innerHTML = "Temperature: " + data["daily"][i]["temp"]["max"] + "/" + data["daily"][i]["temp"]["min"] + " °C";
            document.querySelector(".desc"+i).innerHTML = "Cloud: " + data["daily"][i]["weather"][0]["description"];
            document.querySelector(".humidity"+i).innerHTML = "Humidity: " + data["daily"][i]["humidity"] + " %";
        }

    })
}

// Handling geolocation error
function geoError() {
    alert("Geocoder failed")
}

getLocation()

// Button function to get weather details of 
button.addEventListener("click", function () {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+ inputvalue.value + "&appid=f2941699ea6befb5da77e2ae07ac0af6")
    .then((response) => response.json())
    .then((data) => {
        current.innerHTML = "";
        var namevalue = data[0]["name"];
        city.innerHTML = "City: " + namevalue;
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0]["lat"] + "&lon="+ data[0]["lon"] + "&units=metric&appid=f2941699ea6befb5da77e2ae07ac0af6")
        .then((res) => res.json())
        .then((data) => {
        console.log(data);
        var tempvalue = data["current"]["temp"];
        var descvalue = data["current"]["weather"][0]["description"];
        temp.innerHTML = "Temprature: " + tempvalue + " °C";
        desc.innerHTML = "Cloud: " + descvalue;
        humid.innerHTML = "Humidity: " + data["current"]["humidity"] + " %";


        for(i=1; i<=7; i++){
            dt = new Date();
            dt.setDate(dt.getDate() + i)
            d = dt.getDate();
            m = dt.getMonth()+1;
            y = dt.getFullYear();
            document.querySelector(".date"+i).innerHTML = d + "/" + m + "/" + y;
            document.querySelector(".temp"+i).innerHTML = "Temperature: " + data["daily"][i]["temp"]["max"] + "/" + data["daily"][i]["temp"]["min"] + " °C";
            document.querySelector(".desc"+i).innerHTML = "Cloud: " + data["daily"][i]["weather"][0]["description"];
            document.querySelector(".humidity"+i).innerHTML = "Humidity: " + data["daily"][i]["humidity"] + " %";
        }
        })
        .catch((err) => {
            console.log(err);
            alert("Enter Vaild City Name")});
    } )
});
