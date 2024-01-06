import React, {useEffect, useState} from "react";
import Register from "./components/Register";
import Chatdisplay from "./components/Displaychat"

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
      <div className="level-left">
        <div className="level-item">
          <Register></Register>
        </div>
        <div className="level-item">
          <Chatdisplay></Chatdisplay>
        </div>
      </div>
      
    </div>
  );
}

export default App;
