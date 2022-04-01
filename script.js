const wrapper = document.querySelector(".wrapper");//div kella
const inputPart = wrapper.querySelector(".input-part");//section tahet el weather
const infoTxt = inputPart.querySelector(".info-txt");// p li byezhar fia success or error
const inputField = inputPart.querySelector("input");//input
const locationBtn = inputPart.querySelector("button");
const wIcon = document.querySelector(".weather-part img");
const arrowBack = wrapper.querySelector("header i");

const apikey = "22aeaf003812a56b4e2b4b7292a262a9";
let api;
// form.onsubmit = (e) => {
//     e.preventDefault();//preventing form from submitting
// }


// inputField.onkeyup = (e) => {
//     if (e.key == "Enter" && inputField.value != "") {
//
//         console.log("Hello");
//     }
// }

//  openweathermap.org/api
// Wheather API
//step:
//signup mishen te7sal 3al api key => MY API KEYS //copy and paste it in the your key
//current weather Data
//Api doc



inputField.addEventListener("keyup", e => {
    // e hye khassa hasran bel event handlers w ma bteje ma3 gayra
    //if user pressed enter btn and input value is empty!
    if (e.key == "Enter" && inputField.value != "") {
        //iza fa2as enter wel input mesh empty shaggel el function requestApi()
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) { // If browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {

        alert("your browser not support geolocation api");
    }
})

function onSuccess(position) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // const { latitude, longitude } = GeolocationCoordinates {latitude: 33.8937913, longitude: 35.5017767}
    // Destructuring assignment
    // position.coords.latitude
    // position.coords.longitude
    const { latitude, longitude } = position.coords;//getting lat and lon of the user device from coords obj 
    // api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;

    fetchData();
}


function onError(error) {
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error");
}











// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// Fetch API هي واجهة حديثة تسمح لك بتقديم طلبات HTTP إلى الخوادم من متصفحات الويب.
// The Fetch API is a modern interface that allows you to make HTTP requests to servers from web browsers.
//yaabe fetch hye tari2a ahsan men xmlhttprequest w ajdad..3anda nafes el madmun
//ano 3am teb3at http yjeblak shi men el server w yred(response) jaweb , bas bi 2a2rab wa2et 3an tari2 el
//promsie

// The Fetch API provides a JavaScript interface for accessing and manipulating parts of the
//  HTTP pipeline, such as requests and responses. It also provides a global fetch() method that
//   provides an easy, logical way to fetch resources asynchronously across the network.

// This kind of functionality was previously achieved using XMLHttpRequest. 
// Fetch provides a better alternative that can be easily used by other technologies 
// such as Service Workers. Fetch also provides a single logical place to define 
// other HTTP-related concepts such as CORS and extensions to HTTP.


function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetchData();
}

function fetchData() {
    infoTxt.innerHTML = "Getting weather details...";
    infoTxt.classList.add("pending");
    // fetch(api).then(response => console.log(response.json())); // btred promise
    // The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    //getting api response and returning it with parsing inot js obj and in other
    //then function calling wetherDetails function with passing api result as an argument
    // fetch(api)
    //     .then(response => response.json())
    //     .then(data => console.log(data));
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.innerHTML = `${inputField.value} isn't a valid city name`;
        infoTxt.classList.replace("pending", "error");//shil el tnen
    } else {
        //let's get required properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;



        if (id == 800) {
            wIcon.src = "icons/clear.svg";
        }
        //using custom icon according to the id which api return us
        if (id == 800) {
            wIcon.src = "icons/clear.png";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "icons/storm.png";
        } else if (id >= 600 && id <= 622) {
            wIcon.src = "icons/snow.png";
        } else if (id >= 701 && id <= 731) {
            wIcon.src = "icons/mist.png";
        } else if (id >= 800 && id <= 804) {
            wIcon.src = "icons/clearsky.png";
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            wIcon.src = "icons/rain.png";
        }




        //let's pass these values to a particular html element
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;


        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }

}

// https://openweathermap.org/weather-conditions
//for icons

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});