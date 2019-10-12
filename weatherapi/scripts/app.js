const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
      
    console.log(data);
   // const cityDets = data.cityDets;
    //const weatherDets = data.weatherDets;
    // destructure properties ---->const name should be same as pproperty name
     const {cityDets,weatherDets} = data;

    // update UI with details
    details.innerHTML = `
          <h5 class="p-3">${cityDets.EnglishName}</h5>
          <div class="p-3">${weatherDets.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weatherDets.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>            
    `;
     // update icon with UI
     const iconSrc = `img/icons/${weatherDets.WeatherIcon}.svg`;
     icon.setAttribute('src', iconSrc);

    // update daytime with UI

    let timeSrc = null;
    if(weatherDets.IsDayTime)
    {
        timeSrc = 'img/day.png';

    }else{
         timeSrc = 'img/night.png';
    }
    time.setAttribute('src',timeSrc);

    //remove display:none if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity =async (city)=>{
    const cityDets = await getCity(city);
    const weatherDets = await getWeather(cityDets.Key);
    return {
        cityDets :  cityDets ,
        weatherDets : weatherDets
    };
};
cityForm.addEventListener('submit',e=>{
    //prevent default action
    e.preventDefault();
    // get city name
    const city = cityForm.city.value.trim();
    cityForm.reset();
    // update ui with new city
    updateCity(city).then(data=> updateUI(data))
    .catch(err=>console.log(err)); 
});