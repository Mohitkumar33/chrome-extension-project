import { LandingPage } from "./components/landingPage";
import { DetailedLanding } from "./components/detailedLanding";
import { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";

const App = () => {
  const [userEntered, setUserEntered] = useState(
    localStorage.user ? localStorage.user : false
  );
  const [image, setImage] = useState("");

  const getImage = async () => {
    try {
      const { data } = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          headers: {
            Authorization: `Client-ID KmNbQYQnZbSoFXoEZe-L9fY129KHmNzQzg11NYepopA`,
          },
          params: {
            query: "nature",
            w: 1366,
            h: 768,
          },
        }
      );
      setImage(data.urls.regular);
    } catch (error) {
      console.error("Unsplash API error:", error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${image})`,
      }}
    >
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
