import "./landingPage.css";
const LandingPage = () => {
  return (
    <div
      className="msg-input"
      style={{
        backgroundImage:
          "https://res.cloudinary.com/dbfzfqfhl/image/upload/v1649858996/ecom%20item%20images/fredrik-solli-wandem-7wUGrYL6B9c-unsplash_kqvmac.jpg",
      }}
    >
      <h1 className="welcome-msg">Hello, what's your name?</h1>
      <input className="welcome-input" type="text" />
      <button className="continue-button">Continue</button>
    </div>
  );
};

export { LandingPage };
