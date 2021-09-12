const key = '89a866485aecd671d20a63958e48c1c9';

async function search_city(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    );
    const data = await response.json();
    display_weather(data);
  } catch {
    alert('Enter correct city name');
  }
}

const container = document.createElement('div');
container.className = 'container';

const search_box = document.createElement('div');
search_box.className = 'search_box';

search_box.innerHTML = `
<input type="text" class="search_bar" placeholder="enter city name" />
<button class="button">Search</button>
`;

const weather = document.createElement('div');
weather.className = 'weather';

function display_weather(data) {
  const { name } = data;
  const { icon } = data.weather[0];
  const { description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.querySelector('.weather').innerHTML = `
    <h2 class="city">Weather in ${name}</h2>
    <h1 class="flex">
    <img src='https://openweathermap.org/img/wn/${icon}.png' alt="" class="icon" />
    <div class="description">${description}</div>
    </h1>
    <h2 class="temp">${(temp - 273.15).toFixed(2)}°C</h2>
    <div class="himidity">Humidity: ${humidity}%</div>
    <div class="wind">Wind Speed: ${speed} km/hr<div>
    `;
  document.querySelector('.search_bar').value = '';
}

container.append(search_box, weather);
document.body.append(container);

function search() {
  let city = document.querySelector('.search_bar').value;
  search_city(city);
}

document.querySelector('.search_box button').addEventListener('click', search);

document
  .querySelector('.search_bar')
  .addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      search();
    }
  });

search_city('Coimbatore');
