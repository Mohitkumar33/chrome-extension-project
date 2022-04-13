import "./detailedLanding.css";
const DetailedLanding = () => {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();
  return (
    <div className="detailed-landing">
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
          <div>Google search</div>
        </div>
        <div>Weather</div>
      </div>
      <div className="time-and-focus">
        <p className="current-time">{time}</p>
        <p className="greeting">Good night, Mohit</p>
        <p className="focus-ask">What's your main focus for today?</p>
        <input type="text" className="focus-input" />
      </div>
      <div className="bottom-row">
        <div>Setting</div>
        <div className="quote-section">
          <p>Talk does't cook rice</p>
          <p>By a man</p>
        </div>
        <div>Todo</div>
      </div>
    </div>
  );
};

export { DetailedLanding };
