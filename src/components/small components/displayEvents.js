import { useEffect } from "react";
import { useTodos } from "../../context/todo-context";
import "./displayEvents.css";

const DisplayEvents = ({ today }) => {
  const { events, setEvents } = useTodos();
  const dateDisplay = (date) => {
    const dateOnly = date.slice(0, 10);
    const fetchDate = dateOnly.split("-").reverse().join("-");
    return fetchDate;
  };
  setEvents(
    events.sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      return date1.getTime() - date2.getTime();
    })
  );
  const daysHoursMin = (date, eventDateTime) => {
    const formattedDate = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const ans = formattedDate.split(",")[0].split("/");
    const currentDay = Number(ans[0]);
    const currentMonth = Number(ans[1]);
    const currentYear = Number(ans[2]);

    const ans2 = formattedDate.split(",")[1].split(":");
    const currentHour = Number(ans2[0]);
    const currenMin = Number(ans2[1]);

    const eventDate = eventDateTime.slice(0, 10).split("-").reverse();
    const eventDay = Number(eventDate[0]);
    const eventMonth = Number(eventDate[1]);
    const eventYear = Number(eventDate[2]);

    const eventTime = eventDateTime.slice(11, eventDateTime.length).split(":");
    const eventHours = Number(eventTime[0]);
    const eventMin = Number(eventTime[1]);

    function diff_hours(dt2, dt1) {
      let diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60 * 60;
      return Math.round(diff);
    }

    const dt2 = new Date(currentYear, currentMonth, currentDay);
    const dt1 = new Date(eventYear, eventMonth, eventDay);

    const resultMinutes =
      (diff_hours(dt1, dt2) + eventHours - currentHour) * 60 +
      eventMin -
      currenMin;

    let quotient = Math.floor(resultMinutes / 1440);
    let remainder = resultMinutes % 1440;

    const daysAre = quotient;
    const hoursAre = Math.floor(remainder / 60);
    const minAre = remainder % 60;

    return [daysAre, hoursAre, minAre];
  };
  const deleteEventHandler = (eventId) => {
    setEvents(events.filter((item) => item.id !== eventId));
    // localStorage.setItem("allTheEvents", JSON.stringify(events));
  };
  useEffect(() => {
    localStorage.setItem("allTheEvents", JSON.stringify(events));
  }, [events]);
  return (
    <div className="events-display-box">
      {events &&
        events.map((item) => {
          const timeLeft = daysHoursMin(today, item.date);
          return (
            <div className="single-event" key={item.id}>
              {timeLeft[0] < 0 || timeLeft[1] < 0 || timeLeft[2] < 0 ? (
                <p>Event already Happened</p>
              ) : (
                <p className="count-down">
                  {timeLeft[0]}
                  <span>Days</span>
                  {timeLeft[1]}
                  <span>Hours</span>
                  {timeLeft[2]}
                  <span>Min</span>
                </p>
              )}

              <p className="event-name">{item.description}</p>
              <p className="date-time">Date : {dateDisplay(item.date)} </p>
              <p className="date-time">
                Time: {item.date.slice(11, item.date.length)}
              </p>
              <div className="edit-delete-event">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="delete-event"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={() => deleteEventHandler(item.id)}
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export { DisplayEvents };
