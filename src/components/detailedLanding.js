import "./detailedLanding.css";
import { useEffect, useState } from "react";
import { Todo } from "./small components/todo";
import { GoogleSearch } from "./small components/googleSearch";
import axios from "axios";
import { WeatherDetails } from "./small components/weatherDetails";
import { ResetWarning } from "./small components/resetWarning";

const DetailedLanding = ({ userEntered, setUserEntered }) => {
  const [showSetting, setShowSetting] = useState(false);
  const [resetWarning, setResetWarning] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({
    currentTemp: "",
    city: "",
    weatherIcon: "",
    weatherDesc: "",
    maxTemp: "",
    minTem: "",
    feelsLike: "",
    humidity: "",
  });
  const [showWeather, setShowWeather] = useState(false);
  const [quote, setQuote] = useState({
    quoteOfTheDay: "",
    authorOfTheQuote: "",
  });
  const [showTodo, setShowTodo] = useState(false);
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  if (minutes >= 0 && minutes <= 9) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  const [currentTime, setCurrentTime] = useState(time);
  setInterval(() => {
    today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();
    if (minutes >= 0 && minutes <= 9) {
      minutes = `0${minutes}`;
    }
    time = `${hours}:${minutes}`;
    setCurrentTime(time);
  }, 1000);
  useEffect(() => {}, [currentTime]);

  const [focusMessage, setFocusMessage] = useState(
    localStorage.getItem("focusOfTheDay")
      ? localStorage.getItem("focusOfTheDay")
      : ""
  );
  const [finalMessage, setFinalMessage] = useState(
    localStorage.getItem("focusOfTheDay")
      ? localStorage.getItem("focusOfTheDay")
      : ""
  );
  const [focusDone, setFocusDone] = useState(
    localStorage.getItem("focusStatus") === "true" ? true : false
  );
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://api.quotable.io/random?maxLength=50"
      );
      setQuote({ quoteOfTheDay: data.content, authorOfTheQuote: data.author });
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c467f97d6e38e52a944241d82351da78&units=metric"
      );
      setWeatherInfo({
        currentTemp: data.main.temp,
        city: data.name,
        weatherIcon: data.weather[0].icon,
        weatherDesc: data.weather[0].description,
        maxTemp: data.main.temp_max,
        minTem: data.main.temp_min,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
      });
    })();
  }, []);
  return (
    <div className="detailed-landing">
      {resetWarning ? (
        <ResetWarning
          setResetWarning={setResetWarning}
          setShowSetting={setShowSetting}
          setUserEntered={setUserEntered}
        />
      ) : null}
      <div className="top-row">
        <div className="event-and-search">
          <div className="event-section">
            <svg xmlns="http://www.w3.org/2000/svg" className="plus-icon">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            <p>Add Event</p>
          </div>
          <div>
            <GoogleSearch />
          </div>
        </div>

        <div
          className="all-weather"
          onClick={() => setShowWeather((prev) => !prev)}
        >
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weatherInfo.weatherIcon}@2x.png`}
              alt={weatherInfo.weatherDesc}
              className="weather-icon"
            />
          </div>
          <div className="city-temp">
            <div>{weatherInfo.currentTemp}°C</div>
            <div>{weatherInfo.city}</div>
          </div>
          {showWeather ? (
            <div className="weather-indepth">
              <WeatherDetails weatherInfo={weatherInfo} />
            </div>
          ) : null}
        </div>
      </div>
      <div className="time-and-focus">
        <div className="time-display">
          <p className="current-time">
            {currentTime}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="time-toggle"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </p>
        </div>

        <p className="greeting">Good night, {userEntered}</p>

        {!finalMessage ? (
          <div className="focus-not-set">
            <p className="focus-ask">What's your main focus for today?</p>
            <input
              type="text"
              className="focus-input"
              // ref={(input) => (input ? input.focus() : null)}
              value={focusMessage}
              onChange={(e) => setFocusMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter"
                  ? (setFinalMessage(focusMessage),
                    localStorage.setItem("focusOfTheDay", focusMessage))
                  : ""
              }
            />
          </div>
        ) : (
          <div className="focus-set">
            <p className="focus-given">Main focus of the day</p>
            <div className="main-focus-checkbox">
              <input
                type="checkbox"
                checked={focusDone}
                onChange={(e) => {
                  setFocusDone(e.target.checked);
                  localStorage.setItem("focusStatus", e.target.checked);
                }}
              />
              {focusDone ? (
                <div>
                  <label style={{ textDecoration: "line-through" }}>
                    {localStorage.getItem("focusOfTheDay")}
                  </label>
                </div>
              ) : (
                <label>{localStorage.getItem("focusOfTheDay")}</label>
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pencil-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                onClick={() => {
                  setFinalMessage("");
                  localStorage.removeItem("focusOfTheDay");
                  localStorage.removeItem("focusStatus");
                  setFocusDone(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="trash-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                onClick={() => {
                  setFocusMessage("");
                  setFinalMessage("");
                  localStorage.removeItem("focusOfTheDay");
                  localStorage.removeItem("focusStatus");
                  setFocusDone(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        )}
        {focusDone ? (
          <p style={{ visibility: "visible" }}>Good job</p>
        ) : (
          <p style={{ visibility: "hidden" }}>Good job</p>
        )}
      </div>
      <div className="bottom-row">
        <div
          className="reset-setting"
          onClick={() => setShowSetting((prev) => !prev)}
        >
          Setting
          {showSetting ? (
            <button
              className="reset-all"
              onClick={(e) => {
                e.stopPropagation();
                setResetWarning(true);
              }}
            >
              Reset All
            </button>
          ) : null}
        </div>
        <div className="quote-section">
          <p>{quote.quoteOfTheDay}</p>
          <p className="quote-author">{quote.authorOfTheQuote}</p>
        </div>
        <div className="todo-dialog">
          <div onClick={() => setShowTodo((prev) => !prev)}>Todo</div>
          <div
            className="todo-dialog-setter"
            style={{
              display: showTodo ? "block" : "none",
            }}
          >
            <Todo setShowTodo={setShowTodo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DetailedLanding };
