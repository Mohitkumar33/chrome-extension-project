import "./weatherDetails.css";

const WeatherDetails = ({ weatherInfo }) => {
  const {
    currentTemp,
    city,
    weatherIcon,
    weatherDesc,
    maxTemp,
    minTem,
    feelsLike,
    humidity,
  } = weatherInfo;
  return (
    <div className="detailed-weather-box" onClick={(e) => e.stopPropagation()}>
      <p className="city">{city}</p>
      <p className="desc">{weatherDesc}</p>
      <div className="icon-and-info">
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt={weatherInfo.weatherDesc}
          className="weather-icon-detailed"
        />
        <div className="current-temp">{Math.trunc(currentTemp)}°</div>
        <div className="min-max">
          <div>Min: {minTem}°</div>
          <div>Max: {maxTemp}°</div>
        </div>
      </div>
      <div className="weather-other-info">
        <div>Feels like : {feelsLike}°</div>
        <div>Humidity : {humidity}%</div>
      </div>
    </div>
  );
};

export { WeatherDetails };
