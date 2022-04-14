import { useState } from "react";
import "./landingPage.css";

const LandingPage = ({ setUserEntered }) => {
  const [userName, setUserName] = useState("");
  return (
    <div
      className="msg-input"
      style={{
        backgroundImage:
          "https://res.cloudinary.com/dbfzfqfhl/image/upload/v1649858996/ecom%20item%20images/fredrik-solli-wandem-7wUGrYL6B9c-unsplash_kqvmac.jpg",
      }}
    >
      <h1 className="welcome-msg">Hello, what's your name?</h1>
      <input
        className="welcome-input"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onKeyPress={(e) =>
          e.key === "Enter"
            ? (localStorage.setItem("user", userName), setUserEntered(userName))
            : null
        }
      />
      <button
        className="continue-button"
        onClick={() => (
          localStorage.setItem("user", userName), setUserEntered(userName)
        )}
      >
        Continue
      </button>
    </div>
  );
};

export { LandingPage };
