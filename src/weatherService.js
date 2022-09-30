const API_KEY="436730d5cf7d1bd10fef268488b4d635";
const iconURL=(iconId)=>`https://openweathermap.org/img/wn/${iconId}@2x.png`

const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const {
    coord: {lon},
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed,deg },
    visibility,
    sys: { country,sunrise },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconURL: iconURL(icon),
    temp,
    lon,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    visibility,
    deg,
    country,
    sunrise,
    name,
  };
};

export { getFormattedWeatherData };