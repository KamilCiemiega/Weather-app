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

### UŻYTE TECHNOLOGIE

![technology](https://user-images.githubusercontent.com/55457173/81743070-5b433c80-94a1-11ea-8eee-c7bd7ac53642.png)

### UŻYTE API

![123](https://user-images.githubusercontent.com/55457173/81742723-db1cd700-94a0-11ea-8590-bbcc968e5fad.png)

### PREZENTACJA

### RĘCZNE WYSZUKIWANIE

Nazwa miasta wysyłana jest do Graphhopper. Serwis zwraca nazwę kraju i współrzędne geograficzne.

Do Dark Sky API wysyłane są współrzędne geograficzne. Zwrotnie pobierane są wszystkie dane dotyczące pogody.

Jeśli pogoda dotyczy polskiego miasta, z Airly zostają pobrane informacje o jakości powietrza i stężeniu pyłków PM1, PM2,5 i PM10 z czujników znajdujących się w danej miejscowości.

### AUTOCOMPLETE

![autocomplete](https://user-images.githubusercontent.com/55457173/81742634-b3c60a00-94a0-11ea-8fe9-ceb3660e6251.gif)

Dla Polski zaimplementowany jest autocomplete który podpowiada nam nazwy miast.

### AUTOLOKALIZACJA

W pierwszej kolejności aplikacja wysyła zapytanie do ip-api, określając po numerze ip, rodzaj sieci z której wysłano zapytanie, współrzędne geograficzne, państwo i miasto. 

Następnie do Dark Sky API wysyłane są współrzędne geograficzne. Zwrotnie pobierane są wszystkie dane dotyczące pogody.

Jeśli pogoda dotyczy polskiego miasta, z Airly zostają pobrane informacje o jakości powietrza i stężeniu pyłków PM1, PM2,5 i PM10 z czujników znajdujących się w danej miejscowości.

![autoLocalization](https://user-images.githubusercontent.com/55457173/81742608-aad53880-94a0-11ea-9f94-cd9a6530a3e7.gif)
