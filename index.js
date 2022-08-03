// let icon = document.querySelector(".icon");
let temp = document.querySelector('.temp');
let l = document.getElementById('loc');
let dis = document.getElementById('display');
let sid = document.getElementById('Current_location');
let summary = document.getElementById('summary')
let feels = document.getElementById('feel')
let humidity = document.getElementById('humidity');
let iconCode;
let icon = document.getElementById('icons');

let city, country, state;


//My API ID
const API_ID = "22d543c6c1c1014a80796a7669893904";
//API URL
let API_URL;


//Predefined API in JS
//using getLocation() function we will get the 

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  }
}


function showPosition(position) {
  let lat = position.coords.latitude //latitude
  let lon = position.coords.longitude; //longitude

  API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_ID}`;

  //The global fetch() method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available.

  fetch(API_URL)

    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      dis.style.display = "block";
      l.style.display = "none";

      iconCode = data.weather[0].icon;
      let iconurl = `http://openweathermap.org/img/w/` + iconCode + ".png";
      icon.setAttribute('src', `${iconurl}`)
      temp.innerHTML = (data.main.temp - 273).toFixed(2) + "°C";
      summary.innerHTML = data.weather[0].description;
      sid.innerHTML = `<i class="fa-solid fa-location-dot"></i> &nbsp;` + data.name + " , " + data.sys.country;
      feels.innerHTML = (data.main.feels_like - 273).toFixed(2) + "°C" + "<br>Feels like";
      humidity.innerHTML = `<i class="fa-solid fa-droplet-percent"></i>` + data.main.humidity + "%" + "<br>Humidity";
    });
}

let search = document.getElementById(`cityName`);

search.addEventListener("search",getGivenLocation)

function getGivenLocation() {
  //Using Location Details
  let txt_input = document.getElementById(`cityName`).value;
  let txt = txt_input.split(',');
  let city = txt[0];
  let state = txt[1];
  let country = txt[2];


  let API_URL_2 = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${API_ID}`;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(() => {
      fetch(API_URL_2)

        .then(function (response) {
          return response.json();
        })

        .then((data) => {
          console.log(data);
          if ( data.cod == '404')
          {
            document.body.style.backgroundColor = "white";
            document.body.style.fontSize = "40px";
            document.body.innerHTML = "404 Location Not Found";

          }
          dis.style.display = "block";
          l.style.display = "none";


          iconCode = data.weather[0].icon;
          let iconurl = `http://openweathermap.org/img/w/` + iconCode + ".png";
          icon.setAttribute('src', `${iconurl}`)
          temp.innerHTML = (data.main.temp - 273).toFixed(2) + "°C";
          summary.innerHTML = data.weather[0].description;
          sid.innerHTML = `<i class="fa-solid fa-location-dot"></i> &nbsp;` + data.name + " , " + data.sys.country;
          feels.innerHTML = (data.main.feels_like - 273).toFixed(2) + "°C" + "<br>Feels like";
          humidity.innerHTML = `<i class="fa-solid fa-droplet-percent"></i>` + data.main.humidity + "%" + "<br>Humidity";
          txt_input.innerHTML = " ";
        });
    });
  } else {
    document.write("Geolocation is not supported by this browser.");
  }
}