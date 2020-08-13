const key = 'kYWQKu0pXpUKDS10rGpADf6qcw7gv62z';

// get the city API code, the city parameter will be defined as text by the user 
// and passed into the function
const getCity = async (city) => {

    // the base is the Resource URL for the city search.  We will be adding to this
    // to create a city search
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    
    // the query will add a few items to the base:
    //  1. a '?', which means we are going to add a query to the base url string,
    //  2. the apiKey for the weather app we are using,
    //  3. an ampersand, '&', to add another query to the url string, and
    //  4. q, the city to search for (user-defined)
    const query = `?apikey=${key}&q=${city}`;

    // Now to combine both base and query to fetch that resource from the Accuweather API resource.
    // We will use await fetch() to create and resolve a promise. This promise will then be assigned
    // to the variable response.  response will then be prsed as json and assigned to the variable, data.
    const response = await fetch(base + query);
    const data = await response.json();

    // return the promise
    return data[0];
};

// get current conditions API code
const currentConditions = async (cityCode) => {

    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query =`${cityCode}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

// test
// getCity('miami')
//     .then(data => {
//     console.log(data.Key);
//         return currentConditions(data.Key);
//     })
//     .then(data => {
//         console.log(data[0].WeatherText);
//         console.log(data[0].Temperature.Imperial.Value);
//     })
//     .catch(error => {
//         console.log(error);
//     })
