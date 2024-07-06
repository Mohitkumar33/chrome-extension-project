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
        "https://api.api-ninjas.com/v1/randomimage?category=nature&width=1366&height=768",
        {
          headers: {
            "x-api-key": "0LLjkvq9QRy5XkpSNKV9Uw==xfSZbIKj8hWJZyyp",
          },
        }
      );
      console.log(data, "image data hai");
      let finalString = "data:image/png;base64," + data;
      setImage(finalString);
    } catch (error) {
      console.error(error);
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
