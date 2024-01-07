import React, {useEffect, useState} from "react";
import "../css/styles.css"

const Header = () =>{
    const [message, setMessage] = useState("");

    const getWelcomeMessage = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch("/api", requestOptions);  // set proxy in package.json
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
        <div className="level-item pageTitle">{message}</div>
    )
};

export default Header;