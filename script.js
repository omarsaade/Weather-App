const wrapper = document.querySelector(".wrapper");//div kella
const inputPart = wrapper.querySelector(".input-part");//section tahet el weather
const infoTxt = inputPart.querySelector(".info-txt");// p li byezhar fia success or error
const inputField = inputPart.querySelector("input");//input

const apikey = "22aeaf003812a56b4e2b4b7292a262a9";
// form.onsubmit = (e) => {
//     e.preventDefault();//preventing form from submitting
// }


// inputField.onkeyup = (e) => {
//     if (e.key == "Enter" && inputField.value != "") {
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
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
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
    console.log(info);
}