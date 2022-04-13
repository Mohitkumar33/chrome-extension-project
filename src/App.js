import { LandingPage } from "./components/landingPage";
import { DetailedLanding } from "./components/detailedLanding";
import { useState } from "react";
const App = () => {
  const [userEntered, setUserEntered] = useState();
  return (
    <div className="App">
      {localStorage.user ? (
        <DetailedLanding userEntered={localStorage.user} />
      ) : (
        <LandingPage setUserEntered={setUserEntered} />
      )}
    </div>
  );
};

export { App };
