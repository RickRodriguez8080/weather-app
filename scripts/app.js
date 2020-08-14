const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    
    const cityDetails = data;
    const Faren = Math.round(convertToF(cityDetails.main.temp));

    //update details in the html file
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.name}</h5>
            <div class="my-3">${cityDetails.weather[0].description}</div>
            <div class="display-4 my-4">
                <span>${Faren}</span>
                <span>&deg;F</span>
        </div>
    `;

    // remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    // update the day/night and icon images
    // check for day/night  
    let currentTime = Math.round(Date.now() / 1000);
    if (currentTime > cityDetails.sys.sunrise && currentTime < cityDetails.sys.sunset) {
        time.setAttribute('src', `img/day.svg`);
    } else {
        time.setAttribute('src', `img/night.svg`);
    }

    // get correct icon for city conditions
    icon.setAttribute('src', `img/icons/${cityDetails.weather[0].icon}.png`);
};

// the updateCity() promise function will call the forecast.js API function(s) to 
// return the relevant weather conditions for the user specified city
const updateCity = async (city) => {
    const cityDetails = await getCity(city);        
    return cityDetails;
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get the city value from the form input tag (the search bar)
    const city = cityForm.city.value.trim();
    
    // clears the search bar so that the user can search another city
    cityForm.reset();

    // update the UI with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error));
});

convertToF = (temp) => {
    return temp * 9.0/5.0 - 459.67;
}
