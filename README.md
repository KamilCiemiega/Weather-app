Prosta aplikacja pogodowa dostaraczająca informacje o aktualnych danych metrologicznych.Aplikacja podaje takie informacje jak:

temperaturę,temperaturę odczuwalną,ciśnienie atmosferyczne,wilgotność,stopień zachmurzenia,prędkość wiatru,dla Polskich miast poprzez serwis Airly podawany stopień zanieczyszczenia cząsteczkami PM1, PM2,5, PM10

### DEMO

weather-app-88870.web.app

### UŻYTE TECHNOLOGIE

### PREZENTACJA

### RĘCZNE WYSZUKIWANIE

Nazwa miasta wysyłana jest do Graphhopper. Serwis zwraca nazwę kraju i współrzędne geograficzne.

Do Dark Sky API wysyłane są współrzędne geograficzne. Zwrotnie pobierane są wszystkie dane dotyczące pogody.

Jeśli pogoda dotyczy polskiego miasta, z Airly zostają pobrane informacje o jakości powietrza i stężeniu pyłków PM1, PM2,5 i PM10 z czujników znajdujących się w danej miejscowości.

### AUTOCOMPLETE

Dla Polski zaimplementowany jest autocomplete który podpowiada nam nazwy miast.

### AUTOLOKALIZACJA

W pierwszej kolejności aplikacja wysyła zapytanie do ip-api, określając po numerze ip, rodzaj sieci z której wysłano zapytanie, współrzędne geograficzne, państwo i miasto. 

Następnie do Dark Sky API wysyłane są współrzędne geograficzne. Zwrotnie pobierane są wszystkie dane dotyczące pogody.

Jeśli pogoda dotyczy polskiego miasta, z Airly zostają pobrane informacje o jakości powietrza i stężeniu pyłków PM1, PM2,5 i PM10 z czujników znajdujących się w danej miejscowości.

### REACT LAZY


