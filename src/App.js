import { LandingPage } from "./components/landingPage";
import { DetailedLanding } from "./components/detailedLanding";
import { useState } from "react";
import "./app.css";

const App = () => {
  const [userEntered, setUserEntered] = useState(
    localStorage.user ? localStorage.user : false
  );
  return (
    <div className="App darken">
      {userEntered ? (
        <DetailedLanding
          userEntered={userEntered}
          setUserEntered={setUserEntered}
        />
      ) : (
        <LandingPage setUserEntered={setUserEntered} />
      )}
    </div>
  );
};

export { App };
