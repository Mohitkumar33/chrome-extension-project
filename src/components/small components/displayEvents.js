import "./displayEvents.css";
const DisplayEvents = () => {
  return (
    <div className="events-display-box">
      <div className="single-event">
        <p className="count-down">
          3<span>Days</span> 4<span>Hours</span>7<span>Min</span>
        </p>
        <p className="event-name">Friend's Birthday</p>
        <p>Data : 29-4-2022 </p>
        <p>Time: 21:34</p>
        <div className="edit-delete-event">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="edit-event"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="delete-event"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="single-event">
        <p className="count-down">
          3<span>Days</span> 4<span>Hours</span>7<span>Min</span>
        </p>
        <p>Friend's Birthday</p>
        <p>Data : 29-4-2022 </p>
        <p>Time: 21:34</p>
      </div>
      <div className="single-event">
        <p className="count-down">
          3<span>Days</span> 4<span>Hours</span>7<span>Min</span>
        </p>
        <p>Friend's Birthday</p>
        <p>Data : 29-4-2022 </p>
        <p>Time: 21:34</p>
      </div>
    </div>
  );
};

export { DisplayEvents };
