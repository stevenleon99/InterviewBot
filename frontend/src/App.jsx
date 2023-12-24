import React, {useEffect, useState} from "react";
import Register from "./components/Register";

const App = () => {
  const [message, setMessage] = useState("");

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api", requestOptions)  // set proxy in package.json
    const data = await response.json();

    if (!response.ok){
      console.log("response not correct when fetch /api");
    } else{
      console.log(data.message)
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
      <Register></Register>
    </div>
  );
}

export default App;
