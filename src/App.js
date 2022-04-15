import { LandingPage } from "./components/landingPage";
import { DetailedLanding } from "./components/detailedLanding";
import { useState } from "react";

const App = () => {
  const [userEntered, setUserEntered] = useState(localStorage.user);
  return (
    <div className="App">
      {userEntered ? (
        <DetailedLanding userEntered={userEntered} />
      ) : (
        <LandingPage setUserEntered={setUserEntered} />
      )}
    </div>
  );
};

export { App };
