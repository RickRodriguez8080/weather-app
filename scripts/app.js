const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    
    // destructuring is the same as assigning const variables,
    // but in a shorthand way.  This only works if you are using the
    // same variable names as those in the object you are passing into the function.
    const {cityDetails, cityConditions} = data;

    //update details in the html file
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}, ${cityDetails.AdministrativeArea.ID}, ${cityDetails.AdministrativeArea.CountryID}</h5>
            <div class="my-3">${cityConditions.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${cityConditions.Temperature.Imperial.Value}</span>
                <span>&deg;F</span>
        </div>
    `;

    // remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    // update the day/night and icon images
    
    // check for day/night
    let timeSrc = cityConditions.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
    
    
    // get correct icon for city conditions
    icon.setAttribute('src', `img/icons/${cityConditions.WeatherIcon}.svg`);
};

// the updateCity() promise function will call the forecast.js API functions to 
// return the relevant weather conditions for the user specified city
const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const cityConditions = await currentConditions(cityDetails.Key);
        
    return {
        cityDetails: cityDetails,
        cityConditions: cityConditions
    }
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
