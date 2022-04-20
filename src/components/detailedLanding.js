import "./detailedLanding.css";
import { useEffect, useState } from "react";
import { Todo } from "./small components/todo";
import { GoogleSearch } from "./small components/googleSearch";
import axios from "axios";
import { WeatherDetails } from "./small components/weatherDetails";
import { ResetWarning } from "./small components/resetWarning";
import { AddEvents } from "./small components/addEvents";
import { DisplayEvents } from "./small components/displayEvents";
import { useTodos } from "../context/todo-context";

const DetailedLanding = ({ userEntered, setUserEntered }) => {
  const [locationInput, setLocationInput] = useState("");
  const [wheatherAddress, setWeatherAddress] = useState(
    "https://api.openweathermap.org/data/2.5/weather?q=bengaluru&APPID=c467f97d6e38e52a944241d82351da78&units=metric"
  );
  const { events } = useTodos();
  const [show12Hour, setShow12Hour] = useState(
    localStorage.getItem("amOrPm") === "true" ? true : false
  );
  const [showCreateEvent, setShowCreateEvent] = useState(false);

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
  let time12Hour = "";
  if (hours > 12 && hours < 24) {
    time12Hour = `${hours - 12}:${minutes}`;
  } else {
    time12Hour = `${hours}:${minutes}`;
  }
  const [twelveHourTime, setTwelveHourTime] = useState(time12Hour);
  setInterval(() => {
    today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();
    if (minutes >= 0 && minutes <= 9) {
      minutes = `0${minutes}`;
    }
    time = `${hours}:${minutes}`;

    if (hours > 12 && hours < 24) {
      time12Hour = `${hours - 12}:${minutes}`;
    } else {
      time12Hour = `${hours}:${minutes}`;
    }
    setTwelveHourTime(time12Hour);
    setCurrentTime(time);
  }, 1000);
  useEffect(() => {}, [currentTime]);
  useEffect(() => {
    localStorage.setItem("allTheEvents", JSON.stringify(events));
  }, [events]);
  // let wheatherAddress = "";
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
  if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition((position) => {
      wheatherAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c467f97d6e38e52a944241d82351da78&units=metric`;
    });
  } else {
    wheatherAddress =
      "https://api.openweathermap.org/data/2.5/weather?q=bengaluru&APPID=c467f97d6e38e52a944241d82351da78&units=metric";
  }
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(wheatherAddress);
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
  }, [wheatherAddress]);
  let greetingMsg = "";
  if (hours >= 5 && hours < 12) {
    greetingMsg = "Good Morning";
  } else if (hours >= 12 && hours < 17) {
    greetingMsg = "Good Afternoon";
  } else {
    greetingMsg = "Good Evening";
  }
  return (
    <div className="detailed-landing">
      {resetWarning ? (
        <ResetWarning
          setResetWarning={setResetWarning}
          setShowSetting={setShowSetting}
          setUserEntered={setUserEntered}
        />
      ) : null}
      {events.length > 0 && (
        <div className="all-events-display">
          <DisplayEvents today={today} />
        </div>
      )}

      <div className="top-row">
        <div className="event-and-search">
          <div
            className="event-section"
            onClick={() => setShowCreateEvent((prev) => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="plus-icon">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            <p>Add Event</p>
            {showCreateEvent && (
              <div className="events-model-set">
                <AddEvents setShowCreateEvent={setShowCreateEvent} />
              </div>
            )}
          </div>
          <div>
            <GoogleSearch />
          </div>
        </div>
        <div className="all-weather-input">
          <div className="icon-and-weatherinput">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="globe-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Enter Location"
              className="weather-location-input"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter"
                  ? setWeatherAddress(
                      `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&APPID=c467f97d6e38e52a944241d82351da78&units=metric`
                    )
                  : ""
              }
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              style={{ fill: "white" }}
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
            </svg>
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
      </div>
      <div className="time-and-focus">
        <div className="time-display">
          <p className="current-time">
            {show12Hour ? (
              <span>
                {twelveHourTime}
                {hours >= 0 && hours < 12 ? (
                  <span style={{ fontSize: "2rem" }}>am</span>
                ) : (
                  <span style={{ fontSize: "2rem" }}>pm</span>
                )}
              </span>
            ) : (
              <span>{currentTime}</span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="time-toggle"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={() => {
                setShow12Hour((prev) => !prev);
                localStorage.setItem("amOrPm", !show12Hour);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </p>
        </div>

        <p className="greeting">
          {greetingMsg}, {userEntered}
        </p>

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
