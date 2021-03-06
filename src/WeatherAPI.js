const weatherCode = {
    0: "Unknown",
    1000: "Clear",
    1001: "Cloudy",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    3000: "Light Wind",
    3001: "Wind",
    3002: "Strong Wind",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm"
}

const climacellIconMap = {
    0: "WiAlien",
    1000: "WiDaySunny",
    1001: "WiCloudy",
    1100: "WiDayCloudy",
    1101: "WiDayCloudy",
    1102: "WiDayCloudyHigh",
    2000: "WiFog",
    2100: "WiHaze",
    3000: "WiDayLightWind",
    3001: "WiDayWindy",
    3002: "WiWindy",
    4000: "WiShowers",
    4001: "WiRain",
    4200: "WiRainMix",
    4201: "WiRain",
    5000: "WiSnow",
    5001: "WiSnow",
    5100: "WiSnow",
    5101: "WiSnow",
    6000: "WiSleet",
    6001: "WiSleet",
    6200: "WiSleet",
    6201: "WiSleet",
    7000: "WiHail",
    7101: "WiHail",
    7102: "WiHail",
    8000: "WiThunderstorm"
}

const openWeatherIconMap = {
    200: "WiThunderstorm",
    201: "WiThunderstorm",
    202: "WiThunderstorm",
    210: "WiLightning",
    211: "WiLightning",
    212: "WiLightning",
    221: "WiLightning",
    230: "WiThunderstorm",
    231: "WiThunderstorm",
    232: "WiThunderstorm",
    300: "WiSprinkle",
    301: "WiSprinkle",
    302: "WiRain",
    310: "WiRainMix",
    311: "WiRain",
    312: "WiRain",
    313: "WiShowers",
    314: "WiRain",
    321: "WiSprinkle",
    500: "WiSprinkle",
    501: "WiRain",
    502: "WiRain",
    503: "WiRain",
    504: "WiRain",
    511: "WiRainMix",
    520: "WiShowers",
    521: "WiShowers",
    522: "WiShowers",
    531: "WiStormShowers",
    600: "WiSnow",
    601: "WiSnow",
    602: "WiSleet",
    611: "WiRainMix",
    612: "WiRainMix",
    615: "WiRainMix",
    616: "WiRainMix",
    620: "WiRainMix",
    621: "WiSnow",
    622: "WiSnow",
    701: "WiFog",
    711: "WiSmoke",
    721: "WiDayHaze",
    731: "WiDust",
    741: "WiFog",
    761: "WiDust",
    762: "WiDust",
    771: "WiCloudyGusts",
    781: "WiTornado",
    800: "WiDaySunny",
    801: "WiCloud",
    802: "WiCloud",
    803: "WiCloudy",
    804: "WiCloudy",
    900: "WiTornado",
    901: "WiStormShowers",
    902: "WiHurricane",
    903: "WiSnowflakeCold",
    904: "WiHot",
    905: "WiWindy",
    906: "WiHail",
    957: "WiStrongWind"
}

const microsoftIconMap = {
    1: "WiDaySunny",
    2: "WiDaySunnyOvercast",
    3: "WiDayCloudyHigh",
    4: "WiDayCloudy",
    5: "WiDayHaze",
    6: "WiCloud",
    7: "WiCloud",
    8: "WiCloudy",
    11: "WiFog",
    12: "WiShowers",
    13: "WiDayShowers",
    14: "WiDayShowers",
    15: "WiThunderstorm",
    16: "WiDayThunderstorm",
    17: "WiDayThunderstorm",
    18: "WiRain",
    19: "WiRainMix",
    20: "WiDayRainMix",
    21: "WiDayRainMix",
    22: "WiSnow",
    23: "WiDaySnow",
    24: "WiSleet",
    25: "WiSleet",
    26: "WiHail",
    29: "WiRainMix",
    30: "WiHot",
    31: "WiCloud",
    32: "WiWindy",
    33: "WiNightClear",
    34: "WiNightPartlyCloudy",
    35: "WiNightCloudy",
    36: "WiNightAltCloudyHigh",
    37: "WiNightFog",
    38: "WiNightCloudyWindy",
    39: "WiNightShowers",
    40: "WiNightRain",
    41: "WiNightStormShowers",
    42: "WiNightThunderstorm",
    43: "WiNightStormShowers",
    44: "WiNightSnow"

}

export function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

export function getMinuteDataMicrosoft(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=microsoft&type=minutely&lat=" + sdata.lat + "&lon=" + sdata.lon;
    console.log("API: URL: ", url);
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        if (result["intervals"]) {
            let minutely = result["intervals"].map(function(item) {
                return (
                    {
                        minute: item.minute,
                        intensity: item.dbz
                    }
                )
            });
            if (callBack) {
                callBack({minutely: minutely});
            }
        }
    });
}

export function getHourDataMicrosoft(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=microsoft&type=hourly&lat=" + sdata.lat + "&lon=" + sdata.lon;
    console.log("API: URL: ", url);
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let hourly = result["forecasts"].slice(0, 29).map(function(item) {
            return (
                {
                    time: convertTZ(item.date, sdata.timezone),
                    temperature: item.temperature.value,
                    weatherIcon: microsoftIconMap[item.iconCode],
                    weatherDesc: item.iconPhrase
                }
            )
        });
        if (callBack) {
            callBack({hourly: hourly});
        }
    });
}

export function getDailyDataMicrosoft(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=microsoft&type=daily&lat=" + sdata.lat + "&lon=" + sdata.lon;
    console.log("API: URL: ", url);
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let daily = result["forecasts"].map(function(item) {
            return (
                {
                    time: convertTZ(item.date, sdata.timezone),
                    temperature: (item.temperature.maximum.value + item.temperature.minimum.value) / 2,
                    weatherIcon: microsoftIconMap[item.day.iconCode],
                    weatherDesc: item.day.iconPhrase
                }
            )
        });
        if (callBack) {
            callBack({daily: daily});
        }
    });
}

export function getOpenWeatherData(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=openweather&lat=" + sdata.lat + "&lon=" + sdata.lon;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        console.log("API: URL: ", url)
        let daily = result["daily"].map(function(item) {
            return (
                {
                    time: convertTZ(new Date(item.dt*1000), sdata.timezone),
                    temperature: item.temp.day,
                    weatherIcon: openWeatherIconMap[item.weather[0].id],
                    weatherDesc: item.weather[0].description
                }
            )
        });
        let startTime = convertTZ(new Date(result["hourly"][0].dt * 1000), sdata.timezone)
        let hourly = result["hourly"].slice(0, 29 - startTime.getHours()).map(function(item) {
            return (
                {
                    time: convertTZ(new Date(item.dt*1000), sdata.timezone),
                    temperature: item.temp,
                    weatherIcon: openWeatherIconMap[item.weather[0].id],
                    weatherDesc: item.weather[0].description
                }
            )
        });
        let minutely = result["minutely"].map(function(item) {
            return (
                {
                    time: convertTZ(new Date(item.dt*1000), sdata.timezone),
                    intensity: item.precipitation
                }
            )
        });
        console.log("API: FETCHING DATA (OPENWEATHER): ", daily, "\n\t\t\t\t  ", hourly, "\n\t\t\t\t  ", minutely);
        if (callBack) {
            callBack({hourly: hourly, minutely: minutely, daily: daily});
        }
    });
}

export function placeSuggestions(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?input="+sdata;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let suggestions = result["predictions"].map(function(item, i) {
            return (
                {
                    main: item.structured_formatting.main_text,
                    secondary: item.structured_formatting.secondary_text,
                    placeId: item.place_id
                }
            )
        })
        if (callBack) {
            callBack({suggestions: suggestions})
        }
        return result["predictions"];
    });
}

export function getGeoCoords(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?placeId=" + sdata;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let loc = result["results"][0]["geometry"]["location"];
        if (callBack) {
            //console.log(geoTz(loc.lat, loc.lng));
            callBack({lat: loc.lat, lon: loc.lng, address: result["results"][0]["formatted_address"], timezone: result["TimeZones"][0]["Id"]});
            //callBack({lat: loc.lat, lon: loc.lng});
        }
        return loc;
    });
};

export function getMinuteData(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=climacell&type=rain&lat=" + sdata.lat + "&lon=" + sdata.lon;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let rainData = result["data"]["timelines"][0]["intervals"].map(function(item, i) {
            return (
                {
                    type: item.values.precipitationType,
                    intensity: item.values.precipitationIntensity,
                    probability: item.values.precipitationProbability,
                    temperature: item.values.temperature,
                    time: item.startTime,
                    index: i
                }
            )
        });
        console.log("API: FETCHING RAIN (CLIMACELL): ", rainData);
        if (callBack) {
            callBack({minutely: rainData});
        }
        return rainData;
    });
}

export function getDayForecastClimaCell(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=climacell&type=forecast&lat=" + sdata.lat + "&lon=" + sdata.lon;
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let forecast = result["data"]["timelines"][0]["intervals"].map(function(item, i) {
            return ( 
                {
                    time: new Date(item.startTime),
                    temperature: item.values.temperature,
                    weatherIcon: climacellIconMap[item.values.weatherCode],
                    weatherDesc: weatherCode[item.values.weatherCode]
                }
            )
        })
        console.log("API: FETCHING DAY FORECAST (CLIMACELL): ", forecast);
        if (callBack) {
            callBack({daily: forecast});
        }
        return forecast;
    });
}

export function getHourForecastClimaCell(sdata, callBack) {
    let url = "https://maxjay.dev/weatherAppData.php?api=climacell&type=now&lat=" + sdata.lat + "&lon=" + sdata.lon;
    console.log(url);
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let forecast = result["data"]["timelines"][0]["intervals"].map(function(item, i) {
            return ( 
                {
                    time: new Date(item.startTime),
                    temperature: item.values.temperature,
                    weatherIcon: climacellIconMap[item.values.weatherCode],
                    weatherDesc: weatherCode[item.values.weatherCode]
                }
            )
        });
        console.log("API: FETCHING HOUR FORECAST (CLIMACELL): ", forecast);
        if (callBack) {
            callBack({hourly: forecast});
        }
        return forecast;
    });
}