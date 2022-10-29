/* Global Variables */
//API URL
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// My unique API KEY
const apiKey = "&appid=64c08d9d71b92503eaf55866aae56a48&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// get the button with ID generate
const generateButton = document.getElementById("generate");

//add eventListener when you click on the button generate
generateButton.addEventListener("click", generateWeather);

//generate function that execute when you click on the button
function generateWeather() {
  //get zipCode and Feeling from the inputs
  const zipCode = document.getElementById("zip").value;
  // variable to get the number of digits for ZipCode
  let zipCodeDigits = zipCode.toString().length;

  const feeling = document.getElementById("feelings").value;
  //make our inputs required
  //use trim to check if the input empty
  if (zipCode.trim("") == "" || feeling.trim("") == "") {
    // if you click to the button and the inputs are empty we will show to the user the alert message bellow
    alert("Zip Code or Feeling is Empty");
    return;
  }

  // call getWeather function
  getWeather(zipCode)
    // use .then to postdata and update UI after execute getWeather Function
    .then(function (data) {
      //Checking for validation
      if (data.message != "city not found" && zipCodeDigits == 5) {
        postData("/add", {
          date: newDate,
          temp: data.main.temp,
          countryname: data.sys.country,
          name: data.name,
          weather: data.weather[0].main,
          feeling,
        });

        //update user interface
        updateUI();
      } else {
        alert("Invalid ZipCode ");
        location.reload();
      }
    });
}

// Get weather data by using arrow function and make it asyncrouns
const getWeather = async (zipCode) => {
  //Fetching our data by compine (baseUrl+zipCode+apiKey) together
  // using await to wait untill data fetching
  const fetchingApi = await fetch(baseUrl + zipCode + apiKey);

  try {
    // consvert data to json
    const result = await fetchingApi.json();

    //return out get data

    return result;
  } catch (error) {
    console.log("error" + error);
  }
};

// Basic method for postdata
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();

    return newData;
  } catch (error) {
    console.log("error" + error);
  }
};

// arrow function to update UI after get and post the data from the server
const updateUI = async () => {
  //request to fetch the data from '/data' that have stored in it
  const request = await fetch("/data");
  try {
    // Transform into JSON
    const allData = await request.json();

    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      // convert temp to  '   °C   '
      "Temp:" + Math.round((allData.temp - 32) / 1.8) + "°C";
    document.getElementById("content").innerHTML =
      "Your Feeling:" + allData.feeling;
    document.getElementById("date").innerHTML = "Date:" + allData.date;
    document.getElementById("countryName").innerHTML =
      "Country Name :" + allData.countryname;
    document.getElementById("name").innerHTML =
      "Post Office City:" + allData.name;
    document.getElementById("main").innerHTML =
      "Main Weather :" + allData.weather;
  } catch (error) {
    console.log("error" + error);
    // appropriately handle the error
  }
};
