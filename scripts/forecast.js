class Forecast {
    
    constructor() {
        this.key = 'e2998b60167b7c8aa6fb4724973870ea';
        this.weatherURI = 'https://api.openweathermap.org/data/2.5/weather';
    }

    // methods
    
    // the updateCity() promise function will call the forecast.js API function(s) to 
    // return the relevant weather conditions for the user specified city
    async updateCity(city) {
        const cityDetails = await this.getCity(city);        
        return cityDetails;
    };


    // get the city API code, the city parameter will be defined as text by the user 
    // and passed into the function
    async getCity(city) {

        // the query will add a few items to the base:
        //  1. a '?', which means we are going to add a query to the base url string,
        //  2. q, the city to search for (user-defined)
        //  3. an ampersand, '&', to add another query to the url string, and
        //  4. the apiKey for the weather app we are using
        const query = `?q=${city}&appid=${this.key}`;

        // Now to combine both base and query to fetch that resource from the Accuweather API resource.
        // We will use await fetch() to create and resolve a promise. This promise will then be assigned
        // to the variable response.  response will then be prsed as json and assigned to the variable, data.
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data;
    };
}


// test
// getCity('manchester')
//     .then(data => {
//         console.log('Function call: ', data);
//         console.log(data.name);
//         console.log(data.weather[0].description);
//         console.log(data.weather[0].icon)
//         console.log(data.main.temp);
//     })
//     .catch(error => {
//         console.log(error);
//     })
