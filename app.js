// Global variables

const userLocation = document.querySelectorAll("#location");
const tempDisplay = document.querySelectorAll(".temperature");
const condition = document.querySelectorAll("#weatherCondition");

// Get location of the user

navigator.geolocation.getCurrentPosition((position) => {
  const locationApiUrl = `https://us1.locationiq.com/v1/reverse?key=pk.2d0bd8bed6631e02e874e1bf739e0863&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;
  const weatherApiUrl = `https://www.meteosource.com/api/v1/free/point?lat=${position.coords.latitude}&lon=${position.coords.longitude}&sections=all&timezone=UTC&language=en&units=metric&key=k2lhk1dbtr84l3bgnpzynxr048vnqejr0sgxqe2o`;
  
  fetch(locationApiUrl)
  .then(response => response.json())
  .then((locationData) => {
    userLocation.forEach((occurrence) => {
      occurrence.textContent = `${locationData.address.state}, ${locationData.address.country}`; 
    });
    return fetch(weatherApiUrl);
  })
  .then(response => response.json())
  .then((weatherData) => {
    tempDisplay.forEach((temp) => {
      temp.textContent = `${weatherData.current.temperature}°C`;
    });
    condition.forEach((cond) => {
      cond.textContent = `${weatherData.current.summary}`;
    });
  })
  .catch(error => alert(error));
}, () => {
  alert("Error in getting location");
});

// Display current date

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const date = new Date();
let currentMonth = months[date.getMonth()];
let day = date.getDate();
let year = date.getFullYear();

setTimeout(() => {
  let dateDisplay = document.querySelectorAll("#date");
  dateDisplay.forEach((occurrence) => {
    occurrence.textContent = `${day} ${currentMonth} ${year}`;
  });
});
