import "./googleSearch.css";
const GoogleSearch = () => {
  return (
    <div>
      <form
        method="get"
        action="https://www.google.com/search"
        className="google-search-align"
      >
        <input
          type="text"
          name="q"
          placeholder="Google Search"
          className="search-input"
        />
        <button type="submit" className="submit-search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
export { GoogleSearch };
