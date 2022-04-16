import { LandingPage } from "./components/landingPage";
import { DetailedLanding } from "./components/detailedLanding";
import { useState } from "react";
import "./app.css";

const App = () => {
  const [userEntered, setUserEntered] = useState(localStorage.user);
  return (
    <div className="App darken">
      {userEntered ? (
        <DetailedLanding userEntered={userEntered} />
      ) : (
        <LandingPage setUserEntered={setUserEntered} />
      )}
    </div>
  );
};

export { App };
