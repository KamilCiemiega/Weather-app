The application provides information such as:

temperature
feels-like temperature
atmospheric pressure
humidity
cloud cover
wind speed
For Polish cities, the Airly service provides data on particulate matter pollution levels: PM1, PM2.5, PM10.

### DEMO

https://weather-app-88870.web.app/#/

### TECHNOLOGIES USED

![technology](https://user-images.githubusercontent.com/55457173/81743070-5b433c80-94a1-11ea-8eee-c7bd7ac53642.png)

### APIs USED

![123](https://user-images.githubusercontent.com/55457173/81742723-db1cd700-94a0-11ea-8590-bbcc968e5fad.png)

### PRESENTATION

### MANUAL SEARCH
The city name is sent to Graphhopper. The service returns the country name and geographical coordinates.

The geographical coordinates are sent to the Dark Sky API, which returns all the weather data.

If the weather data is for a Polish city, Airly provides information on air quality and particulate matter concentrations (PM1, PM2.5, PM10) from sensors located in that city.

### AUTOCOMPLETE

![autocomplete](https://user-images.githubusercontent.com/55457173/81742634-b3c60a00-94a0-11ea-8fe9-ceb3660e6251.gif)

Autocomplete is implemented for Poland, suggesting city names.

### AUTOLOCALIZATION

First, the application sends a request to ip-api, determining the network type from which the request was sent, along with the geographical coordinates, country, and city based on the IP number.

Next, the geographical coordinates are sent to the Dark Sky API, which returns all the weather data.

If the weather data concerns a Polish city, Airly provides information on air quality and particulate matter concentrations (PM1, PM2.5, PM10) from sensors located in that city.

![autoLocalization](https://user-images.githubusercontent.com/55457173/81742608-aad53880-94a0-11ea-9f94-cd9a6530a3e7.gif)
